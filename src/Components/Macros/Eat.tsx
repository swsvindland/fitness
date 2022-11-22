import { FC } from 'react';
import { MacroGrid } from './MacroGrid';
import { FoodGrid } from '../Food/FoodGrid';
import { useHideBackButton } from '../Navigation/headerHooks';

export const Eat: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-3xl w-full">
            <MacroGrid />
            <FoodGrid />
        </div>
    );
};
