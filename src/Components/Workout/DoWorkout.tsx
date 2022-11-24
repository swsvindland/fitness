import { FC, useContext, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { WorkoutCard } from './WorkoutCard';
import {
    completeWorkout,
    getUserNextWorkout,
    getWorkout,
    getWorkoutExercises,
} from '../../api';
import { Button } from '../Buttons/Button';
import { Dropdown, DropdownOption } from '../Dropdown';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { WorkoutCompleted } from './WorkoutCompleted';

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
    const { user } = useContext(AuthContext);
    const [maxDays, setMaxDays] = useState<number>(1);
    const [day, setDay] = useState<number>(1);
    const [week, setWeek] = useState<DropdownOption>({ id: 1, name: 'Week 1' });
    const [options, setOptions] = useState<DropdownOption[]>([]);
    const history = useHistory();

    const workoutQuery = useQuery(['Workout', workoutId], () =>
        getWorkout(workoutId)
    );

    const exercisesQuery = useQuery(['WorkoutExercises'], () =>
        getWorkoutExercises(workoutId, day)
    );

    const nextWorkoutQuery = useQuery(['UserNextWorkout'], () => {
        return getUserNextWorkout();
    });

    const mutation = useMutation(completeWorkout);

    useMemo(() => {
        const workout = workoutQuery.data?.data;
        if (!workout) return;

        setMaxDays(workout.days);
        setOptions(generateOptions(workout.duration));
    }, [workoutQuery.data?.data]);

    useMemo(() => {
        const nextWorkout = nextWorkoutQuery.data?.data;
        if (!nextWorkout) return;

        setDay(nextWorkout.day);
        setWeek({ id: nextWorkout.week, name: `Week ${nextWorkout.week}` });
    }, [nextWorkoutQuery.data?.data]);

    if (workoutQuery.isLoading || nextWorkoutQuery.isLoading) {
        return <Loading />;
    }

    if (nextWorkoutQuery.data?.data.workoutCompleted) {
        return (
            <WorkoutCompleted userId={user?.id ?? ''} workoutId={workoutId} />
        );
    }

    const handleCompleteWorkout = () => {
        if (!user) return;

        mutation.mutate({
            workoutId,
            userId: user.id,
            day,
            week: week.id,
        });

        history.push('/home', { replace: true });
    };

    return (
        <div className="max-w-2xl w-full">
            <Dropdown options={options} selected={week} setSelected={setWeek} />
            <Pagination selected={day} setSelected={setDay} pages={maxDays} />
            <div role="list" className="grid grid-cols-1 gap-6">
                {exercisesQuery.data?.data?.map((exercise) => (
                    <WorkoutCard
                        key={exercise.id}
                        exercise={exercise}
                        week={week.id}
                        day={day}
                        icon={exercise.exercise.icon}
                    />
                ))}
            </div>
            <Button
                onClick={handleCompleteWorkout}
                className="my-2 flex justify-center align-middle w-full"
            >
                Complete Workout
            </Button>
        </div>
    );
};
