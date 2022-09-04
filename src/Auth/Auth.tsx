import { createContext, FC, useState } from 'react';
import { Login } from '../Layouts/Login';
import { BrowserRouter } from 'react-router-dom';
import { User } from '../types/user';
import {Layout} from "../Components/Layout";
import {Routes} from "../Components/Routes";

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const authContext: IAuthContext = {
        user,
        setUser,
    };

    if (user) {
        return (
            <AuthContext.Provider value={authContext}>
                <BrowserRouter>
                    <Layout>
                        <Routes />
                    </Layout>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    }

    return <Login setUser={setUser} />;
};
