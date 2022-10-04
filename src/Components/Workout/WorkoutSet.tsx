import { FC, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { WorkoutBlockExercise } from '../../types/WorkoutBlockExercise';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../Auth/Auth';
import { UserWorkoutActivity } from '../../types/UserWorkoutActivity';
import { Loading } from '../Loading';
import { API_URL } from '../../api';

interface IProps {
    set: number;
    exercise: WorkoutBlockExercise;
    week: number;
    day: number;
}

interface IState {
    reps: number;
    weight: number;
}

export const WorkoutSet: FC<IProps> = ({ set, exercise, week, day }) => {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({ reps: 0, weight: 0 });
    const [saved, setSaved] = useState<boolean>(false);

    const getWorkoutActivity = (): Promise<
        AxiosResponse<UserWorkoutActivity>
    > => {
        const params = {
            userId: user?.id,
            workoutBlockExerciseId: exercise.id,
            set,
            week,
            day,
        };
        return axios.get(`${API_URL}/api/GetUserWorkoutActivity`, {
            params,
        });
    };

    const { data, isLoading } = useQuery(
        ['UserWorkoutActivity', user?.id, exercise.id, set, week, day],
        getWorkoutActivity
    );

    const addWorkoutActivity = () => {
        const body = {
            id: data?.data.id,
            userId: user?.id,
            workoutBlockExerciseId: exercise.id,
            set: set,
            reps: state.reps,
            weight: state.weight,
            week,
            day,
        };

        return axios.post(`${API_URL}/api/AddUserWorkoutActivity`, body);
    };

    const mutation = useMutation(addWorkoutActivity, {
        onSuccess: (data, variables, context) => {
            setSaved(true);
        },
    });

    useMemo(() => {
        if (!data) {
            return;
        }

        setState({
            reps: data?.data.reps,
            weight: data?.data.weight,
        });

        if (data.data.saved) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex border-y border-ternary last:border-none">
            <div className=" flex-1 flex">
                <div className="flex-1 inline-flex items-center justify-center p-2">
                    <TextField
                        id={`exercise-reps-${exercise.exerciseId}`}
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
                    <span className="mx-2 text-ternary text-xs">Reps</span>
                </div>
            </div>
            <div className="flex-1 flex border-x border-ternary p-2">
                <TextField
                    id={`exercise-weight-${exercise.exerciseId}`}
                    value={state.weight}
                    type="number"
                    inputMode="numeric"
                    onChange={(event) => {
                        setState({
                            ...state,
                            weight: parseInt(event.target.value),
                        });
                    }}
                    className="my-auto"
                />
                <span className="mx-2 my-auto text-ternary text-xs">lbs</span>
            </div>
            <div className="flex-none flex w-16">
                <div className="w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-br-lg">
                    <button
                        className="w-8 h-8"
                        onClick={() => {
                            mutation.mutate();
                        }}
                    >
                        {mutation.isLoading ? (
                            <Loading />
                        ) : (
                            <CheckCircleIcon
                                className={
                                    saved
                                        ? 'fill-secondary'
                                        : 'fill-transparent border-ternary border rounded-full'
                                }
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
