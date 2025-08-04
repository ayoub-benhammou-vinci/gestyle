interface User {
  id: number;
  sexe: string;
  pseudo: string;
  email: string;
  password: string;
}

interface Task {
  title: string;
  content: string;
}

export type { Task, User };
