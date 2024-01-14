import { FC } from 'react';
import { AppCard } from '~/app/_components/appCard';

export const Apps: FC = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="mb-8 text-2xl font-bold">Fitness Apps</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                <AppCard
                    appName="Blood Pressure Track"
                    image="/images/BP Track.png"
                />
                <AppCard appName="Body Track" image="/images/BodyTrack.png" />
                <AppCard
                    appName="Supplement Track"
                    image="/images/SupplementTrack.png"
                />
                <AppCard appName="Water Track" image="/images/WaterTrack.png" />
                <AppCard appName="Macro Track" image="/images/MacroTrack.png" />
                <AppCard appName="Lift Track" image="/images/LiftTrack.png" />
            </div>
        </div>
    );
};
