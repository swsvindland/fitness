import { FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { UserSupplements } from './UserSupplements';
import { useHideBackButton } from '../Navigation/headerHooks';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export const Supplements: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'supplements',
        nameOverride: 'SupplementsScreen',
    });

    return (
        <div className="max-w-2xl w-full">
            <div className="flex justify-end items-center">
                <LinkButton className="mb-2" to="/supplements/all-supplements">
                    Edit
                </LinkButton>
            </div>
            <UserSupplements />
        </div>
    );
};
