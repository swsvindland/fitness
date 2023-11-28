import { FC } from 'react';
import { MacroGrid } from '~/app/_components/Macros/MacroGrid';
import { Todo } from '~/app/_components/Home/Todo';
import { RecommendedNextWorkout } from '~/app/_components/Workout/RecommendedNextWorkout';
import '@khmyznikov/pwa-install';

export const Home: FC = () => {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-3">
                <Todo />
            </div>
            <div className="md:col-span-2">
                <MacroGrid />
            </div>
            <RecommendedNextWorkout />
            {/* @ts-ignore */}
            <pwa-install></pwa-install>
        </div>
    );
};
