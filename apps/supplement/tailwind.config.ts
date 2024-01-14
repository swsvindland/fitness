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
            themes: {
                light: {},
                dark: {
                    colors: {
                        content1: '#154255',
                        content2: '#154255',
                        content3: '#154255',
                        content4: '#154255',
                        background: '#0D3140',
                        foreground: '#F7C619',
                        primary: {
                            900: '#0D3140',
                            800: '#0F3C51',
                            700: '#154255',
                            600: '#1D5A6F',
                            500: '#28827A',
                            400: '#3C9F8C',
                            300: '#6FB6B0',
                            200: '#A6D0C9',
                            100: '#D4E7E1',
                            50: '#F2F8F7',
                            DEFAULT: '#28827A',
                            foreground: '#F7C619',
                        },
                        success: {
                            500: '#07B561',
                            DEFAULT: '#07B561',
                            foreground: '#fff',
                        },
                        warning: {
                            500: '#FFD400',
                            DEFAULT: '#FFD400',
                            foreground: '#0D3140',
                        },
                        danger: {
                            500: '#DB255E',
                            DEFAULT: '#DB255E',
                            foreground: '#fff',
                        },
                        focus: '#F7C619',
                        secondary: '#AFD257',
                    },
                },
            },
        }),
    ],
} as Config;
