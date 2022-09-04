import { FC } from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Home } from '../Layouts/Home';
import { Workout } from '../Layouts/Workout';
import { WorkoutStore } from './Workout/WorkoutStore';
import { WorkoutDetail } from './Workout/WorkoutDetail';
import { Eat } from '../Layouts/Eat';
import { Supplements } from '../Layouts/Supplements';
import { AllSupplements } from './Supplements/AllSupplements';
import { Body } from '../Layouts/Body';
import { WeighInForm } from './Body/WeighInForm';
import { BodyCheckInForm } from './Body/BodyCheckInForm';
import { BloodPressureCheckInForm } from './Body/BloodPressureCheckInForm';

export const Routes: FC = () => {
    return (
        <Switch>
            <Route path="/home" element={<Home />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/workout/store" element={<WorkoutStore />} />
            <Route path="/workout/:workoutId" element={<WorkoutDetail />} />
            <Route path="/eat" element={<Eat />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route
                path="/supplements/all-supplements"
                element={<AllSupplements />}
            />
            <Route path="/body" element={<Body />} />
            <Route path="/body/weight" element={<WeighInForm />} />
            <Route path="/body/body" element={<BodyCheckInForm />} />
            <Route
                path="/body/blood-pressure"
                element={<BloodPressureCheckInForm />}
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Switch>
    );
};
