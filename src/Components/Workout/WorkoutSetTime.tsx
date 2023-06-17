import { type FC, useContext, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { addWorkoutActivity } from '../../api';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { SnackbarContext } from '../Snackbars/SnackbarProvider';

interface IProps {
    id: number | undefined;
    workoutExerciseId: number;
    set: number;
    week: number;
    day: number;
    defaultReps: number;
    defaultTime?: number;
    defaultSaved: boolean;
    timer?: number;
}

interface IState {
    reps: number;
    time: string;
}

export const WorkoutSetTime: FC<IProps> = ({
    id,
    workoutExerciseId,
    set,
    week,
    day,
    defaultReps,
    defaultTime,
    defaultSaved,
    timer,
}) => {
    const { user } = useContext(AuthContext);
    const { setOpenRestTimer } = useContext(SnackbarContext);
    const [state, setState] = useState<IState>({
        reps: defaultReps ?? 0,
        time: ((defaultTime ?? 0) / 60)?.toString(),
    });
    const [saved, setSaved] = useState<boolean>(defaultSaved);
    const queryClient = useQueryClient();

    const mutation = useMutation(addWorkoutActivity, {
        onSuccess: async () => {
            await queryClient.invalidateQueries([
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
        <div className="border-ternary flex border-t">
            <div className="border-ternary flex flex-1 border-r p-2">
                <TextField
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
                <span className="text-ternary mx-2 my-auto text-xs">
                    minutes
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
                                time: parseFloat(state.time) * 60,
                                set,
                                week,
                                day,
                            });
                        }}
                    >
                        {mutation.isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <CircleCheckSolid
                                className={
                                    saved
                                        ? 'fill-secondary'
                                        : 'border-ternary rounded-full border fill-transparent'
                                }
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
