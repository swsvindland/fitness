import React, { type FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { HomeMacros } from './HomeMacros';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';

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

export const ActionButtons: FC = () => {
    const queryClient = useQueryClient();
    const history = useHistory();

    const handleStartScan = () => {
        history.push('/scanner');
    };

    const handleAddFood = async () => {
        await queryClient.invalidateQueries(['RecentUserFoods']);
        history.push('/eat/add-food');
    };

    return (
        <div className="fixed bottom-24 right-0">
            <SecondaryButton className="mx-1" onClick={handleStartScan}>
                Scan Barcode
            </SecondaryButton>
            <Button className="mx-1" onClick={handleAddFood}>
                Add Food
            </Button>
        </div>
    );
};
