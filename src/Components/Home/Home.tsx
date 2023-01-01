import { FC } from 'react';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Todo } from './Todo';
import { BodyFatGraph } from '../Body/BodyFatGraph';
import { MacroGrid } from '../Macros/MacroGrid';

export const Home: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <MacroGrid />
            <Todo />
            <BodyFatGraph />
        </div>
    );
};
