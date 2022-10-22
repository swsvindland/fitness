import { createContext, FC, useState } from 'react';
import { Login } from '../Layouts/Login';
import { User } from '../types/user';
import { Layout } from '../Components/Layout';
import { Routes } from '../Components/Routes';
import { IonReactRouter } from '@ionic/react-router';
import { ScrollToTop } from '../ScrollToTop';
import { Register } from '../Layouts/Register';
import { MinVersion } from '../Components/MinVersion';

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [register, setRegister] = useState<boolean>(false);

    const authContext: IAuthContext = {
        user,
        setUser,
    };

    if (user) {
        return (
            <AuthContext.Provider value={authContext}>
                {/* @ts-ignore */}
                <IonReactRouter>
                    <Layout>
                        <Routes />
                        <ScrollToTop />
                        <MinVersion />
                    </Layout>
                </IonReactRouter>
            </AuthContext.Provider>
        );
    }

    if (register) {
        return <Register setUser={setUser} setRegister={setRegister} />;
    }

    return <Login setUser={setUser} setRegister={setRegister} />;
};
