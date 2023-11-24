'use client';

import { TextField } from '../TextFields/TextField';
import { FC, useMemo, useState } from 'react';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { WorkoutExercise } from '@fitness/types';
import { Button } from '../Buttons/Button';
import { Autocomplete } from '../Autocomplete';
import { api } from '~/trpc/react';

interface IProps {
    index: number;
    workoutExercise: WorkoutExercise;
}

export const EditWorkoutExercise: FC<IProps> = ({ index, workoutExercise }) => {
    const [query, setQuery] = useState<string>(
        workoutExercise.exercise?.name ?? ''
    );
    const [options, setOptions] = useState<string[]>([]);
    const [option, setOption] = useState<string | undefined>(undefined);
    const [minReps, setMinReps] = useState<string | undefined>(
        workoutExercise.minReps?.toString()
    );
    const [maxReps, setMaxReps] = useState<string | undefined>(
        workoutExercise.maxReps?.toString()
    );
    const [time, setTime] = useState<string | undefined>(
        workoutExercise.time?.toString()
    );
    const [saved, setSaved] = useState<boolean>(false);
    const utils = api.useUtils();

    const exerciseQuery = api.customWorkout.getExercises.useQuery();

    const mutation = api.customWorkout.upsertWorkoutExercise.useMutation({
        onSuccess: () => {
            utils.customWorkout.invalidate();
            setSaved(true);
        },
    });

    useMemo(() => {
        const newOptions = exerciseQuery.data?.map((item) => item.Name) || [];
        const newOption = exerciseQuery.data?.find(
            (item) => Number(item.Id) === workoutExercise.exerciseId
        );

        setOptions(newOptions);
        setOption(newOption?.Name);
        setQuery(newOption?.Name ?? '');
    }, [exerciseQuery.data, workoutExercise.exerciseId]);

    const handleSubmit = () => {
        if (!option) return;
        if (!workoutExercise.workoutId) return;

        const exerciseId =
            exerciseQuery.data?.find((item) => item.Name === option)?.Id ?? 0;

        mutation.mutate({
            id: workoutExercise.id ?? null,
            workoutId: workoutExercise.workoutId,
            exerciseId: Number(exerciseId),
            minReps: minReps ? parseInt(minReps) : null,
            maxReps: maxReps ? parseInt(maxReps) : null,
            order: index,
            day: workoutExercise.day,
        });
    };

    return (
        <div className="card my-2 p-4">
            {!saved && (
                <span className="text-ternary mb-4">*Unsaved changes</span>
            )}
            <Autocomplete
                label="Exercise"
                isLoading={false}
                selected={option}
                setSelected={(value) => {
                    setSaved(false);
                    setOption(value);
                }}
                filtered={options.filter((item) =>
                    item.toLowerCase().includes(query.toLowerCase())
                )}
                query={query}
                setQuery={setQuery}
            />
            <span className="text-ternary my-4">
                *Choose either a time or rep range. If you choose a time and rep
                range, it will only show a time based set.
            </span>
            <div className="flex flex-row">
                <TextField
                    label="MinReps"
                    type="number"
                    inputMode="numeric"
                    value={minReps ?? ''}
                    onChange={(event) => {
                        setSaved(false);
                        setMinReps(event.target.value);
                    }}
                />
                <TextField
                    label="MaxReps"
                    type="number"
                    inputMode="numeric"
                    value={maxReps ?? ''}
                    onChange={(event) => {
                        setSaved(false);
                        setMaxReps(event.target.value);
                    }}
                />
            </div>
            <TextField
                label="Time (in seconds) (will display in minutes on workout)"
                type="number"
                inputMode="numeric"
                value={time ?? ''}
                onChange={(event) => {
                    setSaved(false);
                    setTime(event.target.value);
                }}
            />
            <div className="mt-2 flex justify-between">
                <SecondaryButton className="m-1">Delete</SecondaryButton>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};
