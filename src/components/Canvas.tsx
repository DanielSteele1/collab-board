"use client";

import { LiveObject } from "@liveblocks/client"
import {useStorage, useMutation, useOthers, useSelf, useUpdateMyPresence,} from "@liveblocks/react/suspense";
import { type PointerEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

import Sidebar from './Sidebar';
import Toolbar from "./Toolbar";

import panzoom from "panzoom";

import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../utils'

import { PiCursorFill } from "react-icons/pi";

const COLORS = ["#f59e0b", "#8b5cf6", "#10b981", "#ec4899"];
const BOX_SIZE = 100;

// types
import type { FreehandPoint, Shape, Drag } from "../Types";

// canvas function

export function Canvas() {

  // sync shapes from room storage, then update client

  const shapes = useStorage((root) => {
    const value = root.shapes;

    return (value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, Shape>)
      : {}) as Record<string, Shape>;
  });
  const strokes = useStorage((root) => root.strokes);

  const selectShapeId = useSelf(
    (me) => me.presence.selectShapeId
  );

  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {

    if( selectShapeId && shapes[selectShapeId] === undefined ) {
      updateMyPresence({ selectShapeId })
    }
   
  }, [selectShapeId, shapes, updateMyPresence]);

  // add a shape

  const addShape = useMutation(({ storage }) => {
    const id = crypto.randomUUID();
    const fill = COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#f59e0b";

    storage.get("shapes").set(
        id,
        new LiveObject({
            x: 80 + Math.round(Math.random() * 40),
            y: 200 + Math.round(Math.random() * 240),
            fill,
        })
    );

    return id;
  }, []);

  // delete a shape

  const deleteShape = useMutation(({ storage }, id: string) => {
    storage.get("shapes").delete(id);
  }, []);
  

  const canvasRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<ReturnType<typeof panzoom> | null>(null);
  const isPanModeRef = useRef(false);

  const [Indicator, setIndicator] = useState(false);

  const [startDraw, setStartDraw] = useState(false);

  // array of points where cursor is dragged when draw mode is enabled.

  const [points, setPoints] = useState<FreehandPoint[]>([]);

  const dragRef = useRef<Drag | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const instance = panzoom(canvas, {
      maxZoom: 2,
      minZoom: 0.1,
      bounds: true,
      boundsPadding: 0.5,
    });

    instance.pause();
    panzoomRef.current = instance;

    return () => {
      instance.dispose();
      panzoomRef.current = null;
    };
  }, []);

  //--------- store objecs into liveblocks for others to see -------------------

  const saveStroke = useMutation(({ storage }, path: string) => {
    storage.get("strokes").set(
      crypto.randomUUID(),
      new LiveObject({ path })
    );
  }, []);

  const moveShape = useMutation(
    ({ storage }, id: string, x: number, y: number) => {

      storage.get("shapes").get(id)?.update({ x, y });
    },
    []
  );

  function selectShape(id:string | null ) {
    updateMyPresence({ selectShapeId: id });
  }

  // functions to draw on the canvas 

  // getSvgPoint will track the location of the cusor when a user tries to draw. this resets
  // your cursor location every time you draw, which solves the issue of having the canvas de-sync
  // if a user grabs the canvas around then goes back to drawing.

  function getSvgPoint(event: ReactPointerEvent<SVGSVGElement>): FreehandPoint | null {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return null;

    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse()
    );
    return [point.x, point.y, event.pressure];
  }

  function handlePointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    if (!startDraw || e.button !== 0) return;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const point = getSvgPoint(e);
    if (point) setPoints([point]);
  }

  function handlePointerUp(){
    if (startDraw && pathData) {
      saveStroke(pathData);
    }

    setPoints([]);
  }

  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!startDraw || e.buttons !== 1) return;

    const point = getSvgPoint(e);
    if (point) setPoints((previous) => [...previous, point]);
  }

  const stroke = getStroke(points, {

    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  // actual stroke 
  const pathData = getSvgPathFromStroke(stroke);

  // dragging

  function startDrag(

    event: PointerEvent<HTMLButtonElement>,
    id: string,
    shape: Readonly<Shape> 
  ) {

    if (isPanModeRef.current) return;
    if(event.button !== 0 || dragRef.current) return;

    const bounds = canvasRef.current?.getBoundingClientRect();
    if(!bounds) return;

    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      shapeId: id,
      offsetX: event.clientX - bounds.left - shape.x,
      offsetY: event.clientY - bounds.top - shape.y,
    };

    selectShape(id);
  }

  // move a block

  function moveDrag(event: PointerEvent<HTMLDivElement>) {

    const drag = dragRef.current;
    if(!drag || drag.pointerId !== event.pointerId ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    moveShape(
      drag.shapeId,
      event.clientX - bounds.left - drag.offsetX,
      event.clientY - bounds.top - drag.offsetY,
    );
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  }

  // move the cursor around the screen. updates liveblocks so you can see others cursors.

  function handleCanvasPointerMove(event: PointerEvent<HTMLDivElement>) {

    const bounds = event.currentTarget.getBoundingClientRect();
    updateMyPresence({
      cursor: {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }
    });

    moveDrag(event);
  }

  // draw mode 

  function enableDrawMode() {

    setStartDraw(true);
    setIndicator(false);

    if(canvasRef.current) {
    canvasRef.current.style.cursor = "pointer";
    }

    isPanModeRef.current = false;
    panzoomRef.current?.pause();

  }

  // select mode

  function pausePanZoom() {

    setIndicator(false);
    setStartDraw(false);

    isPanModeRef.current = false;

    if(canvasRef.current) {
      canvasRef.current.style.cursor ="pointer";
    }

    panzoomRef.current?.pause();
  }

  // Grab mode 

  function resumePanZoom() {

    if(canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
   
    setIndicator(true);
    setStartDraw(false);

    isPanModeRef.current = true;
    panzoomRef.current?.resume();
  }

  return (
    <>
        <Toolbar
          
          pausePanZoom={pausePanZoom}
          resumePanZoom={resumePanZoom}
          addShape={addShape}
          deleteShape={deleteShape}
          selectedShapeID={selectShapeId}
          indicator={Indicator}
          enableDrawMode={enableDrawMode}
        />
        <Sidebar />

    <div className="whiteboard-viewport">
      <div
        aria-label="Collaborative canvas"
        ref={canvasRef}

      onPointerMove={handleCanvasPointerMove}
      onPointerCancel={endDrag}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
      onLostPointerCapture={endDrag}
      
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          selectShape(null)
        }
      }}

        className="whiteboard-canvas"

      >
      <svg
        className="draw-object"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setPoints([])}
        style={{
          pointerEvents: startDraw ? "auto" : "none",
          touchAction: "none",
        }}
      >
        {Object.entries(strokes).map(([id, savedStroke]) => (
          <path key={id} d={savedStroke.path} />
        ))}
        {points.length > 0 && <path d={pathData} />}
      </svg>

      {Object.entries(shapes ?? {}).map(([id, shape]) => {

        const selectedByOther = others.some(
          (other) => other.presence.selectShapeId === id
        );

        return (
          <button
            key={id}
            type="button"
            aria-label={`Select box ${id}`}
            onPointerDown={(event) => startDrag(event, id, shape)}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              width: BOX_SIZE,
              height: BOX_SIZE,
              border:
                selectShapeId === id
                  ? "3px solid #A259FF"
                  : selectedByOther
                    ? "3px solid #10b981"
                    : "3px solid transparent",
              borderRadius: 12,
              background: shape.fill,
              cursor: "grab",
              touchAction: "none",
            }}
          />
        );
      })}

      {others.map(({ connectionId, presence }) => 
      presence.cursor ? (
        <div 
        key={connectionId}
        aria-hidden="true"
        style={{
          
        position: "absolute",
        left: presence.cursor.x,
        top: presence.cursor.y,
        color: "#A259FF", 
        fontSize: 30,
        fontWeight: 600,
        pointerEvents: "none",
        transform: "translate(6px, 6px)",

        }}>
          <PiCursorFill /> <span> </span>
        </div> ) : null
      )}

      </div>
    </div>
    </>
  );
}