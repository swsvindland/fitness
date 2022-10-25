import { FC } from 'react';
import { MacroGrid } from '../Components/Macos/MacroGrid';
import { FoodGrid } from '../Components/Food/FoodGrid';
import { useHideBackButton } from '../Components/Navigation/headerHooks';

export const Eat: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-3xl w-full">
            <MacroGrid />
            <FoodGrid />
        </div>
    );
};
