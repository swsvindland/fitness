import { FC } from 'react';
import { LocalizationSettings } from '~/app/_components/Settings/LocalizationSettings';

export const Settings: FC = async () => {
    return (
        <div className="container flex flex-col">
            <LocalizationSettings />
        </div>
    );
};
