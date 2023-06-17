/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Oswald', 'sans-serif'],
                serif: ['Quicksand', 'serif'],
            },
        },
    },
    plugins: [require('tailwindcss-safe-area'), require('@tailwindcss/forms')],
};
