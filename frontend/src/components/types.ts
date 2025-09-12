interface User {
  id: number;
  civility: string;
  pseudo: string;
  email: string;
  password: string;
}

interface Task {
  id: number;
  title: string;
  content: string;
  user: User;
}

interface NewTask {
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

type NewUser = Omit<User, 'id'>;

interface UserContextType {
  authenticatedUser?: AuthenticatedUser;
  registerUser: (user: NewUser) => Promise<boolean>;
  loginUser: (
    credentials: Credentials,
    rememberMe: boolean,
  ) => Promise<void | Response>;
  logout: () => void;
}

interface TaskContextType {
  createTask: (newTask: NewTask) => Promise<NewTask | undefined>;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

export type {
  Task,
  User,
  Credentials,
  AuthenticatedUser,
  NewUser,
  UserContextType,
  MaybeAuthenticatedUser,
  NewTask,
  TaskContextType,
};
