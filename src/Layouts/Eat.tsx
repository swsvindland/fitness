import { FC } from 'react';
import { MacroGrid } from '../Components/Macos/MacroGrid';
import { FoodGrid } from '../Components/Food/FoodGrid';

export const Eat: FC = () => {
    return (
        <div className="max-w-3xl w-full">
            <MacroGrid />
            <FoodGrid />
        </div>
    );
};
