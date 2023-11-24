import { FC, MouseEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../Buttons/Button';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { buyWorkout, deleteWorkout, getWorkout } from '@fitness/api-legacy';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useRouter } from 'next/navigation';

interface IProps {
    workoutId: number;
}

export const UserCustomWorkoutDetail: FC<IProps> = ({ workoutId }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        if (!workoutId) return;
        return getWorkout(workoutId);
    });

    const mutation = useMutation(buyWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            router.replace('/workout');
        },
    });

    const deleteMutation = useMutation(deleteWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            router.replace('workout/store');
        },
    });

    const handleEdit = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        event.preventDefault();
        router.replace(`/workout/edit/${workoutId}`);
    };

    const handleDelete = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        event.preventDefault();
        deleteMutation.mutate(workoutId);
    };

    if (workoutQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="card rounded">
            <div className="py-6">
                <div className="mx-auto mt-8 w-96 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h1 className="text-secondary mb-2 text-xl font-medium">
                            {workoutQuery.data?.data.name}
                        </h1>
                    </div>
                    <div className="lg:col-span-5">
                        {mutation.isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    mutation.mutate(workoutId);
                                }}
                            >
                                <Button
                                    type="submit"
                                    className="mt-6 flex w-full justify-center text-center"
                                >
                                    Start Workout
                                </Button>
                                <SecondaryButton
                                    onClick={handleEdit}
                                    className="mt-6 flex w-full justify-center text-center"
                                >
                                    Edit Workout
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={handleDelete}
                                    className="mt-6 flex w-full justify-center text-center"
                                >
                                    Delete Workout
                                </SecondaryButton>
                            </form>
                        )}
                        <div className="mt-10">
                            <h2 className="text-secondary text-sm font-medium">
                                Description
                            </h2>
                            <div className="prose prose-sm text-ternary mt-4">
                                {workoutQuery.data?.data.description ? (
                                    <p>{workoutQuery.data?.data.description}</p>
                                ) : (
                                    <p>No description provided.</p>
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
                                        {workoutQuery.data?.data.days} days per
                                        week
                                    </li>
                                    <li>
                                        {workoutQuery.data?.data.duration} weeks
                                        long
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
