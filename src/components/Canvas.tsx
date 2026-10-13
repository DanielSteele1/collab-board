"use client";

import { LiveObject } from "@liveblocks/client"
import {useStorage, useMutation} from "@liveblocks/react/suspense";
import { useEffect, useState} from "react";
import Toolbar from "./Toolbar";

const COLORS = ["#f59e0b", "#8b5cf6", "#10b981", "#ec4899"];

const BOX_SIZE = 100;

type Shape = {
  x: number;
  y: number;
  fill: string;
};

export function Canvas() {
  const shapes = useStorage((root) => {
    const value = root.shapes;

    return (value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, Shape>)
      : {}) as Record<string, Shape>;
  });
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (selectedShapeId && shapes[selectedShapeId] === undefined) {
      setSelectedShapeId(null);
    }
  }, [selectedShapeId, shapes]);

  const addShape = useMutation(({ storage }) => {
    const id = crypto.randomUUID();
    const fill = COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#f59e0b";

    storage.get("shapes").set(
        id,
        new LiveObject({
            x: 80 + Math.round(Math.random() * 240),
            y: 100 + Math.round(Math.random() * 240),
            fill,
        })
    );

    return id;
  }, []);

  const deleteShape = useMutation(({ storage }, id: string) => {
    storage.get("shapes").delete(id);
  }, []);

  return (
    <div>
        <Toolbar addShape={addShape} deleteShape={deleteShape} selectedShapeID={selectedShapeId}/>
    <div
      aria-label="Collaborative canvas"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedShapeId(null);
        }
      }}

      className="whiteboard-canvas"
    >
      {Object.entries(shapes ?? {}).map(([id, shape]) => (
        <button
          key={id}
          type="button"
          aria-label={`Select box ${id}`}
          aria-pressed={selectedShapeId === id}
          onPointerDown={(event) => {
            event.stopPropagation();
            setSelectedShapeId(id);
          }}
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            width: BOX_SIZE,
            height: BOX_SIZE,
            border:
              selectedShapeId === id
                ? "3px solid #A259FF"
                : "3px solid transparent",
            borderRadius: 12,
            background: shape.fill,
            cursor: "grab",
            touchAction: "none",
          }}
        />
      ))}
     </div>
    </div>
  );
}