import { createContext, FC, useState } from 'react';
import { Login } from './Login';
import { User } from '../../types/user';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { Register } from './Register';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { ScrollToTop } from '../ScrollToTop';
import { MinVersion } from '../MinVersion';

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
    newUser: boolean;
    setNewUser: (newUser: boolean) => void;
    paid: boolean;
    setPaid: (paid: boolean) => void;
    openPurchase: boolean;
    setOpenPurchase: (openPurchase: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [register, setRegister] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [paid, setPaid] = useState<boolean>(false);
    const [openPurchase, setOpenPurchase] = useState<boolean>(false);

    const authContext: IAuthContext = {
        user,
        setUser,
        newUser,
        setNewUser,
        paid,
        setPaid,
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
        return (
            <Register
                setUser={setUser}
                setRegister={setRegister}
                setNewUser={setNewUser}
            />
        );
    }

    return <Login setUser={setUser} setRegister={setRegister} />;
};
