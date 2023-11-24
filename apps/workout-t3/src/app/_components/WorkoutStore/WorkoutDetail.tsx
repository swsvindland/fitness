'use client';

import { FC } from 'react';
import { Button } from '../Buttons/Button';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IProps {
    workoutId: number;
}

export const WorkoutDetail: FC<IProps> = ({ workoutId }) => {
    const router = useRouter();
    const utils = api.useUtils();

    const workoutQuery = api.store.getWorkout.useQuery({ workoutId });
    const mutation = api.store.buyWorkout.useMutation({
        onSuccess: async () => {
            await utils.invalidate();
            router.push('/workout');
        },
    });

    if (workoutQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="card rounded">
            <div className="py-6">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="">
                        <div className="flex justify-between">
                            <h1 className="text-secondary mb-2 text-xl font-medium">
                                {workoutQuery.data?.Name}
                            </h1>
                        </div>
                        <div className="lg:col-span-5">
                            {mutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        mutation.mutate({ workoutId });
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
                                    {workoutQuery.data?.Description && (
                                        <p>{workoutQuery.data?.Description}</p>
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
                                            {workoutQuery.data?.Days} days per
                                            week
                                        </li>
                                        <li>
                                            {workoutQuery.data?.Duration} weeks
                                            long
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
