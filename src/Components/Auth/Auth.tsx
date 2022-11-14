import { createContext, FC, useState } from 'react';
import { Login } from './Login';
import { User } from '../../types/user';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { Register } from './Register';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { ScrollToTop } from '../ScrollToTop';
import { PurchaseAccess } from '../PurchaseAccess';
import { MinVersion } from '../MinVersion';

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
                    <HeaderProvider>
                        <Routes />
                        <ScrollToTop />
                        <PurchaseAccess />
                        <MinVersion />
                    </HeaderProvider>
                </IonReactRouter>
            </AuthContext.Provider>
        );
    }

    if (register) {
        return <Register setUser={setUser} setRegister={setRegister} />;
    }

    return <Login setUser={setUser} setRegister={setRegister} />;
};
