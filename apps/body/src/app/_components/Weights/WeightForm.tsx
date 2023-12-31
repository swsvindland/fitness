'use client';

import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IProps {
    id: number | null;
    date: string;
    weight: number | null;
}

interface IState {
    weight: string;
}

export const WeightForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        weight: props.weight?.toString() ?? '',
    });
    const router = useRouter();
    const utils = api.useUtils();

    const createMutation = api.body.addWeight.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const updateMutation = api.body.updateWeight.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (props.id) {
            updateMutation.mutate({
                id: props.id,
                weight: parseInt(state.weight),
            });
        } else {
            createMutation.mutate({
                weight: parseInt(state.weight),
            });
        }

        router.back();
    };

    const handleClear = () => {
        setState({ weight: '' });
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <TextField
                    id="weight"
                    type="number"
                    inputMode="decimal"
                    label="Weight"
                    autoComplete="off"
                    value={state.weight}
                    required
                    onChange={(event) =>
                        setState({
                            ...state,
                            weight: event.target.value,
                        })
                    }
                />
            </div>
            <div className="flex justify-between pt-2">
                <SecondaryButton onClick={handleClear}>Clear</SecondaryButton>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};
