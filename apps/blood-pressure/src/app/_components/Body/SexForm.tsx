'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Sex } from '@fitness/types';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

export const SexForm: FC = () => {
    const [sex, setSex] = useState<string>(Sex.Unknown);
    const router = useRouter();
    const utils = api.useUtils();

    const settings = api.settings.getUserSettings.useQuery();

    const mutation = api.settings.updateSex.useMutation({
        onSuccess: async () => {
            await utils.settings.invalidate();
        },
    });

    useEffect(() => {
        if (settings.data && settings.data.Sex !== sex) {
            setSex(settings.data.Sex);
        }
    }, [settings.data]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!settings.data) return;

        mutation.mutate({ id: Number(settings.data.Id), sex });
        router.back();
    };

    const handleClear = () => {
        setSex(settings.data?.Sex ?? Sex.Unknown);
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="sex-male"
                                    name="sex-male"
                                    type="radio"
                                    checked={sex === Sex.Male}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSex(Sex.Male);
                                        }
                                    }}
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-male"
                                    className="text-ternary ml-3 block text-sm font-medium"
                                >
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="sex-female"
                                    name="sex-female"
                                    type="radio"
                                    checked={sex === Sex.Female}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSex(Sex.Female);
                                        }
                                    }}
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-female"
                                    className="text-ternary ml-3 block text-sm font-medium"
                                >
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="bg-primary-dark dark:bg-background flex justify-between px-4 py-3 text-right sm:px-6">
                            <SecondaryButton onClick={handleClear}>
                                Clear
                            </SecondaryButton>
                            <Button type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
