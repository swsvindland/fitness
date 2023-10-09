import { FC } from 'react';
import { Body } from './Body/Body';
import { WeighInForm } from './Body/Weight/WeighInForm';
import { BodyCheckInForm } from './Body/Body/BodyCheckInForm';
import { BloodPressureCheckInForm } from './Body/BloodPressure/BloodPressureCheckInForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HeightForm } from './Body/HeightForm';
import { Settings } from './Settings/Settings';
import { SexForm } from './Settings/SexForm';
import { ChangePasswordForm } from './Settings/ChangePasswordForm';
import { Layout } from './Layout';
import { UnitsForm } from './Settings/UnitsForm';
import { ProgressCamera } from './ProgressPhotos/ProgressCamera';
import { ProgressGallery } from './ProgressPhotos/ProgressGallery';
import { AllWeights } from './Body/Weight/AllWeights';
import { AllBloodPressure } from './Body/BloodPressure/AllBloodPressure';
import { AllBody } from './Body/Body/AllBody';
import { SnackbarProvider } from './Snackbars/SnackbarProvider';

export const Routes: FC = () => {
    return (
        <Switch>
            <Layout>
                <SnackbarProvider>
                    <Route path="/body" exact={true}>
                        <Body />
                    </Route>
                    <Route path="/body/weight" exact={true}>
                        <WeighInForm />
                    </Route>
                    <Route path="/body/all-weight" exact={true}>
                        <AllWeights />
                    </Route>
                    <Route path="/body/body" exact={true}>
                        <BodyCheckInForm />
                    </Route>
                    <Route path="/body/all-bodies" exact={true}>
                        <AllBody />
                    </Route>
                    <Route path="/body/height" exact={true}>
                        <HeightForm />
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
                    <Route path="/body/progress/upload" exact={true}>
                        <ProgressCamera />
                    </Route>
                    <Route path="/body/progress" exact={true}>
                        <ProgressGallery />
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
                </SnackbarProvider>
            </Layout>
            <Redirect from="*" to="/" />
        </Switch>
    );
};
