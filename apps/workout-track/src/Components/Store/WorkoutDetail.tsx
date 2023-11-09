import { FC } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../Buttons/Button';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { useHistory, useParams } from 'react-router-dom';
import { buyWorkout, getWorkout } from '@fitness/api-legacy';
import { useShowBackButton } from '../Navigation/headerHooks';
import { WorkoutType } from '@fitness/types';

export const WorkoutDetail: FC = () => {
    const { workoutId } = useParams<{ workoutId?: string }>();
    const history = useHistory();
    useShowBackButton();
    const queryClient = useQueryClient();

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        if (!workoutId) return;
        if (isNaN(parseInt(workoutId))) return;
        return getWorkout(parseInt(workoutId));
    });

    const mutation = useMutation(buyWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            if (workoutQuery.data?.data.type === WorkoutType.Cardio) {
                history.push('/cardio', { replace: true });
            } else {
                history.push('/workout', { replace: true });
            }
        },
    });

    if (workoutQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="card rounded">
            <div className="py-6">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-secondary mb-2 text-xl font-medium">
                                    {workoutQuery.data?.data.name}
                                </h1>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img
                                    src={workoutQuery.data?.data.image}
                                    alt=""
                                    className="rounded-lg lg:col-span-2 lg:row-span-2"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            {mutation.isLoading ? (
                                <LoadingSpinner />
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
                                        className="mt-6 flex w-full justify-center text-center"
                                    >
                                        Start Workout
                                    </Button>
                                </form>
                            )}
                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-secondary text-sm font-medium">
                                    Description
                                </h2>

                                <div className="prose prose-sm text-ternary mt-4">
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

                            <div className="text-secondary mt-8 border-t pt-8">
                                <h2 className="text-secondary text-sm font-medium">
                                    Workout Details
                                </h2>

                                <div className="prose prose-sm text-ternary mt-4">
                                    <div role="list">
                                        <li>
                                            {workoutQuery.data?.data.days} days
                                            per week
                                        </li>
                                        <li>
                                            {workoutQuery.data?.data.duration}{' '}
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
