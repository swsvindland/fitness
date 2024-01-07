import { FC } from 'react';
import { LocalizationSettings } from '~/app/_components/Settings/LocalizationSettings';

export const Settings: FC = () => {
    return (
        <div className="container flex flex-col">
            <LocalizationSettings />
        </div>
    );
};
