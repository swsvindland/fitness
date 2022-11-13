import { createContext, FC, useState } from 'react';
import { Login } from './Login';
import { User } from '../../types/user';
import { Layout } from '../Layout';
import { Routes } from '../Routes';
import { IonReactRouter } from '@ionic/react-router';
import { ScrollToTop } from '../../ScrollToTop';
import { Register } from './Register';
import { MinVersion } from '../MinVersion';
import { PurchaseAccess } from '../PurchaseAccess';
import { HeaderProvider } from '../Navigation/HeaderContext';
import { Route, Switch } from 'react-router';
import { Scanner } from '../Scanner/Scanner';

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
                        <Switch>
                            <Route
                                path="/scan"
                                component={Scanner}
                                exact={true}
                            />
                            <Layout>
                                <Routes />
                                <ScrollToTop />
                                <PurchaseAccess />
                                <MinVersion />
                            </Layout>
                        </Switch>
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
