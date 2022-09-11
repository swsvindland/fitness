import { FC, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { WorkoutCard } from './WorkoutCard';
import { getWorkout, getWorkoutDetails } from '../../api';
import { Button } from '../Buttons/Button';
import { Dropdown, DropdownOption } from '../Dropdown';

interface IProps {
    workoutId: number;
}

const generateOptions = (weeks: number): DropdownOption[] => {
    const options: DropdownOption[] = [];
    Array.from(Array(weeks).keys()).forEach((item) => {
        options.push({ id: item + 1, name: `Week ${item + 1}` });
    });

    return options;
};

export const DoWorkout: FC<IProps> = ({ workoutId }) => {
    const [maxDays, setMaxDays] = useState<number>(1);
    const [day, setDay] = useState<number>(1);
    const [week, setWeek] = useState<DropdownOption>({ id: 1, name: 'Week 1' });
    const [options, setOptions] = useState<DropdownOption[]>([]);

    const workoutQuery = useQuery(['Workout', workoutId], () =>
        getWorkout(workoutId)
    );
    const workoutDetailsQuery = useQuery(['WorkoutDetails', workoutId], () =>
        getWorkoutDetails(workoutId)
    );

    useMemo(() => {
        const workoutDetail = workoutDetailsQuery.data?.data[0];
        if (!workoutDetail) return;

        setMaxDays(workoutDetail.days);
        setOptions(generateOptions(workoutDetail.duration));
    }, [workoutDetailsQuery.data?.data]);

    if (workoutQuery.isLoading || workoutDetailsQuery.isLoading) {
        return <Loading />;
    }

    const exercises =
        workoutDetailsQuery.data?.data[0].workoutBlockExercises.filter(
            (exercise) => exercise.day === day
        );

    return (
        <div className="max-w-2xl w-full">
            <Dropdown options={options} selected={week} setSelected={setWeek} />
            <Pagination selected={day} setSelected={setDay} pages={maxDays} />
            <div role="list" className="grid grid-cols-1 gap-6">
                {exercises?.map((exercise) => (
                    <WorkoutCard
                        key={exercise.id}
                        exercise={exercise}
                        week={week.id}
                        day={day}
                    />
                ))}
            </div>
            <Button className="my-2 flex justify-center align-middle w-full">
                Complete Workout
            </Button>
        </div>
    );
};
