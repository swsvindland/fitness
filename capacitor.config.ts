import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.svindland.fitness',
    appName: 'WorkoutTrack',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        hostname: 'workout-track.com',
    },
};

export default config;
