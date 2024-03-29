import { FC } from 'react';
import { LocalizationSettings } from '~/app/_components/Settings/LocalizationSettings';
import { MealSettings } from '~/app/_components/Settings/MealSettings';
import { CustomMacroSettings } from '~/app/_components/Settings/CustomMacroSettings';

export const Settings: FC = async () => {
    return (
        <div className="container flex flex-col gap-4">
            <LocalizationSettings />
            <MealSettings />
            <CustomMacroSettings />
        </div>
    );
};
