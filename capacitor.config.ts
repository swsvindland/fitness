import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.svindland.fitness',
    appName: 'WorkoutTrack',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        hostname: 'workout-track.com',
    },
    plugins: {
        FirebaseAuthentication: {
            skipNativeAuth: false,
            providers: ['apple.com', 'google.com'],
        },
    },
};

export default config;
