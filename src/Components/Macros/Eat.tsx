import { FC } from 'react';
import { MacroGrid } from './MacroGrid';
import { FoodGrid } from '../Food/FoodGrid';
import { useHideBackButton } from '../Navigation/headerHooks';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export const Eat: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'eat',
        nameOverride: 'EatScreen',
    });

    return (
        <div className="max-w-3xl w-full">
            <MacroGrid />
            <FoodGrid />
            <div className="float-right my-2">
                <a href="https://platform.fatsecret.com">
                    <img
                        src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
                        alt="Powered by Fat Secret"
                    />
                </a>
            </div>
        </div>
    );
};
