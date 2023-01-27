import { FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { BodyFatGraph } from '../Body/BodyFatGraph';
import { MacroGrid } from '../Macros/MacroGrid';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export const Home: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'home',
        nameOverride: 'HomeScreen',
    });

    return (
        <div className="grid w-full max-w-2xl grid-cols-1">
            <MacroGrid />
            <Todo />
            <BodyFatGraph />
        </div>
    );
};
