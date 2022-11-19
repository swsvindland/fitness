import { FC } from 'react';
import { Home } from './Home/Home';
import { Workout } from './Workout/Workout';
import { WorkoutStore } from './Workout/WorkoutStore';
import { WorkoutDetail } from './Workout/WorkoutDetail';
import { Eat } from './Macos/Eat';
import { Supplements } from './Supplements/Supplements';
import { AllSupplements } from './Supplements/AllSupplements';
import { Body } from './Body/Body';
import { WeighInForm } from './Body/WeighInForm';
import { BodyCheckInForm } from './Body/BodyCheckInForm';
import { BloodPressureCheckInForm } from './Body/BloodPressureCheckInForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HeightForm } from './Body/HeightForm';
import { AddFood } from './Food/AddFood';
import { FoodDetail } from './Food/FoodDetail';
import { ScanFood } from './Scanner/ScanFood';
import { Settings } from './Settings/Settings';
import { SexForm } from './Settings/SexForm';
import { ChangePasswordForm } from './Settings/ChangePasswordForm';
import { UserFoodDetail } from './Food/UserFoodDetail';
import { CustomMacroForm } from './Macos/CustomMacroForm';
import { Scanner } from './Scanner/Scanner';
import { Layout } from './Layout';
import { UnitsForm } from './Settings/UnitsForm';

export const Routes: FC = () => {
    return (
        <Switch>
            <Redirect exact={true} from="/" to="/home" />
            <Route path="/scanner" exact={true}>
                <Scanner />
            </Route>
            <Layout>
                <Route path="/home" exact={true}>
                    <Home />
                </Route>
                <Route path="/workout" exact={true}>
                    <Workout />
                </Route>
                <Route path="/workout/store" exact={true}>
                    <WorkoutStore />
                </Route>
                <Route path="/workout/:workoutId" exact={true}>
                    <WorkoutDetail />
                </Route>
                <Route path="/eat" exact={true}>
                    <Eat />
                </Route>
                <Route path="/eat/add-food" exact={true}>
                    <AddFood />
                </Route>
                <Route path="/eat/food/:foodId" exact={true}>
                    <FoodDetail />
                </Route>
                <Route path="/eat/user-food/:foodId" exact={true}>
                    <UserFoodDetail />
                </Route>
                <Route path="/eat/scan/:barcode" exact={true}>
                    <ScanFood />
                </Route>
                <Route path="/eat/custom-macros" exact={true}>
                    <CustomMacroForm />
                </Route>
                <Route path="/supplements" exact={true}>
                    <Supplements />
                </Route>
                <Route path="/supplements/all-supplements" exact={true}>
                    <AllSupplements />
                </Route>
                <Route path="/body" exact={true}>
                    <Body />
                </Route>
                <Route path="/body/weight" exact={true}>
                    <WeighInForm />
                </Route>
                <Route path="/body/body" exact={true}>
                    <BodyCheckInForm />
                </Route>
                <Route path="/body/height" exact={true}>
                    <HeightForm />
                </Route>
                <Route path="/body/blood-pressure" exact={true}>
                    <BloodPressureCheckInForm />
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
            <Redirect from="*" to="/home" />
        </Switch>
    );
};
