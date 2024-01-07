'use client';

import { FC, FormEvent, useState } from 'react';
import { api } from '~/trpc/react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

interface IProps {
    id: number | null;
    date: string;
    weight: number | null;
    setOpen: () => void;
}

interface IState {
    weight: string;
}

export const WeightForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        weight: props.weight?.toString() ?? '',
    });
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

        props.setOpen();
    };

    const handleClear = () => {
        setState({ weight: '' });
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <Input
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
            <div className="flex justify-between py-2">
                <Button color="warning" onPress={handleClear}>
                    Clear
                </Button>
                <Button color="primary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};
