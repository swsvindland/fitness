import { FC } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../Buttons/Button';
import { Loading } from '../Loading';
import { useHistory, useParams } from 'react-router-dom';
import { buyWorkout, getWorkout, getWorkoutDetails } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';

export const WorkoutDetail: FC = () => {
    const { workoutId } = useParams<{ workoutId?: string }>();
    const history = useHistory();
    useShowBackButton();

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        if (!workoutId) return;
        if (isNaN(parseInt(workoutId))) return;
        return getWorkout(parseInt(workoutId));
    });
    const workoutDetailsQuery = useQuery(['WorkoutDetails', workoutId], () => {
        if (!workoutId) return;
        if (isNaN(parseInt(workoutId))) return;
        return getWorkoutDetails(parseInt(workoutId));
    });

    const mutation = useMutation(buyWorkout, {
        onSuccess: () => {
            history.push('/workout', { replace: true });
        },
    });

    if (workoutQuery.isLoading || workoutDetailsQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="card rounded">
            <div className="pt-6 sm:pb-6">
                <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                        <div className="lg:col-start-8 lg:col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-secondary mb-2">
                                    {workoutQuery.data?.data.name}
                                </h1>
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
                                        mutation.mutate(
                                            parseInt(workoutId ?? '0')
                                        );
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
