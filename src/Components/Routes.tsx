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
import { Redirect, Route } from 'react-router';
import { HeightForm } from './Body/HeightForm';
import { AddFood } from './Food/AddFood';
import { FoodDetail } from './Food/FoodDetail';
import { ScanFood } from './Scanner/ScanFood';
import { Settings } from './Settings/Settings';
import { SexForm } from './Body/SexForm';
import { ChangePasswordForm } from './Settings/ChangePasswordForm';
import { UserFoodDetail } from './Food/UserFoodDetail';
import { CustomMacroForm } from './Macos/CustomMacroForm';

export const Routes: FC = () => {
    return (
        <>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/workout" component={Workout} exact={true} />
            <Route
                path="/workout/store"
                component={WorkoutStore}
                exact={true}
            />
            <Route
                path="/workout/:workoutId"
                component={WorkoutDetail}
                exact={true}
            />
            <Route path="/eat" component={Eat} exact={true} />
            <Route path="/eat/add-food" component={AddFood} exact={true} />
            <Route
                path="/eat/food/:foodId"
                component={FoodDetail}
                exact={true}
            />
            <Route
                path="/eat/user-food/:foodId"
                component={UserFoodDetail}
                exact={true}
            />
            <Route
                path="/eat/scan/:barcode"
                component={ScanFood}
                exact={true}
            />
            <Route
                path="/eat/custom-macros"
                component={CustomMacroForm}
                exact={true}
            />
            <Route path="/supplements" component={Supplements} exact={true} />
            <Route
                path="/supplements/all-supplements"
                component={AllSupplements}
                exact={true}
            />
            <Route path="/body" component={Body} exact={true} />
            <Route path="/body/weight" component={WeighInForm} exact={true} />
            <Route path="/body/body" component={BodyCheckInForm} exact={true} />
            <Route path="/body/height" component={HeightForm} exact={true} />
            <Route
                path="/body/blood-pressure"
                component={BloodPressureCheckInForm}
                exact={true}
            />
            <Route path="/body/sex" component={SexForm} exact={true} />
            <Route path="/settings" component={Settings} exact={true} />
            <Route
                path="/settings/change-password"
                component={ChangePasswordForm}
                exact={true}
            />
            <Redirect from="*" to="/home" />
        </>
    );
};
