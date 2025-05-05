export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  user: string;
}

export interface TodoStats {
  total: number;
  completed: number;
}

export interface User {
  _id: string;
  email: string;
  name: string;
} 