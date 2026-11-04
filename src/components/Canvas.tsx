"use client";

import { LiveObject } from "@liveblocks/client"
import {useStorage, useMutation, useOthers, useSelf, useUpdateMyPresence, useUndo, useRedo} from "@liveblocks/react/suspense";
import { type PointerEvent, type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

import Sidebar from './Sidebar';
import Toolbar from "./Toolbar";
import ZoomWidget from "./ZoomWidget";

import panzoom from "panzoom";

import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../utils';

import StickyNote from './StickyNote.tsx';
import { PiCursorFill } from "react-icons/pi";

const COLORS = ["#f59e0b", "#8b5cf6", "#10b981", "#ec4899"];
const BOX_SIZE = 100;

// types
import type { FreehandPoint, Shape, Drag } from "../Types";


// canvas function

export function Canvas() {

 const undo = useUndo();
 const redo = useRedo();

  // sync shapes from room storage, then update client

  const shapes = useStorage((root) => {
    const value = root.shapes;

    return (value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, Shape>)
      : {}) as Record<string, Shape>;
  });

  const strokes = useStorage((root) => root.strokes);
  const notes = useStorage((root) => root.notes);

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
           x: 2400 - (100 / 2),
           y: 1350 - (100 / 2),
            fill,
        })
    );

    return id;
  }, []);

  const addNote = useMutation(({ storage }) => {


    const id = crypto.randomUUID();
    const fill = "#f5d90a";

    storage.get("notes").set(
      id,
      new LiveObject({
        x: 2400 - (100 / 2),
        y: 1350 - (100 / 2),
         fill,
         text: '',
      })
    );


  }, []);

  // delete an object

  const deleteObject = useMutation(({ storage }, id: string) => {

    storage.get("shapes").delete(id);
    storage.get("notes").delete(id);
    storage.get("strokes").delete(id);

  }, []);


  const canvasRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<ReturnType<typeof panzoom> | null>(null);
  const isPanModeRef = useRef(false);

  const [Indicator, setIndicator] = useState(false);
  const [zoomAmount, setZoomAmount] = useState(100);

  // color of the draw path element
  const [pathColor, setPathColor] = useState('#A259FF');
  const [brushSize, setBrushSize] = useState(16);
  
  const [startDraw, setStartDraw] = useState(false);

  // array of points where cursor is dragged when draw mode is enabled.

  const [points, setPoints] = useState<FreehandPoint[]>([]);

  const dragRef = useRef<Drag | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // panzoom controls

    const instance = panzoom(canvas, {
      maxZoom: 2,
      minZoom: 0.1,
      bounds: true,
      boundsPadding: 0.5,
    });

    instance.pause();
    panzoomRef.current = instance;

    const viewport = canvas.parentElement;
    if (viewport) {
      instance.moveTo(
        (viewport.clientWidth - canvas.offsetWidth) / 2,
        (viewport.clientHeight - canvas.offsetHeight) / 2,
      );
    }

    instance.on("transform", syncZoom);

    return () => {
      instance.off("transform", syncZoom);
      instance.dispose();
      panzoomRef.current = null;
    };
    
  }, []);

  //--------- store objecs into liveblocks for others to see -------------------

  const saveStroke = useMutation(({ storage }, path: string, color: string) => {
    storage.get("strokes").set(
      crypto.randomUUID(),
      new LiveObject({ path, color })
    );
  }, []);

  const saveNoteText = useMutation(({ storage }, id: string, text: string) => {

    storage.get("notes").get(id)?.update({ text });

  }, 
  []
 );

  const moveShape = useMutation(
    ({ storage }, id: string, x: number, y: number) => {

      storage.get("shapes").get(id)?.update({ x, y });
    },
    []
  );

  const moveNote = useMutation(
    ({ storage }, id: string, x: number, y: number) => {

      storage.get("notes").get(id)?.update({ x, y });

    },
    []
  );

  function selectObject(id:string | null ) {
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
      saveStroke(pathData, pathColor);
    }

    setPoints([]);
  }

  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!startDraw || e.buttons !== 1) return;

    const point = getSvgPoint(e);
    if (point) setPoints((previous) => [...previous, point]);
  }

  //stroke 

  const stroke = getStroke(points, {
    size: brushSize,
    thinning: 0.5,
    easing: (t) => 1 - Math.cos((t * Math.PI)) / 2,
    smoothing: 0.5,
    streamline: 0.5,
  });

  // actual stroke 
  const pathData = getSvgPathFromStroke(stroke);

  // dragging

  function startDrag(

    event: PointerEvent<HTMLButtonElement>,
    id: string,
    shape: Readonly<Shape>,
    itemType: "shape" | "note"

  ) {

    if (isPanModeRef.current) return;
    if(event.button !== 0 || dragRef.current) return;

    const bounds = canvasRef.current?.getBoundingClientRect();
    if(!bounds) return;

    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      pointerId: event.pointerId,
      itemId: id,
      itemType,
      offsetX: event.clientX - bounds.left - shape.x,
      offsetY: event.clientY - bounds.top - shape.y,
    };

    selectObject(id);
  }

  // move a block

  function moveDrag(event: PointerEvent<HTMLDivElement>) {

    const drag = dragRef.current;
    if(!drag || drag.pointerId !== event.pointerId ) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    moveShape(
      drag.itemId,
      event.clientX - bounds.left - drag.offsetX,
      event.clientY - bounds.top - drag.offsetY,
    );

    moveNote(
      drag.itemId,
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


  function eraser() {

    setStartDraw(false);
    setIndicator(true);

  }

  function syncZoom() {

    const scale = panzoomRef.current?.getTransform().scale ?? 1;

    setZoomAmount(Math.round(scale * 100));

  }

function IncrementZoom() {
  const zoom = Math.min((zoomAmount + 10) / 100, 2);

  panzoomRef.current?.smoothZoomAbs(0, 0, zoom);

  setZoomAmount(Math.round(zoom * 100));
}

function DecrementZoom() {
  const zoom = Math.max((zoomAmount - 10) / 100, 0.1);

  panzoomRef.current?.smoothZoomAbs(0, 0, zoom);
  
  setZoomAmount(Math.round(zoom * 100));
}

  return (
    <>
        <Toolbar
          pausePanZoom={pausePanZoom}
          resumePanZoom={resumePanZoom}
          addNote={addNote}
          addShape={addShape}
          deleteObject={deleteObject}
          selectedShapeID={selectShapeId}
          indicator={Indicator}
          enableDrawMode={enableDrawMode}
          setPathColor={setPathColor}
          setBrushSize={setBrushSize}
          eraser={eraser}
          undo={undo}
          redo={redo}

          brushSize={brushSize}
          pathColor={pathColor}

        />
        <Sidebar />

        <ZoomWidget IncrementZoom={IncrementZoom} DecrememntZoom={DecrementZoom} ZoomAmount={zoomAmount}/>

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
          selectObject(null)
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
          <path key={id} d={savedStroke.path} fill={savedStroke.color || '#000000'} />
        ))}
        {points.length > 0 && 
          <path d={pathData} fill={pathColor} /> 
        }
      </svg>

      {Object.entries(notes ?? {}).map(([id, note]) => {
        const selectedByOther = others.some(
          (other) => other.presence.selectShapeId === id
        );

        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: note.x,
              top: note.y,
              width: 210,
              height: 210,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:
                selectShapeId === id
                  ? "5px solid #A259FF"
                  : selectedByOther
                    ? "4px solid #10b981"
                    : "4px solid transparent",
              borderRadius: 12,
              cursor: "grab",
              touchAction: "none",
            }}
          >
            <StickyNote
              startDrag={startDrag}
              id={id}
              note={note}
              noteText={note.text}
              saveNoteText={saveNoteText}
             
            />
          </div>
        );
      })}

      {Object.entries(shapes ?? {}).map(([id, shape]) => {

        const selectedByOther = others.some(
          (other) => other.presence.selectShapeId === id
        );

        return (
          <button
            key={id}
            type="button"
            aria-label={`Select box ${id}`}
            onPointerDown={(event) => startDrag(event, id, shape, "shape")}
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