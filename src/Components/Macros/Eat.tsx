import {FC, useContext} from 'react';
import { MacroGrid } from './MacroGrid';
import { FoodGrid } from '../Food/FoodGrid';
import { useHideBackButton } from '../Navigation/headerHooks';
import {AuthContext} from "../Auth/Auth";

export const Eat: FC = () => {
    const { paid } = useContext(AuthContext);
    useHideBackButton();

    return (
        <div className="max-w-3xl w-full">
            <MacroGrid />
            {paid && (
                <FoodGrid />
            )}
        </div>
    );
};
