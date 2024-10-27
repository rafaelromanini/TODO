// types.ts
export interface Target {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}


export interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number; // Relaciona o target ao todo
}