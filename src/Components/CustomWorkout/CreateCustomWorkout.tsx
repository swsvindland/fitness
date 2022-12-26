import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { useShowBackButton } from '../Navigation/headerHooks';
import { AuthContext } from '../Auth/Auth';
import { useMutation } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { TextArea } from '../TextFields/TextArea';
import { addWorkout } from '../../api';

interface IState {
    name: string;
    description: string;
    days: string;
    weeks: string;
}

export const CreateCustomWorkout: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({
        name: '',
        description: '',
        days: '',
        weeks: '',
    });
    const history = useHistory();

    const mutation = useMutation(addWorkout, {
        onSuccess: (data) => {
            history.push(`/workout/edit/exercises/${data.data}`);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;
        mutation.mutate({
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
