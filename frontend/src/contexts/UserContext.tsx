import { createContext, useState, type ReactNode } from 'react';
import type {
  AuthenticatedUser,
  UserContextType,
  MaybeAuthenticatedUser,
  NewUser,
  Credentials,
} from '../components/types';
import { storeAuthenticatedUser } from '../utils/session';

const defaultUserContext = {
  authenticatedUser: undefined,
  registerUser: async () => {
    return false;
  },
  loginUser: async () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(undefined);

  const registerUser = async (newUser: NewUser): Promise<boolean> => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('/api/auths/register', options);

      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  };

  const loginUser = async (
    credentials: Credentials,
  ): Promise<void | Response> => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch('/api/auths/login', options);

      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`,
        );
      }

      const authenticatedUser: AuthenticatedUser = await response.json();
      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
      console.log('authenticatedUser: ', authenticatedUser);
    } catch (err) {
      console.error('loginUser::error: ', err);
      throw err;
    }
  };

  const myContext: UserContextType = {
    authenticatedUser,
    registerUser,
    loginUser,
  };

  return (
    <UserContext.Provider value={myContext}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
