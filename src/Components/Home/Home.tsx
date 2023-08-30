import { type FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { MacroGrid } from '../Macros/MacroGrid';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../Buttons/Button';

export const Home: FC = () => {
    useHideBackButton();
    const history = useHistory();
    const queryClient = useQueryClient();

    FirebaseAnalytics.setScreenName({
        screenName: 'home',
        nameOverride: 'HomeScreen',
    }).catch((error) => console.error(error));

    const handleStartScan = () => {
        history.push('/scanner');
    };

    const handleAddFood = async () => {
        await queryClient.invalidateQueries(['RecentUserFoods']);
        history.push('/eat/add-food');
    };

    return (
        <div className="container grid grid-cols-1 gap-2">
            <div>
                <MacroGrid home />
                <div className="my-2 flex flex-row justify-between">
                    <SecondaryButton
                        className="mr-1 flex w-full justify-center"
                        onClick={handleStartScan}
                    >
                        Scan Barcode
                    </SecondaryButton>
                    <Button
                        className="ml-1 flex w-full justify-center"
                        onClick={handleAddFood}
                    >
                        Add Food
                    </Button>
                </div>
            </div>
            <Todo />
        </div>
    );
};
