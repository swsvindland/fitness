import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.svindland.fitness',
    appName: 'WorkoutTrack',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        hostname: 'lifttrack-b8673.web.app',
    },
};

export default config;
