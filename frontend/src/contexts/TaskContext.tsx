import { createContext, useContext, type ReactNode } from 'react';
import type { TaskContextType, NewTask, Task } from '../components/types';
import { UserContext } from './UserContext';
import type { UserContextType } from '../components/types';

const defaultTaskContext = {
  createTask: async () => {
    return undefined;
  },
  getTasks: async () => {
    return undefined;
  },
};

const TaskContext = createContext<TaskContextType>(defaultTaskContext);

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const { authenticatedUser } = useContext<UserContextType>(UserContext);
  const createTask = async (newTask: NewTask): Promise<NewTask | undefined> => {
    try {
      if (authenticatedUser) {
        const options = {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-Type': 'application/json',
            Authorization: authenticatedUser.token,
          },
        };

        const response = await fetch('/api/tasks', options);
        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        const t = await response.json();
        return t;
      }
    } catch (error) {
      console.error('Error creating task:', error);
      return undefined;
    }
  };

  const getTasks = async (): Promise<Task[] | undefined> => {
    try {
      if (authenticatedUser) {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authenticatedUser.token,
          },
        };

        const response = await fetch('/api/tasks', options);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const tasks = await response.json();
        return tasks;
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return undefined;
    }
  };

  const myContext: TaskContextType = {
    createTask,
    getTasks,
  };

  return (
    <TaskContext.Provider value={myContext}>{children}</TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
