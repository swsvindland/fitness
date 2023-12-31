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
    height: number | null;
}

interface IState {
    height: string;
}

export const HeightForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        height: props.height?.toString() ?? '',
    });
    const router = useRouter();
    const utils = api.useUtils();

    const createMutation = api.body.addHeight.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const updateMutation = api.body.updateHeight.useMutation({
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
                height: parseInt(state.height),
            });
        } else {
            createMutation.mutate({
                height: parseInt(state.height),
            });
        }

        router.back();
    };

    const handleClear = () => {
        setState({ height: '' });
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <TextField
                    id="height"
                    type="number"
                    inputMode="decimal"
                    label="Height"
                    autoComplete="off"
                    value={state.height}
                    required
                    onChange={(event) =>
                        setState({
                            ...state,
                            height: event.target.value,
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
