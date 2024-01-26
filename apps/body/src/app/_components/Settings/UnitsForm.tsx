'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { Units } from '@fitness/types';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { Radio, RadioGroup } from '@nextui-org/react';

interface IProps {
    onClose: () => void;
}

export const UnitsForm: FC<IProps> = (props) => {
    const [unit, setUnit] = useState<string>(Units.Imperial);
    const utils = api.useUtils();

    const settings = api.settings.getUserSettings.useQuery();

    useEffect(() => {
        if (settings.data && settings.data.Units !== unit) {
            setUnit(settings.data.Units);
        }
    }, [settings.data]);

    const mutation = api.settings.updateUnits.useMutation({
        onSuccess: async () => {
            await utils.settings.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!settings.data) return;

        mutation.mutate({ id: Number(settings.data.Id), unit });
        props.onClose();
    };

    const handleClear = () => {
        setUnit(settings.data?.Units ?? Units.Imperial);
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="pb-6">
                        <RadioGroup
                            label="It is recommended that you do not change once you add a bunch of data. It will not update past data entry, just how labels and certain computations, such as body fat, are computed"
                            value={unit}
                            onValueChange={setUnit}
                        >
                            <Radio value="Imperial">Imperial</Radio>
                            <Radio value="Metric">Metric</Radio>
                        </RadioGroup>
                    </div>
                    <div className="flex justify-between pb-3">
                        <Button onClick={handleClear} color="warning">
                            Clear
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
