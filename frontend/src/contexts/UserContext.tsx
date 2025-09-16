import { createContext, useState, type ReactNode } from 'react';
import type {
  AuthenticatedUser,
  UserContextType,
  MaybeAuthenticatedUser,
  NewUser,
  Credentials,
} from '../components/types';
import {
  storeAuthenticatedUser,
  getAuthenticatedUser,
  clearAuthenticatedUser,
  storeSessionAuthenticatedUser,
} from '../utils/session.tsx';

const defaultUserContext = {
  authenticatedUser: undefined,
  registerUser: async () => {
    return false;
  },
  loginUser: async () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(getAuthenticatedUser());

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const registerUser = async (newUser: NewUser): Promise<boolean> => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`${apiUrl}/auths/register`, options);

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
    rememberMe: boolean,
  ): Promise<void | Response> => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`${apiUrl}/auths/login`, options);

      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`,
        );
      }

      const authenticatedUser: AuthenticatedUser = await response.json();
      if (rememberMe) {
        storeAuthenticatedUser(authenticatedUser);
      } else {
        storeSessionAuthenticatedUser(authenticatedUser);
      }
      setAuthenticatedUser(authenticatedUser);
      console.log('authenticatedUser: ', authenticatedUser);
    } catch (err) {
      console.error('loginUser::error: ', err);
      throw err;
    }
  };

  const logout = () => {
    setAuthenticatedUser(undefined);
    clearAuthenticatedUser();
  };

  const myContext: UserContextType = {
    authenticatedUser,
    registerUser,
    loginUser,
    logout,
  };

  return (
    <UserContext.Provider value={myContext}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
