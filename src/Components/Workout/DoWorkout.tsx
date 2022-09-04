import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Workout } from '../../types/Workout';
import { WorkoutBlock } from '../../types/WorkoutBlock';
import { useQuery } from '@tanstack/react-query';
import {Loading} from "../Loading";
import {Pagination} from "../Pagination";
import {WorkoutCard} from "./WorkoutCard";

interface IProps {
    workoutId: number;
}

export const DoWorkout: FC<IProps> = ({ workoutId }) => {
    const [day, setDay] = useState<number>(1);

    const getWorkout = (): Promise<AxiosResponse<Workout>> => {
        const params = {
            workoutId,
        };
        return axios.get(`${process.env.REACT_APP_API_URL}/api/GetWorkout`, {
            params,
        });
    };

    const getWorkoutDetails = (): Promise<AxiosResponse<WorkoutBlock[]>> => {
        const params = {
            workoutId,
        };
        return axios.get(
            `${process.env.REACT_APP_API_URL}/api/GetWorkoutDetails`,
            {
                params,
            }
        );
    };

    const workoutQuery = useQuery(['Workout', workoutId], getWorkout);
    const workoutDetailsQuery = useQuery(
        ['WorkoutDetails', workoutId],
        getWorkoutDetails
    );

    if (workoutQuery.isLoading || workoutDetailsQuery.isLoading) {
        return <Loading />;
    }

    const exercises =
        workoutDetailsQuery.data?.data[0].workoutBlockExercises.filter(
            (exercise) => exercise.day === day
        );

    return (
        <div className="max-w-2xl w-full">
            <Pagination selected={day} setSelected={setDay} pages={5} />
            <ul role="list" className="grid grid-cols-1 gap-6">
                {exercises?.map((exercise) => (
                    <WorkoutCard exercise={exercise} />
                ))}
            </ul>
        </div>
    );
};
