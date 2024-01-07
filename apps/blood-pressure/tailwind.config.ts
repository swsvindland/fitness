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
            layout: {
                disabledOpacity: '0.3', // opacity-[0.3]
                radius: {
                    small: '2px', // rounded-small
                    medium: '4px', // rounded-medium
                    large: '6px', // rounded-large
                },
                borderWidth: {
                    small: '1px', // border-small
                    medium: '1px', // border-medium
                    large: '2px', // border-large
                },
            },
            themes: {
                light: {},
                dark: {
                    colors: {
                        background: '#0D3140',
                        foreground: '#F7C619',
                        primary: {
                            700: '#154255',
                            500: '#28827A',
                            300: '#6FB6B0',
                            DEFAULT: '#28827A',
                            foreground: '#F7C619',
                        },
                        secondary: '#AFD257',
                    },
                },
            },
        }),
    ],
} as Config;
