import { FC, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { buyWorkout, getAllWorkoutExercises, getWorkout } from '../../api';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { Button } from '../Buttons/Button';
import { EditWorkoutExercise } from './EditWorkoutExercise';
import { WorkoutExercise } from '../../types/WorkoutExercise';

export const EditCustomWorkoutExercises: FC = () => {
    const { workoutId } = useParams<{
        workoutId?: string;
    }>();
    const [maxDays, setMaxDays] = useState<number>(1);
    const [day, setDay] = useState<number>(1);
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
        []
    );
    const queryClient = useQueryClient();
    const history = useHistory();

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        if (!workoutId) return;
        if (isNaN(parseInt(workoutId))) return;
        return getWorkout(parseInt(workoutId));
    });

    const workoutExercisesQuery = useQuery(
        ['WorkoutExercises', workoutId],
        () => getAllWorkoutExercises(parseInt(workoutId ?? '0'))
    );

    useMemo(() => {
        setMaxDays(workoutQuery.data?.data?.days || 1);
    }, [workoutQuery.data?.data?.days]);

    useMemo(() => {
        setWorkoutExercises(workoutExercisesQuery.data?.data || []);
    }, [workoutExercisesQuery.data?.data]);

    const handleAddWorkoutExercise = () => {
        const newWorkoutExercise: WorkoutExercise = {
            workoutId: parseInt(workoutId ?? '0'),
            exerciseId: 0,
            sets: 0,
            minReps: 0,
            maxReps: 0,
            day,
            order: workoutExercises.length + 1,
        };

        setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
    };

    const mutation = useMutation(buyWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            history.push('/workout', { replace: true });
        },
    });

    const handleStartWorkout = () => {
        mutation.mutate(parseInt(workoutId ?? '0'));
    };

    if (workoutQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Pagination selected={day} setSelected={setDay} pages={maxDays} />
            {workoutExercises
                .filter((e) => e.day === day)
                .map((item, index) => (
                    <EditWorkoutExercise
                        key={index}
                        index={index}
                        workoutExercise={item}
                    />
                ))}
            <div className="flex justify-between">
                <Button onClick={handleAddWorkoutExercise}>Add</Button>
            </div>
            <Button
                className="mt-6 w-full text-center flex justify-center"
                onClick={handleStartWorkout}
            >
                Start Workout
            </Button>
        </div>
    );
};
