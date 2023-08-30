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
        <div className="container">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                <MacroGrid />
                <FoodGrid />
            </div>
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
