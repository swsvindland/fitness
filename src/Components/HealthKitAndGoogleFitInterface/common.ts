import { isPlatform } from '@ionic/react';
import {
    getHealthKitActivityData,
    requestHealthKitAuthorization,
} from './healthKit';
import { SampleNames } from '@perfood/capacitor-healthkit';
import { subDays } from 'date-fns';
import {
    getGoogleFitActivityData,
    requestGoogleFitAuthorization,
} from './googleFit';

export const READ_PERMISSIONS = [
    'calories',
    'stairs',
    'activity',
    'steps',
    'distance',
    'duration',
    'weight',
];

export const getSteps = async (): Promise<number> => {
    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        return 0;
    }
    if (isPlatform('ios')) {
        await requestHealthKitAuthorization();
        const healthKitData = await getHealthKitActivityData(
            SampleNames.STEP_COUNT,
            subDays(new Date(), 1)
        );
        // @ts-ignore
        const steps: number[] = healthKitData?.resultData.map(
            // @ts-ignore
            (data) => data.value
        );
        return steps.reduce((a, b) => a + b, 0);
    }
    if (isPlatform('android')) {
        await requestGoogleFitAuthorization();
        const googleFitData = await getGoogleFitActivityData(
            subDays(new Date(), 1)
        );
        const steps: number[] =
            googleFitData?.activities.map((item) =>
                parseInt(item.steps ?? '0')
            ) ?? [];

        return steps.reduce((a, b) => a + b, 0);
    }
    return 0;
};
