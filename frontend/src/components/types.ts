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

interface Credentials {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  email: string;
  token: string;
}

interface NewUser {
  civility: string;
  pseudo: string;
  email: string;
  password: string;
}

export type { Task, User, Credentials, AuthenticatedUser, NewUser };
