



export type User = {

  id: number;
  name: string;
  
  email: string;
  isGuest: boolean;
}



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
   itemType: "shape" | "note" | "text"; // add more obj here later
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

export type Text = {
  x: number;
  y: number;
  text: string;
  fill?: string;
  size?: number;
  boldness?: number;
}


export type FreehandPoint = [number, number, number];


  const moodboardId = crypto.randomUUID();
  const ideasId = crypto.randomUUID();
  const projectsId = crypto.randomUUID();
  const wireframeId = crypto.randomUUID();

  export const defaultBoards: WhiteboardCollection = [
  {
    id: ideasId,
    title: "Ideas",
    description: "A place for brainstorms",
    color:  "#c681f5",
    boardURL: `/whiteboard/${ideasId}`,
    createdAt: Date.parse("2026-02-26"),
    createdBy: 'Auto-Generated'

  },
  {
    id: projectsId,
    title: "Project Planning",
    description: "Plan tasks and milestones",
    color: "#4F8EF7",
    boardURL: `/whiteboard/${projectsId}`,
    createdAt: Date.parse('2025-06-14'),
    createdBy: 'Auto-Generated'
  },
  {
    id: moodboardId,
    title: "Moodboard",
    description: "Moodboard",
    color: "#ecc67e",
    boardURL: `/whiteboard/${moodboardId}`,
    createdAt: Date.parse('2024-12-14'),
    createdBy: 'Auto-Generated'
  },
  {
    id: wireframeId,
    title: "Wireframe",
    description: "Wrireframing work",
    color: "#70f176",
    boardURL: `/whiteboard/${wireframeId}`,
    createdAt: Date.parse('2022-10-14'),
    createdBy: 'Auto-Generated',
  },
  ]

