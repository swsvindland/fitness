import { type FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { UserSupplements } from './UserSupplements';
import { useHideBackButton } from '../Navigation/headerHooks';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export const Supplements: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'supplements',
        nameOverride: 'SupplementsScreen',
    }).catch((error) => console.error(error));

    return (
        <div className="container">
            <div className="flex items-center justify-end">
                <LinkButton className="mb-2" to="/supplements/all-supplements">
                    Edit
                </LinkButton>
            </div>
            <UserSupplements />
        </div>
    );
};
