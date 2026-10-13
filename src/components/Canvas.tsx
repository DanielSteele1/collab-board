"use client";

import {useStorage} from "@liveblocks/react/suspense";
import { useEffect, useState} from "react";

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

  return (
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
                ? "3px solid #2563eb"
                : "3px solid transparent",
            borderRadius: 12,
            background: shape.fill,
            cursor: "grab",
            touchAction: "none",
          }}
        />
      ))}
    </div>
  );
}