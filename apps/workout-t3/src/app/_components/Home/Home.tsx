import { FC } from 'react';
import { MacroGrid } from '~/app/_components/Macros/MacroGrid';
import { Todo } from '~/app/_components/Home/Todo';
import { RecommendedNextWorkout } from '~/app/_components/Workout/RecommendedNextWorkout';
import { WeightGraph } from '~/app/_components/Body/Weight/WeightGraph';
import { BodyGraph } from '~/app/_components/Body/Body/BodyGraph';

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
            <WeightGraph />
            <BodyGraph />
        </div>
    );
};
