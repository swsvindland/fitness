import React, { type FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { HomeMacros } from './HomeMacros';
import { ActionButtons } from '../ActionButtons';

export const Home: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'home',
        nameOverride: 'HomeScreen',
    }).catch((error) => console.error(error));

    return (
        <>
            <div className="container grid grid-cols-1 gap-2">
                <HomeMacros />
                <Todo />
            </div>
            <ActionButtons />
        </>
    );
};
