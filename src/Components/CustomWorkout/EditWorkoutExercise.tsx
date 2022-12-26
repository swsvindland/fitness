import { Dropdown, DropdownOption } from '../Dropdown';
import { TextField } from '../TextFields/TextField';
import { FC, useMemo, useState } from 'react';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getExercises, upsertWorkoutExercises } from '../../api';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { Button } from '../Buttons/Button';

interface IProps {
    index: number;
    workoutExercise: WorkoutExercise;
}

export const EditWorkoutExercise: FC<IProps> = ({ index, workoutExercise }) => {
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [option, setOption] = useState<DropdownOption | undefined>(undefined);
    const [sets, setSets] = useState<string>(workoutExercise.sets.toString());
    const [minReps, setMinReps] = useState<string>(
        workoutExercise.minReps.toString()
    );
    const [maxReps, setMaxReps] = useState<string>(
        workoutExercise.maxReps.toString()
    );
    const queryClient = useQueryClient();

    const exerciseQuery = useQuery(['Exercises'], getExercises);

    const mutation = useMutation(upsertWorkoutExercises, {
        onSuccess: () => {
            queryClient.invalidateQueries(['WorkoutExercises']);
        },
    });

    useMemo(() => {
        const newOptions =
            exerciseQuery.data?.data.map((item) => ({
                id: item.id,
                name: item.name,
            })) || [];

        setOptions(newOptions);
        setOption(
            newOptions.find((item) => item.id === workoutExercise.exerciseId)
        );
    }, [exerciseQuery.data?.data, workoutExercise.exerciseId]);

    const handleSubmit = () => {
        console.log(option, workoutExercise);

        if (!option) return;
        if (!workoutExercise.workoutId) return;

        mutation.mutate({
            id: workoutExercise.id,
            workoutId: workoutExercise.workoutId,
            exerciseId: option?.id,
            sets: parseInt(sets),
            minReps: parseInt(minReps),
            maxReps: parseInt(maxReps),
            order: index,
            day: workoutExercise.day,
        });
    };

    return (
        <div className="card p-4 my-2">
            <Dropdown
                label="Exercise"
                options={options}
                selected={option}
                setSelected={setOption}
                className="p-1"
            />
            <div className="flex flex-row">
                <TextField
                    label="Sets"
                    value={sets}
                    onChange={(event) => {
                        setSets(event.target.value);
                    }}
                />
            </div>
            <div className="flex flex-row">
                <TextField
                    label="MinReps"
                    value={minReps}
                    onChange={(event) => {
                        setMinReps(event.target.value);
                    }}
                />
                <TextField
                    label="MaxReps"
                    value={maxReps}
                    onChange={(event) => {
                        setMaxReps(event.target.value);
                    }}
                />
            </div>
            <div className="flex justify-between mt-2">
                <SecondaryButton className="m-1">Delete</SecondaryButton>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};
