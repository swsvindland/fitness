import { createContext, FC, useState } from 'react';
import { Login } from './Login';
import { User } from '@fitness/types';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { Register } from './Register';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { ScrollToTop } from '../ScrollToTop';
import { MinVersion } from '../MinVersion';
import { ForgotPassword } from './ForgotPassword';
import { PurchaseAccess } from '../Purchase/PurchaseAccess';

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [register, setRegister] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    const authContext: IAuthContext = {
        user,
        setUser,
    };

    if (user) {
        return (
            <AuthContext.Provider value={authContext}>
                <IonReactRouter>
                    <HeaderProvider>
                        <Routes />
                        <ScrollToTop />
                        <MinVersion />
                        <PurchaseAccess />
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
