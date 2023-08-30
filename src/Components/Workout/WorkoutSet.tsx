import { FC, useContext, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { addWorkoutActivity } from '../../api';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { Units } from '../../types/User';
import { SnackbarContext } from '../Snackbars/SnackbarProvider';

interface IProps {
    id: number | undefined;
    workoutExerciseId: number;
    set: number;
    week: number;
    day: number;
    defaultReps?: number;
    defaultWeight?: number;
    defaultSaved: boolean;
    timer?: number;
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
    timer,
}) => {
    const { user } = useContext(AuthContext);
    const { setOpenRestTimer } = useContext(SnackbarContext);
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
            setOpenRestTimer({
                id: `${workoutExerciseId}-${set}`,
                time: timer,
            });
        },
    });

    return (
        <div className="flex border-t border-teal-800">
            <div className=" flex flex-1">
                <div className="inline-flex flex-1 items-center justify-center p-2">
                    <TextField
                        label="Reps"
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
                </div>
            </div>
            <div className="flex flex-1 border-x border-teal-800 p-2">
                <TextField
                    label={user?.unit === Units.Imperial ? 'lbs' : 'kg'}
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
            </div>
            <div className="flex w-24 flex-none">
                <div className="inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium">
                    <button
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
                            <LoadingSpinner className="ml-2 h-12 w-12" />
                        ) : (
                            <CircleCheckSolid
                                className={
                                    saved
                                        ? 'w-12 fill-teal-500'
                                        : 'w-12 rounded-full border border-teal-500 fill-transparent'
                                }
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
