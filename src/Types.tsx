
export interface WhiteboardType {
  id: string,
  title: string;
  description: string;
  color: string;
  boardURL: string;
  createdAt: number;
}

export type WhiteboardCollection = WhiteboardType[];

// used to track users cursor movement when Dragging is enabled, so users can 
// move the canvas

export type Drag = {
   pointerId: number;
   shapeId: string;
   offsetX: number;
   offsetY: number;
}

// Shape of a shape object. 

export type Shape = {
  x: number;
  y: number;
  fill: string;
};

export type Stroke = {
  path: string;
}

// used to track a users cursor movement when drawing is enabled. X Y Z etc.

export type FreehandPoint = [number, number, number];
