"use client";

import { LiveObject } from "@liveblocks/client"
import {useStorage, useMutation, useOthers, useSelf, useUpdateMyPresence,} from "@liveblocks/react/suspense";
import { type PointerEvent, useEffect, useRef, useState } from "react";

import Sidebar from './Sidebar';
import Toolbar from "./Toolbar";

import panzoom from "panzoom";


import { PiCursorFill } from "react-icons/pi";

const COLORS = ["#f59e0b", "#8b5cf6", "#10b981", "#ec4899"];
const BOX_SIZE = 100;


// goals for today:

// - get a stroke object working, using the lib we found.
// - make sure you can change the color of the stroke. you'd need a tooltip for this
// - filter alphebetically and by creation date.
// - if finished with those, and this is a big if, then try and implement buttons for zoom. 


// goals for friday

// - if done with the rest, start thinking about how to store the stroke live.
// - then setup supabase connection.
// - chillout task for the week: improve upon the UI. 

// types

type Drag = {
   pointerId: number;
   shapeId: string;
   offsetX: number;
   offsetY: number;
}

type Shape = {
  x: number;
  y: number;
  fill: string;
};

// canvas function

export function Canvas() {


  // sync shapes from room storage, then update client

  const shapes = useStorage((root) => {
    const value = root.shapes;

    return (value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, Shape>)
      : {}) as Record<string, Shape>;
  });

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
  
  // drag a shape around

  const canvasRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<ReturnType<typeof panzoom> | null>(null);
  const isPanModeRef = useRef(false);

  const [Indicator, setIndicator] = useState(false);

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

  // when moving a shape, mutate a shapes X and Y location

  const moveShape = useMutation(
    ({ storage }, id: string, x: number, y: number) => {

      storage.get("shapes").get(id)?.update({ x, y });
    },
    []
  );

  function selectShape(id:string | null ) {
    updateMyPresence({ selectShapeId: id });
  }

  function startDrag(

    event: PointerEvent<HTMLButtonElement>,
    id:string,
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

  function pausePanZoom() {

    setIndicator(false);

    isPanModeRef.current = false;

    if(canvasRef.current) {
      canvasRef.current.style.cursor ="pointer";
    }

    panzoomRef.current?.pause();
  }

  function resumePanZoom() {

    if(canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
   
    setIndicator(true);

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
        />
        <Sidebar />

    <div className="whiteboard-viewport">
      <div
        aria-label="Collaborative canvas"
        ref={canvasRef}

      onPointerMove={handleCanvasPointerMove}
      onPointerUp={endDrag}
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
      {Object.entries(shapes ?? {}).map(([id, shape]) => {

        const selectedByOther = others.some(
          (other) => other.presence.selectShapeId === id
        );

        return (
          <>
          
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


          </>
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