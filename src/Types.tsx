
export interface WhiteboardType {
  id: string,
  title: string;
  description: string;
  color: string;
  boardURL: string;
  createdAt: number;
}

export type WhiteboardCollection = WhiteboardType[];
