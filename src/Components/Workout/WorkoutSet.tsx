import { FC, useContext, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { Loading } from '../Loading';
import { addWorkoutActivity } from '../../api';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { Units } from '../../types/user';

interface IProps {
    id: number | undefined;
    workoutExerciseId: number;
    set: number;
    week: number;
    day: number;
    defaultReps?: number;
    defaultWeight?: number;
    defaultSaved: boolean;
}

interface IState {
    reps: number;
    weight: string;
}

export const WorkoutSet: FC<IProps> = ({
    id,
    workoutExerciseId,
    set,
    week,
    day,
    defaultReps,
    defaultWeight,
    defaultSaved,
}) => {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({
        reps: defaultReps ?? 0,
        weight: defaultWeight?.toString() ?? '0',
    });
    const [saved, setSaved] = useState<boolean>(defaultSaved);
    const queryClient = useQueryClient();

    const mutation = useMutation(addWorkoutActivity, {
        onSuccess: () => {
            queryClient.invalidateQueries([
                'UserWorkoutExercises',
                workoutExerciseId,
            ]);
            setSaved(true);
        },
    });

    return (
        <div className="flex border-t border-ternary">
            <div className=" flex flex-1">
                <div className="inline-flex flex-1 items-center justify-center p-2">
                    <TextField
                        id={`exercise-reps-${id}-${set}`}
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
                    <span className="mx-2 text-xs text-ternary">Reps</span>
                </div>
            </div>
            <div className="flex flex-1 border-x border-ternary p-2">
                <TextField
                    id={`exercise-weight-${id}-${set}`}
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
                <span className="mx-2 my-auto text-xs text-ternary">
                    {user?.unit === Units.Imperial ? 'lbs' : 'kg'}
                </span>
            </div>
            <div className="flex w-16 flex-none">
                <div className="inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium">
                    <button
                        className="h-8 w-8"
                        onClick={() => {
                            mutation.mutate({
                                id: id,
                                userId: user?.id ?? '',
                                workoutExerciseId: workoutExerciseId,
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
