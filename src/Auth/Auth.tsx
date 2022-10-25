import { createContext, FC, useState } from 'react';
import { Login } from '../Layouts/Login';
import { User } from '../types/user';
import { Layout } from '../Components/Layout';
import { Routes } from '../Components/Routes';
import { IonReactRouter } from '@ionic/react-router';
import { ScrollToTop } from '../ScrollToTop';
import { Register } from '../Layouts/Register';
import { MinVersion } from '../Components/MinVersion';
import { PurchaseAccess } from '../Components/PurchaseAccess';

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
                <IonReactRouter>
                    <Layout>
                        <Routes />
                        <ScrollToTop />
                        <PurchaseAccess />
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
