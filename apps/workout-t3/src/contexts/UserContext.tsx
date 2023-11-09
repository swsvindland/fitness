"use client";

import { createContext, FC, ReactNode, useState } from "react";
import { User } from "@fitness/types";

interface IUserContext {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const userContext: IUserContext = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
