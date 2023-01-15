import { ActivityContainer, GoogleFit } from '@perfood/capacitor-google-fit';

export const requestGoogleFitAuthorization = async (): Promise<void> => {
    await GoogleFit.connectToGoogleFit();
};

export const getGoogleFitActivityData = async (
    startDate: Date,
    endDate: Date = new Date()
): Promise<ActivityContainer | undefined> => {
    try {
        return await GoogleFit.getHistoryActivity({
            startTime: startDate,
            endTime: endDate,
        });
    } catch (error) {
        console.error(error);

        return undefined;
    }
};
