'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { Units } from '@fitness/types';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { Input, Radio, RadioGroup } from '@nextui-org/react';

interface IProps {
    onClose: () => void;
}

export const MealsForm: FC<IProps> = (props) => {
    const [meal, setMeal] = useState<string>('3');
    const utils = api.useUtils();

    const settings = api.settings.getUserSettings.useQuery();

    useEffect(() => {
        if (settings.data && settings.data.MealQuantity !== parseInt(meal)) {
            setMeal(settings.data.MealQuantity.toString());
        }
    }, [settings.data]);

    const mutation = api.settings.updateMeals.useMutation({
        onSuccess: async () => {
            await utils.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!settings.data) return;

        mutation.mutate({ id: Number(settings.data.Id), meal: parseInt(meal) });
        props.onClose();
    };

    const handleClear = () => {
        setMeal((settings.data?.MealQuantity ?? 3).toString());
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="pb-6">
                        <Input
                            label="Quantity"
                            type="number"
                            inputMode="decimal"
                            onChange={(event) =>
                                setMeal(event.target.value ?? '1')
                            }
                            value={meal ?? ''}
                        />
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
