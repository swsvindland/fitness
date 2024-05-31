import { type Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export default {
    content: [
        './src/**/*.tsx',
        '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {},
    plugins: [
        require('tailwindcss-safe-area'),
        nextui({
            themes: {},
        }),
    ],
} as Config;
