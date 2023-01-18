import { FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { BodyFatGraph } from '../Body/BodyFatGraph';
import { MacroGrid } from '../Macros/MacroGrid';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { Pedometer } from './Pedometer';

export const Home: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'home',
        nameOverride: 'HomeScreen',
    });

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <MacroGrid />
            <Todo />
            <Pedometer />
            <BodyFatGraph />
        </div>
    );
};
