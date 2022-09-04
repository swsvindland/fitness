import { FC, useState } from 'react';
import { Switch } from '@headlessui/react';
import { Time } from './SupplementCard';

interface IProps {
    times: Time[];
    setTimes: (time: Time[]) => void;
}

export const SupplementTimes: FC<IProps> = ({ times, setTimes }) => {
    const handleChanged = (name: string) => {
        const newTimes = times.map((time) => {
            if (time.name === name) {
                time.enabled = !time.enabled;
            }
            return time;
        });

        setTimes(newTimes);
    };

    return (
        <div className="w-full px-4 py-8">
            <div className="mx-auto w-full max-w-md">
                {times.map((time) => (
                    <Switch.Group key={time.name}>
                        <div className="flex items-center justify-between my-2">
                            <Switch.Label className="mr-4 text-ternary">
                                {time.name}
                            </Switch.Label>
                            <Switch
                                checked={time.enabled}
                                onChange={() => handleChanged(time.name)}
                                className={`${
                                    time.enabled
                                        ? 'bg-secondary'
                                        : 'bg-primary-dark'
                                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                            >
                                <span
                                    className={`${
                                        time.enabled
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                        </div>
                    </Switch.Group>
                ))}
            </div>
        </div>
    );
};
