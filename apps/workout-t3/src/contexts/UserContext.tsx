'use client';

import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { Sex, Units, User } from '@fitness/types';
import { api } from '~/trpc/react';

interface IUserContext {
    user?: User;
    setUser: (user?: User) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProps> = ({ children }) => {
    // const userId = localStorage?.getItem("userId");
    const [user, setUser] = useState<User | undefined>(undefined);

    const userQuery = api.user.getUser.useQuery();

    useEffect(() => {
        if (!user && userQuery.data) {
            setUser({
                created: userQuery.data.Created.toISOString(),
                lastLogin: userQuery.data.LastLogin?.toISOString(),
                paid: true,
                sex: Sex.Male,
                unit: Units.Imperial,
                userRole: 0,
                id: userQuery.data.Id,
                email: userQuery.data.Email,
            });

            localStorage.setItem('userId', userQuery.data.Id);
        }
    }, [user, userQuery.data]);

    const userContext: IUserContext = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};
