import { FC, MouseEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../Buttons/Button';
import { Loading } from '../Loading';
import { useHistory, useParams } from 'react-router-dom';
import { buyWorkout, deleteWorkout, getWorkout } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export const UserCustomWorkoutDetail: FC = () => {
    const { workoutId } = useParams<{
        workoutId?: string;
    }>();
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
            history.push('/workout', { replace: true });
        },
    });

    const deleteMutation = useMutation(deleteWorkout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            history.push('/workout/store', { replace: true });
        },
    });

    const handleEdit = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        event.preventDefault();
        history.push(`/workout/edit/${workoutId}`);
    };

    const handleDelete = (
        event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        event.preventDefault();
        deleteMutation.mutate(parseInt(workoutId ?? '0'));
    };

    if (workoutQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="card rounded">
            <div className="py-6">
                <div className="mt-8 max-w-2xl w-96 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium text-secondary mb-2">
                            {workoutQuery.data?.data.name}
                        </h1>
                    </div>
                    <div className="lg:col-span-5">
                        {mutation.isLoading ? (
                            <Loading />
                        ) : (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    mutation.mutate(parseInt(workoutId ?? '0'));
                                }}
                            >
                                <Button
                                    type="submit"
                                    className="mt-6 w-full text-center flex justify-center"
                                >
                                    Start Workout
                                </Button>
                                <SecondaryButton
                                    onClick={handleEdit}
                                    className="mt-6 w-full text-center flex justify-center"
                                >
                                    Edit Workout
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={handleDelete}
                                    className="mt-6 w-full text-center flex justify-center"
                                >
                                    Delete Workout
                                </SecondaryButton>
                            </form>
                        )}
                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-secondary">
                                Description
                            </h2>
                            <div className="mt-4 prose prose-sm text-ternary">
                                {workoutQuery.data?.data.description ? (
                                    <p>{workoutQuery.data?.data.description}</p>
                                ) : (
                                    <p>No description provided.</p>
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
