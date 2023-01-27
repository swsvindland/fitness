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
        <div className="w-full max-w-2xl">
            <div className="flex items-center justify-end">
                <LinkButton className="mb-2" to="/supplements/all-supplements">
                    Edit
                </LinkButton>
            </div>
            <UserSupplements />
        </div>
    );
};
