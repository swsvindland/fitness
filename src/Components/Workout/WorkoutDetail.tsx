import { FC, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Workout } from '../../types/Workout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { WorkoutBlock } from '../../types/WorkoutBlock';
import { AuthContext } from '../../Auth/Auth';
import { Button } from '../Buttons/Button';
import { Loading } from '../Loading';
import { useHistory, useParams } from 'react-router';

export const WorkoutDetail: FC = () => {
    const { user } = useContext(AuthContext);
    const { workoutId } = useParams<{ workoutId?: string }>();
    const history = useHistory();

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

    const buyWorkout = () => {
        const params = { userId: user?.id, workoutId };
        return axios.post(
            `${process.env.REACT_APP_API_URL}/api/BuyWorkout`,
            {},
            {
                params,
            }
        );
    };

    const mutation = useMutation(buyWorkout, {
        onSuccess: () => {
            history.push('/workout', { replace: true });
        },
    });

    if (workoutQuery.isLoading || workoutDetailsQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-card rounded">
            <div className="pt-6 sm:pb-6">
                <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                        <div className="lg:col-start-8 lg:col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-secondary mb-2">
                                    {workoutQuery.data?.data.name}
                                </h1>
                                <p className="text-xl font-medium text-secondary">
                                    {workoutQuery.data?.data.cost}
                                </p>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img
                                    src="https://as2.ftcdn.net/v2/jpg/03/09/97/55/1000_F_309975507_OZK8uQHIdKUfSOnMqfXX2B8NPFPMrpq5.jpg"
                                    alt=""
                                    className="lg:col-span-2 lg:row-span-2 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            {mutation.isLoading ? (
                                <Loading />
                            ) : (
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        mutation.mutate();
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        className="mt-6 w-full text-center flex justify-center"
                                    >
                                        Add to cart
                                    </Button>
                                </form>
                            )}
                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-secondary">
                                    Description
                                </h2>

                                <div className="mt-4 prose prose-sm text-ternary">
                                    {workoutQuery.data?.data.description && (
                                        <p>
                                            {
                                                workoutQuery.data?.data
                                                    .description
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 border-t text-secondary pt-8">
                                <h2 className="text-sm font-medium text-secondary">
                                    Workout Details
                                </h2>

                                <div className="mt-4 prose prose-sm text-ternary">
                                    <div role="list">
                                        <li>
                                            {
                                                workoutDetailsQuery.data
                                                    ?.data[0].days
                                            }{' '}
                                            days per week
                                        </li>
                                        <li>
                                            {
                                                workoutDetailsQuery.data
                                                    ?.data[0].duration
                                            }{' '}
                                            weeks long
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
