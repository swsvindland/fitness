import { FC, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { Loading } from '../Loading';
import { addWorkoutActivity, getWorkoutActivity } from '../../api';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';

interface IProps {
    set: number;
    exercise: WorkoutExercise;
    week: number;
    day: number;
}

interface IState {
    reps: number;
    time: string;
}

export const WorkoutSetTime: FC<IProps> = ({ set, exercise, week, day }) => {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({ reps: 0, time: '0' });
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
            time: (
                parseFloat(
                    userWorkoutActivityQuery.data?.data.time?.toString() ?? '0'
                ) / 60
            ).toString(),
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
            <div className="flex flex-1 border-r border-ternary p-2">
                <TextField
                    id={`exercise-weight-${exercise.exerciseId}`}
                    value={state.time}
                    type="number"
                    inputMode="decimal"
                    onChange={(event) => {
                        setState({
                            ...state,
                            time: event.target.value,
                        });
                    }}
                    className="my-auto"
                />
                <span className="mx-2 my-auto text-xs text-ternary">
                    minutes
                </span>
            </div>
            <div className="flex w-16 flex-none">
                <div className="inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium">
                    <button
                        className="h-8 w-8"
                        onClick={() => {
                            mutation.mutate({
                                id: userWorkoutActivityQuery.data?.data.id,
                                userId: user?.id ?? '',
                                workoutExerciseId: exercise.id ?? 0,
                                reps: state.reps,
                                time: parseFloat(state.time) * 60,
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
                                        : 'rounded-full border border-ternary fill-transparent'
                                }
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
