
export interface WhiteboardType {
  id: string,
  title: string;
  description: string;
  color: string;
  boardURL: string;
  createdAt: number;
  createdBy: string;
}

export type WhiteboardCollection = WhiteboardType[];


export type Drag = {
   pointerId: number;
   offsetX: number;
   offsetY: number;
   itemId: string;
   itemType: "shape" | "note"; // add more obj here later
}

// Shape of a shape object. 

export type Shape = {
  x: number;
  y: number;
  fill: string;
};

export type Stroke = {
  path: string;
  color: string;
}

// add text property here later

export type Notes = {
  x: number;
  y: number;
  fill: string;
  text: string;
}

export type FreehandPoint = [number, number, number];
