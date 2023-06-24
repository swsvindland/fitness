import { type FC } from 'react';
import { Home } from './Home/Home';
import { Workout } from './Workout/Workout';
import { WorkoutStore } from './Store/WorkoutStore';
import { WorkoutDetail } from './Store/WorkoutDetail';
import { Eat } from './Macros/Eat';
import { Supplements } from './Supplements/Supplements';
import { AllSupplements } from './Supplements/AllSupplements';
import { Body } from './Body/Body';
import { WeighInForm } from './Body/Weight/WeighInForm';
import { BodyCheckInForm } from './Body/Body/BodyCheckInForm';
import { BloodPressureCheckInForm } from './Body/BloodPressure/BloodPressureCheckInForm';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HeightForm } from './Body/HeightForm';
import { AddFood } from './Food/AddFood';
import { FoodDetail } from './Food/FoodDetail';
import { ScanFood } from './Scanner/ScanFood';
import { Settings } from './Settings/Settings';
import { SexForm } from './Settings/SexForm';
import { ChangePasswordForm } from './Settings/ChangePasswordForm';
import { UserFoodDetail } from './Food/UserFoodDetail';
import { CustomMacroForm } from './Macros/CustomMacroForm';
import { Scanner } from './Scanner/Scanner';
import { Layout } from './Layout';
import { UnitsForm } from './Settings/UnitsForm';
import { CreateCustomWorkout } from './CustomWorkout/CreateCustomWorkout';
import { UserCustomWorkoutDetail } from './Workout/UserCustomWorkoutDetail';
import { EditCustomWorkoutExercises } from './CustomWorkout/EditCustomWorkoutExercises';
import { EditCustomWorkout } from './CustomWorkout/EditCustomWorkout';
import { ProgressCamera } from './ProgressPhotos/ProgressCamera';
import { ProgressGallery } from './ProgressPhotos/ProgressGallery';
import { AllWeights } from './Body/Weight/AllWeights';
import { AllBloodPressure } from './Body/BloodPressure/AllBloodPressure';
import { AllBody } from './Body/Body/AllBody';
import { SnackbarProvider } from './Snackbars/SnackbarProvider';
import { WorkoutSubstitution } from './Workout/WorkoutSubstitution';
import { CheckIn } from './CheckIn/CheckIn';

export const Routes: FC = () => {
    return (
        <Switch>
            <Route path="/scanner" exact={true}>
                <Scanner />
            </Route>
            <Layout>
                <SnackbarProvider>
                    <Route path="/" exact={true}>
                        <Home />
                    </Route>
                    <Route path="/workout" exact={true}>
                        <Workout />
                    </Route>
                    <Route path="/workout/store" exact={true}>
                        <WorkoutStore />
                    </Route>
                    <Route path="/workout/store/:workoutId" exact={true}>
                        <WorkoutDetail />
                    </Route>
                    <Route path="/workout/custom/:workoutId" exact={true}>
                        <UserCustomWorkoutDetail />
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
                    <Route path="/eat/user-food/:userFoodId" exact={true}>
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
                    <Route path="/home/check-in" exact={true}>
                        <CheckIn />
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
                    <Route path="/workout/create" exact={true}>
                        <CreateCustomWorkout />
                    </Route>
                    <Route path="/workout/edit/:workoutId" exact={true}>
                        <EditCustomWorkout />
                    </Route>
                    <Route
                        path="/workout/edit/exercises/:workoutId"
                        exact={true}
                    >
                        <EditCustomWorkoutExercises />
                    </Route>
                    <Route
                        path="/workout/substitution/:workoutExerciseId"
                        exact={true}
                    >
                        <WorkoutSubstitution />
                    </Route>
                </SnackbarProvider>
            </Layout>
            <Redirect from="*" to="/" />
        </Switch>
    );
};
