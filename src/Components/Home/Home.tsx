import { FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { BodyFatGraph } from '../Body/BodyFatGraph';
import { MacroGrid } from '../Macros/MacroGrid';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { LinkButton } from '../Buttons/LinkButton';
import { useHistory } from 'react-router-dom';

export const Home: FC = () => {
    useHideBackButton();
    const history = useHistory();

    FirebaseAnalytics.setScreenName({
        screenName: 'home',
        nameOverride: 'HomeScreen',
    });

    const handleStartScan = () => {
        history.push('/scanner');
    };

    return (
        <div className="grid w-full max-w-2xl grid-cols-1">
            <MacroGrid home />
            <div className="my-2 flex flex-row justify-between">
                <SecondaryButton
                    className="mr-1 flex w-full justify-center"
                    onClick={handleStartScan}
                >
                    Scan Barcode
                </SecondaryButton>
                <LinkButton
                    to="/eat/add-food"
                    className="ml-1 flex w-full justify-center"
                >
                    Add Food
                </LinkButton>
            </div>
            <Todo />
            <BodyFatGraph />
        </div>
    );
};
