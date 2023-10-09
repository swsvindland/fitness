import { FC } from 'react';
import { Body } from './Body/Body';
import { BloodPressureCheckInForm } from './Body/BloodPressure/BloodPressureCheckInForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Settings } from './Settings/Settings';
import { SexForm } from './Settings/SexForm';
import { ChangePasswordForm } from './Settings/ChangePasswordForm';
import { Layout } from './Layout';
import { UnitsForm } from './Settings/UnitsForm';
import { AllBloodPressure } from './Body/BloodPressure/AllBloodPressure';

export const Routes: FC = () => {
    return (
        <Switch>
            <Layout>
                <Route path="/body" exact={true}>
                    <Body />
                </Route>
                <Route path="/body/blood-pressure" exact={true}>
                    <BloodPressureCheckInForm />
                </Route>
                <Route path="/body/all-blood-pressure" exact={true}>
                    <AllBloodPressure />
                </Route>
                <Route path="/body/sex" exact={true}>
                    <SexForm />
                </Route>
                <Route path="/settings" exact={true}>
                    <Settings />
                </Route>
                <Route path="/settings/units" exact={true}>
                    <UnitsForm />
                </Route>
                <Route path="/settings/change-password" exact={true}>
                    <ChangePasswordForm />
                </Route>
            </Layout>
            <Redirect from="*" to="/" />
        </Switch>
    );
};
