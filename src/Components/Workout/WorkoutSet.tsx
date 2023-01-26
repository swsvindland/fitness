import { FC, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { Loading } from '../Loading';
import { addWorkoutActivity, getWorkoutActivity } from '../../api';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { Units } from '../../types/user';

interface IProps {
    set: number;
    exercise: WorkoutExercise;
    week: number;
    day: number;
}

interface IState {
    reps: number;
    weight: string;
}

export const WorkoutSet: FC<IProps> = ({ set, exercise, week, day }) => {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({ reps: 0, weight: '0' });
    const [saved, setSaved] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const userWorkoutActivityQuery = useQuery(
        ['UserWorkoutActivity', exercise.id, set, week, day],
        () => {
            if (!exercise.id) return;
            return getWorkoutActivity(exercise.id, set, week, day);
        }
    );

    const mutation = useMutation(addWorkoutActivity, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === 'UserWorkoutActivity' &&
                    query.queryKey?.at(1) === exercise.id &&
                    (query.queryKey?.at(2) ?? 0) >= set,
            });
            setSaved(true);
        },
    });

    useMemo(() => {
        if (!userWorkoutActivityQuery.data) {
            return;
        }

        setState({
            reps: userWorkoutActivityQuery.data?.data.reps,
            weight:
                userWorkoutActivityQuery.data?.data.weight?.toString() ?? '0',
        });

        if (userWorkoutActivityQuery.data.data.saved) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [userWorkoutActivityQuery.data]);

    if (userWorkoutActivityQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex border-t border-ternary">
            <div className=" flex-1 flex">
                <div className="flex-1 inline-flex items-center justify-center p-2">
                    <TextField
                        id={`exercise-reps-${exercise.exerciseId}`}
                        value={state.reps}
                        type="number"
                        inputMode="numeric"
                        onChange={(event) => {
                            setState({
                                ...state,
                                reps: parseInt(event.target.value),
                            });
                        }}
                    />
                    <span className="mx-2 text-ternary text-xs">Reps</span>
                </div>
            </div>
            <div className="flex-1 flex border-x border-ternary p-2">
                <TextField
                    id={`exercise-weight-${exercise.exerciseId}`}
                    value={state.weight}
                    type="number"
                    inputMode="decimal"
                    onChange={(event) => {
                        setState({
                            ...state,
                            weight: event.target.value,
                        });
                    }}
                    className="my-auto"
                />
                <span className="mx-2 my-auto text-ternary text-xs">
                    {user?.unit === Units.Imperial ? 'lbs' : 'kg'}
                </span>
            </div>
            <div className="flex-none flex w-16">
                <div className="w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-br-lg">
                    <button
                        className="w-8 h-8"
                        onClick={() => {
                            mutation.mutate({
                                id: userWorkoutActivityQuery.data?.data.id,
                                userId: user?.id ?? '',
                                workoutExerciseId: exercise.id ?? 0,
                                reps: state.reps,
                                weight: parseFloat(state.weight),
                                set,
                                week,
                                day,
                            });
                        }}
                    >
                        {mutation.isLoading ? (
                            <Loading />
                        ) : (
                            <CircleCheckSolid
                                className={
                                    saved
                                        ? 'fill-secondary'
                                        : 'fill-transparent border-ternary border rounded-full'
                                }
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
