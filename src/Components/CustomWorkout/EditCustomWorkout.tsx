import { FC, FormEvent, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { useShowBackButton } from '../Navigation/headerHooks';
import { AuthContext } from '../Auth/Auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useHistory, useParams } from 'react-router-dom';
import { editWorkout, getWorkout } from '../../api';
import { TextArea } from '../TextFields/TextArea';

interface IState {
    name: string;
    description: string;
    days: string;
    weeks: string;
}

export const EditCustomWorkout: FC = () => {
    useShowBackButton();
    const { workoutId } = useParams<{
        workoutId?: string;
    }>();
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({
        name: '',
        description: '',
        days: '',
        weeks: '',
    });
    const history = useHistory();

    const mutation = useMutation(editWorkout, {
        onSuccess: (data) => {
            history.push(`/workout/edit/exercises/${data.data}`);
        },
    });

    const workoutQuery = useQuery(['Workout', workoutId], () => {
        return getWorkout(parseInt(workoutId ?? '0'));
    });

    useMemo(() => {
        setState({
            name: workoutQuery.data?.data?.name ?? '',
            description: workoutQuery.data?.data?.description ?? '',
            days: workoutQuery.data?.data?.days.toString() ?? '',
            weeks: workoutQuery.data?.data?.duration.toString() ?? '',
        });
    }, [
        workoutQuery.data?.data?.days,
        workoutQuery.data?.data?.description,
        workoutQuery.data?.data?.duration,
        workoutQuery.data?.data?.name,
    ]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;
        mutation.mutate({
            id: parseInt(workoutId ?? '0'),
            userId: user?.id,
            name: state.name,
            description: state.description,
            days: parseInt(state.days),
            duration: parseInt(state.weeks),
        });
    };

    const handleClear = () => {
        setState({ name: '', description: '', days: '', weeks: '' });
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded card w-80">
                        <div className="p-4">
                            <TextField
                                id="name"
                                type="text"
                                label="Workout Name"
                                autoComplete="off"
                                value={state.name}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        name: event.target.value,
                                    })
                                }
                            />
                            <TextArea
                                id="description"
                                label="Description"
                                autoComplete="off"
                                value={state.description}
                                rows={4}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        description: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                id="days"
                                type="number"
                                inputMode="decimal"
                                label="How many days per week?"
                                autoComplete="off"
                                value={state.days}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        days: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                id="weeks"
                                type="number"
                                inputMode="decimal"
                                label="How many weeks?"
                                autoComplete="off"
                                value={state.weeks}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        weeks: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="px-4 py-3 bg-primary-dark dark:bg-background text-right sm:px-6 flex justify-between">
                            <SecondaryButton onClick={handleClear}>
                                Clear
                            </SecondaryButton>
                            <Button type="submit">Next</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
