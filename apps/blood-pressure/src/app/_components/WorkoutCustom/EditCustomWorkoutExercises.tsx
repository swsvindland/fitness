'use client';

import { FC, useEffect, useState } from 'react';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { Pagination } from '../Pagination';
import { Button } from '../Buttons/Button';
import { EditWorkoutExercise } from './EditWorkoutExercise';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { WorkoutExercise } from '@fitness/types';

interface IProps {
    workoutId: number;
}

export const EditCustomWorkoutExercises: FC<IProps> = ({ workoutId }) => {
    const [maxDays, setMaxDays] = useState<number>(1);
    const [day, setDay] = useState<number>(1);
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
        []
    );
    const router = useRouter();
    const utils = api.useUtils();

    const workoutQuery = api.customWorkout.getWorkout.useQuery({ workoutId });

    useEffect(() => {
        setMaxDays(workoutQuery.data?.Days || 1);
        setWorkoutExercises(
            workoutQuery.data?.WorkoutExercise?.map((item) => ({
                id: Number(item.Id),
                workoutId: Number(item.WorkoutId),
                exerciseId: Number(item.ExerciseId),
                minReps: item.MinReps ?? undefined,
                maxReps: item.MaxReps ?? undefined,
                day: item.Day,
                order: item.Order ?? 0,
            })) || []
        );
    }, [workoutQuery.data]);

    const handleAddWorkoutExercise = () => {
        const newWorkoutExercise = {
            workoutId: workoutId,
            exerciseId: 0,
            minReps: undefined,
            maxReps: undefined,
            time: undefined,
            day,
            order: workoutExercises.length + 1,
            restTime: undefined,
        };

        setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
    };

    const mutation = api.store.buyWorkout.useMutation({
        onSuccess: async () => {
            await utils.invalidate();
            router.replace(`/workout`);
        },
    });

    const handleStartWorkout = () => {
        mutation.mutate({ workoutId });
    };

    if (workoutQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container">
            <Pagination selected={day} setSelected={setDay} pages={maxDays} />
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {workoutExercises
                    .filter((e) => e.day === day)
                    .map((item, index) => (
                        <EditWorkoutExercise
                            key={index}
                            index={index}
                            workoutExercise={item}
                        />
                    ))}
            </div>
            <div className="flex justify-between">
                <Button onClick={handleAddWorkoutExercise}>Add</Button>
            </div>
            <Button
                className="mt-6 flex w-full justify-center text-center"
                onClick={handleStartWorkout}
            >
                Start Workout
            </Button>
        </div>
    );
};
