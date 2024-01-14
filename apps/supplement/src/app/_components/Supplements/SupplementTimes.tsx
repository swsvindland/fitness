import { FC } from 'react';
import { Time } from './SupplementCard';
import { Switch } from '@nextui-org/react';

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
        <div className="mb-8 flex flex-col gap-4">
            {times.map((time) => (
                <Switch
                    checked={time.enabled}
                    onValueChange={() => handleChanged(time.name)}
                >
                    {time.name}
                </Switch>
            ))}
        </div>
    );
};
