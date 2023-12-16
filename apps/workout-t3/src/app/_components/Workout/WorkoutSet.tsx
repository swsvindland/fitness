import { FC, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';

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
    const userId = localStorage.getItem('userId') ?? '';
    const [state, setState] = useState<IState>({
        reps: defaultReps ?? 0,
        weight: defaultWeight?.toString() ?? '0',
    });
    const [saved, setSaved] = useState<boolean>(defaultSaved);

    return (
        <div className="border-ternary flex border-t">
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
            <div className="border-ternary flex flex-1 border-x p-2">
                <TextField
                    label="lbs"
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
                    <button onClick={() => {}}>
                        {/*{mutation.isLoading ? (*/}
                        {/*    <LoadingSpinner className="ml-2 h-12 w-12" />*/}
                        {/*) : (*/}
                        <CircleCheckSolid
                            className={
                                saved
                                    ? 'fill-secondary w-12'
                                    : 'border-ternary w-12 rounded-full border fill-transparent'
                            }
                        />
                        {/*)}*/}
                    </button>
                </div>
            </div>
        </div>
    );
};
