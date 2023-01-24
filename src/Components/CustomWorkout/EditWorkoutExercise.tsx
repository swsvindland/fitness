import { TextField } from '../TextFields/TextField';
import { FC, useMemo, useState } from 'react';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getExercises, upsertWorkoutExercises } from '../../api';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { Button } from '../Buttons/Button';
import { Autocomplete } from '../Autocomplete';

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
    const [sets, setSets] = useState<string>(workoutExercise.sets.toString());
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
    const queryClient = useQueryClient();

    const exerciseQuery = useQuery(['Exercises'], getExercises);

    const mutation = useMutation(upsertWorkoutExercises, {
        onSuccess: () => {
            queryClient.invalidateQueries(['WorkoutExercises']);
            setSaved(true);
        },
    });

    useMemo(() => {
        const newOptions =
            exerciseQuery.data?.data.map((item) => item.name) || [];
        const newOption = exerciseQuery.data?.data.find(
            (item) => item.id === workoutExercise.exerciseId
        );

        setOptions(newOptions);
        setOption(newOption?.name);
        setQuery(newOption?.name ?? '');
    }, [exerciseQuery.data?.data, workoutExercise.exerciseId]);

    const handleSubmit = () => {
        if (!option) return;
        if (!workoutExercise.workoutId) return;

        mutation.mutate({
            id: workoutExercise.id,
            workoutId: workoutExercise.workoutId,
            exerciseId:
                exerciseQuery.data?.data
                    .filter((item) => item.name === option)
                    .at(0)?.id ?? 0,
            sets: parseInt(sets),
            minReps: minReps ? parseInt(minReps) : undefined,
            maxReps: maxReps ? parseInt(maxReps) : undefined,
            time: time ? parseInt(time) : undefined,
            order: index,
            day: workoutExercise.day,
        });
    };

    return (
        <div className="card p-4 my-2">
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
            <div className="flex flex-row">
                <TextField
                    label="Sets"
                    value={sets}
                    onChange={(event) => {
                        setSaved(false);
                        setSets(event.target.value);
                    }}
                />
            </div>
            <span className="my-4 text-ternary">
                *Choose either a time or rep range. If you choose a time and rep
                range, it will only show a time based set.
            </span>
            <div className="flex flex-row">
                <TextField
                    label="MinReps"
                    value={minReps ?? ''}
                    onChange={(event) => {
                        setSaved(false);
                        setMinReps(event.target.value);
                    }}
                />
                <TextField
                    label="MaxReps"
                    value={maxReps ?? ''}
                    onChange={(event) => {
                        setSaved(false);
                        setMaxReps(event.target.value);
                    }}
                />
            </div>
            <TextField
                label="Time (in seconds) (will display in minutes on workout)"
                value={time ?? ''}
                onChange={(event) => {
                    setSaved(false);
                    setTime(event.target.value);
                }}
            />
            <div className="flex justify-between mt-2">
                <SecondaryButton className="m-1">Delete</SecondaryButton>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};
