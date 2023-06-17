import { createContext, type FC, useState } from 'react';
import { Login } from './Login';
import { type User } from '../../types/User';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { Register } from './Register';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { ScrollToTop } from '../ScrollToTop';
import { MinVersion } from '../MinVersion';
import { ForgotPassword } from './ForgotPassword';

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
    openPurchase: boolean;
    setOpenPurchase: (openPurchase: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [register, setRegister] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [openPurchase, setOpenPurchase] = useState<boolean>(false);

    const authContext: IAuthContext = {
        user,
        setUser,
        openPurchase,
        setOpenPurchase,
    };

    if (user) {
        return (
            <AuthContext.Provider value={authContext}>
                <IonReactRouter>
                    <HeaderProvider>
                        <Routes />
                        <ScrollToTop />
                        <MinVersion />
                    </HeaderProvider>
                </IonReactRouter>
            </AuthContext.Provider>
        );
    }

    if (register) {
        return <Register setUser={setUser} setRegister={setRegister} />;
    }

    if (forgotPassword) {
        return <ForgotPassword setForgotPassword={setForgotPassword} />;
    }

    return (
        <Login
            setUser={setUser}
            setRegister={setRegister}
            setForgotPassword={setForgotPassword}
        />
    );
};
