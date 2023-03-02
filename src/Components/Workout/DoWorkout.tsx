import { FC, useContext, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { Pagination } from '../Pagination';
import { WorkoutCard } from './WorkoutCard';
import {
    completeWorkout,
    getUserNextCardioWorkout,
    getUserNextWorkout,
    getWorkout,
    getWorkoutExercises,
} from '../../api';
import { Button } from '../Buttons/Button';
import { Dropdown, DropdownOption } from '../Dropdown';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { WorkoutCompleted } from './WorkoutCompleted';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';
import { WorkoutType } from '../../types/WorkoutType';

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
    const queryClient = useQueryClient();

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        return getWorkout(workoutId);
    });

    const exercisesQuery = useQuery(
        ['WorkoutExercises', workoutId, day, week],
        () => {
            return getWorkoutExercises(workoutId, day);
        }
    );

    const nextWorkoutQuery = useQuery(['UserNextWorkout'], () => {
        return getUserNextWorkout();
    });

    const nextCardioWorkoutQuery = useQuery(['UserNextCardioWorkout'], () => {
        return getUserNextCardioWorkout();
    });

    const mutation = useMutation(completeWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['Dashboard']);
        },
    });

    useMemo(() => {
        const workout = workoutQuery.data?.data;
        if (!workout) return;

        setMaxDays(workout.days);
        setOptions(generateOptions(workout.duration));
    }, [workoutQuery.data?.data]);

    useMemo(() => {
        if (workoutQuery.data?.data.type === WorkoutType.Cardio) return;
        const nextWorkout = nextWorkoutQuery.data?.data;
        if (!nextWorkout) return;

        setDay(nextWorkout.day);
        setWeek({ id: nextWorkout.week, name: `Week ${nextWorkout.week}` });
    }, [nextWorkoutQuery.data?.data, workoutQuery.data?.data.type]);

    useMemo(() => {
        if (workoutQuery.data?.data.type !== WorkoutType.Cardio) return;
        const nextWorkout = nextCardioWorkoutQuery.data?.data;
        if (!nextWorkout) return;

        setDay(nextWorkout.day);
        setWeek({ id: nextWorkout.week, name: `Week ${nextWorkout.week}` });
    }, [nextCardioWorkoutQuery.data?.data, workoutQuery.data?.data.type]);

    if (
        workoutQuery.isLoading ||
        nextWorkoutQuery.isLoading ||
        nextCardioWorkoutQuery.isLoading
    ) {
        return <Loading />;
    }

    if (nextWorkoutQuery.data?.data.workoutCompleted) {
        return <WorkoutCompleted />;
    }

    const handleCompleteWorkoutAndStartCardio = () => {
        if (!user) return;

        mutation.mutate({
            workoutId,
            userId: user.id,
            day,
            week: week.id,
        });

        history.push('/cardio');
    };

    const handleCompleteWorkout = () => {
        if (!user) return;

        mutation.mutate({
            workoutId,
            userId: user.id,
            day,
            week: week.id,
        });

        history.push('/', { replace: true });
    };

    return (
        <div className="container">
            <Dropdown options={options} selected={week} setSelected={setWeek} />
            <Pagination selected={day} setSelected={setDay} pages={maxDays} />
            <div
                role="list"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {exercisesQuery.data?.data?.map((exercise, index) => (
                    <WorkoutCard
                        key={exercise.id}
                        workoutExerciseId={exercise.id ?? 0}
                        week={week.id}
                        day={day}
                    />
                ))}
            </div>
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-2 md:flex-row">
                <Button
                    onClick={handleCompleteWorkout}
                    className="flex w-full max-w-md justify-center align-middle"
                >
                    Complete Workout
                </Button>
                {workoutQuery.data?.data.userId ? (
                    <LinkSecondaryButton
                        to={`/workout/edit/${workoutId}`}
                        className="flex w-full max-w-md justify-center align-middle"
                    >
                        Edit Workout
                    </LinkSecondaryButton>
                ) : null}
            </div>
        </div>
    );
};
