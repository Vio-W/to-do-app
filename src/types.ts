export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = "all" | "active" | "completed";

export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  address: { city: string };
}
