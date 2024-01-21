import { FC } from 'react';
import { LocalizationSettings } from '~/app/_components/Settings/LocalizationSettings';
import { MealSettings } from '~/app/_components/Settings/MealSettings';

export const Settings: FC = () => {
    return (
        <div className="container flex flex-col gap-4">
            <LocalizationSettings />
            <MealSettings />
        </div>
    );
};
