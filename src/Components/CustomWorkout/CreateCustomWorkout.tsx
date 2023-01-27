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
import { WorkoutType } from '../../types/WorkoutType';
import { Dropdown, DropdownOption } from '../Dropdown';

interface IState {
    name: string;
    description: string;
    days: string;
    weeks: string;
    type: DropdownOption;
}

export const CreateCustomWorkout: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const [state, setState] = useState<IState>({
        name: '',
        description: '',
        days: '',
        weeks: '',
        type: { id: WorkoutType.Resistance, name: 'Resistance' },
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
            type: state.type.id,
        });
    };

    const handleClear = () => {
        setState({
            name: '',
            description: '',
            days: '',
            weeks: '',
            type: { id: WorkoutType.Resistance, name: 'Resistance' },
        });
    };

    const typeOptions = Object.keys(WorkoutType)
        .filter((item) => isNaN(parseInt(item)))
        .map((item, index) => ({ id: index, name: item }));

    return (
        <div className="m-4">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card w-80 overflow-hidden rounded shadow">
                        <div className="p-4">
                            <Dropdown
                                label="Workout Type"
                                id="workoutType"
                                selected={state.type}
                                setSelected={(value) => {
                                    setState({ ...state, type: value });
                                }}
                                className="ml-1"
                                options={typeOptions}
                            />
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
                        <div className="flex justify-between bg-primary-dark px-4 py-3 text-right dark:bg-background sm:px-6">
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
