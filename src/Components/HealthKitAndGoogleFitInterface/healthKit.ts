import {
    ActivityData,
    CapacitorHealthkit,
    QueryOutput,
    SampleNames,
} from '@perfood/capacitor-healthkit';
import { READ_PERMISSIONS } from './common';

export const requestHealthKitAuthorization = async (): Promise<void> => {
    try {
        await CapacitorHealthkit.requestAuthorization({
            all: [''],
            read: READ_PERMISSIONS,
            write: [''],
        });
    } catch (error) {
        console.error('[HealthKitService] Error getting Authorization:', error);
    }
};

export const getHealthKitActivityData = async (
    sampleName: SampleNames,
    startDate: Date,
    endDate: Date = new Date()
): Promise<QueryOutput<ActivityData> | undefined> => {
    try {
        const queryOptions = {
            sampleName,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            limit: 0,
        };

        return await CapacitorHealthkit.queryHKitSampleType<ActivityData>(
            queryOptions
        );
    } catch (error) {
        console.error(error);

        return undefined;
    }
};
