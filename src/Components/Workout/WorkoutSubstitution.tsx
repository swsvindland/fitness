import { FC, useContext, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    addUserWorkoutSubstitution,
    deleteUserWorkoutSubstitution,
    getExercises,
    getUserWorkoutSubstitution,
    updateUserWorkoutSubstitution,
} from '../../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { Autocomplete } from '../Autocomplete';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { AuthContext } from '../Auth/Auth';
import { PurchaseAccess } from '../Purchase/PurchaseAccess';

export const WorkoutSubstitution: FC = () => {
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [option, setOption] = useState<string | undefined>(undefined);
    const { workoutExerciseId } = useParams<{ workoutExerciseId: string }>();
    const queryClient = useQueryClient();
    const history = useHistory();

    const workoutSubstitutionQuery = useQuery(
        ['WorkoutSubstitution', workoutExerciseId],
        () => {
            return getUserWorkoutSubstitution(parseInt(workoutExerciseId));
        }
    );
    const exerciseQuery = useQuery(['Exercises'], getExercises);

    useMemo(() => {
        const newOptions =
            exerciseQuery.data?.data.map((item) => item.name) || [];
        const newOption = exerciseQuery.data?.data.find(
            (item) => item.id === workoutSubstitutionQuery.data?.data.exerciseId
        );

        setOptions(newOptions);
        setOption(newOption?.name);
        setQuery(newOption?.name ?? '');
    }, [workoutSubstitutionQuery.data?.data, exerciseQuery.data?.data]);

    const addMutation = useMutation(addUserWorkoutSubstitution, {
        onSuccess: () => {
            queryClient.invalidateQueries(['WorkoutSubstitution']);
            queryClient.invalidateQueries(['UserWorkoutExercises']);
            history.push('/workout');
        },
    });

    const updateMutation = useMutation(updateUserWorkoutSubstitution, {
        onSuccess: () => {
            queryClient.invalidateQueries(['WorkoutSubstitution']);
            queryClient.invalidateQueries(['UserWorkoutExercises']);
            history.push('/workout');
        },
    });

    const deleteMutation = useMutation(deleteUserWorkoutSubstitution, {
        onSuccess: () => {
            queryClient.invalidateQueries(['WorkoutSubstitution']);
            queryClient.invalidateQueries(['UserWorkoutExercises']);
        },
    });

    if (!user?.paid) {
        return (
            <PurchaseAccess
                body={
                    'Exercise substitutions are only available to premium users.'
                }
                button="Start Substituting Exercises"
            />
        );
    }

    if (workoutSubstitutionQuery.isLoading) return <LoadingSpinner />;

    if (!workoutSubstitutionQuery.data?.data) {
        return (
            <div className="card container my-2 p-4">
                <Autocomplete
                    label="Exercise"
                    isLoading={false}
                    selected={option}
                    setSelected={(value) => {
                        setOption(value);
                    }}
                    filtered={options.filter((item) =>
                        item.toLowerCase().includes(query.toLowerCase())
                    )}
                    query={query}
                    setQuery={setQuery}
                />
                <div className="mt-2 flex justify-between">
                    <SecondaryButton
                        className="m-1"
                        onClick={() => history.goBack()}
                    >
                        Delete
                    </SecondaryButton>
                    <Button
                        onClick={() => {
                            addMutation.mutate({
                                workoutExerciseId: parseInt(workoutExerciseId),
                                exerciseId:
                                    exerciseQuery.data?.data
                                        .filter((item) => item.name === option)
                                        .at(0)?.id ?? 0,
                                userId: user?.id ?? '',
                                created: new Date().toISOString(),
                                updated: new Date().toISOString(),
                            });
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="card container my-2 p-4">
            <Autocomplete
                label="Exercise"
                isLoading={false}
                selected={option}
                setSelected={(value) => {
                    setOption(value);
                }}
                filtered={options.filter((item) =>
                    item.toLowerCase().includes(query.toLowerCase())
                )}
                query={query}
                setQuery={setQuery}
            />
            <div className="mt-2 flex justify-between">
                <SecondaryButton
                    className="m-1"
                    onClick={() =>
                        deleteMutation.mutate(parseInt(workoutExerciseId))
                    }
                >
                    Delete
                </SecondaryButton>
                <Button
                    onClick={() => {
                        updateMutation.mutate({
                            id: workoutSubstitutionQuery.data?.data.id,
                            workoutExerciseId: parseInt(workoutExerciseId),
                            exerciseId:
                                exerciseQuery.data?.data
                                    .filter((item) => item.name === option)
                                    .at(0)?.id ?? 0,
                            userId: user?.id ?? '',
                            created: new Date().toISOString(),
                            updated: new Date().toISOString(),
                        });
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};
