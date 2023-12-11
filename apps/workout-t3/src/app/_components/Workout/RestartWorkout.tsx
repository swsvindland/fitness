'use client';

import { Button } from '../Buttons/Button';
import { FC } from 'react';
import { getUserWorkouts, restartWorkout } from '@fitness/api-legacy';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { useRouter } from 'next/navigation';

export const RestartWorkout: FC = () => {
    const router = useRouter();

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    const restartWorkoutMutation = useMutation(restartWorkout, {
        onSuccess: async () => {
            router.replace(`/workout`);
        },
    });

    const handleRestartWorkout = async () => {
        const activeWorkouts = userWorkoutsQuery.data?.data.filter(
            (item) => item.active
        );

        if (!activeWorkouts || activeWorkouts.length === 0) {
            router.replace('/workout/store');
            return null;
        }

        restartWorkoutMutation.mutate(activeWorkouts[0]!.workoutId);
    };

    if (userWorkoutsQuery.isLoading || restartWorkoutMutation.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Button className="mb-2" onClick={handleRestartWorkout}>
            Restart Workout
        </Button>
    );
};
