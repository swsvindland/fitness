import { createContext, FC, useState } from 'react';
import { Login } from './Login';
import { User } from '../../types/user';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { Register } from './Register';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { ScrollToTop } from '../ScrollToTop';
import { MinVersion } from '../MinVersion';
import { ForgotPassword } from './ForgotPassword';
import { BannerAd } from '../Ads/BannerAd';
import { PurchaseAccess } from '../PurchaseAccess';

interface IAuthContext {
    user?: User;
    setUser: (user?: User) => void;
    newUser: boolean;
    setNewUser: (newUser: boolean) => void;
    openPurchase: boolean;
    setOpenPurchase: (openPurchase: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const Auth: FC = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [register, setRegister] = useState<boolean>(false);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [openPurchase, setOpenPurchase] = useState<boolean>(false);

    const authContext: IAuthContext = {
        user,
        setUser,
        newUser,
        setNewUser,
        openPurchase,
        setOpenPurchase,
    };

    if (user) {
        return (
            <AuthContext.Provider value={authContext}>
                <IonReactRouter>
                    <HeaderProvider>
                        <PurchaseAccess check />
                        {!user.paid && <BannerAd />}
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
