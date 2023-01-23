import { isPlatform } from '@ionic/react';
import {
    getHealthKitActivityData,
    requestHealthKitAuthorization,
} from './healthKit';
import { CapacitorHealthkit, SampleNames } from '@perfood/capacitor-healthkit';
import { subDays } from 'date-fns';
import {
    getGoogleFitActivityData,
    requestGoogleFitAuthorization,
} from './googleFit';
import { GoogleFit } from '@perfood/capacitor-google-fit';
import { today, tomorrow } from '../../utils/dateUtils';

export const READ_PERMISSIONS = [
    'calories',
    'stairs',
    'activity',
    'steps',
    'distance',
    'duration',
    'weight',
];

export const connectedToHealthOrFit = async () => {
    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        return false;
    }

    if (isPlatform('ios')) {
        try {
            await CapacitorHealthkit.isAvailable();
            return true;
        } catch (error) {
            return false;
        }
    }

    // if (isPlatform('android')) {
    //     const results = await GoogleFit.isAllowed();
    //     return results.allowed;
    // }
};

export const connectToHealthOrFit = async () => {
    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        return;
    }

    if (isPlatform('ios')) {
        await requestHealthKitAuthorization();
    }

    // if (isPlatform('android')) {
    //     await requestGoogleFitAuthorization();
    // }
};

export const getSteps = async (): Promise<number> => {
    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        return 0;
    }
    if (isPlatform('ios')) {
        await requestHealthKitAuthorization();
        const healthKitData = await getHealthKitActivityData(
            SampleNames.STEP_COUNT,
            today(),
            tomorrow()
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
            today(),
            tomorrow()
        );
        const steps: number[] =
            googleFitData?.activities.map((item) =>
                parseInt(item.steps ?? '0')
            ) ?? [];

        return steps.reduce((a, b) => a + b, 0);
    }
    return 0;
};
