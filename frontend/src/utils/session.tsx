import type {
  AuthenticatedUser,
  MaybeAuthenticatedUser,
} from '../components/types';

const storeAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {
  localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
};

const getAuthenticatedUser = (): MaybeAuthenticatedUser => {
  const user = localStorage.getItem('authenticatedUser');
  if (user == null) return undefined;
  return JSON.parse(user);
};

const clearAuthenticatedUser = () => {
  localStorage.removeItem('authenticatedUser');
};

export { storeAuthenticatedUser, getAuthenticatedUser, clearAuthenticatedUser };
