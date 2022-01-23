const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            body: ['Roboto', ...defaultTheme.fontFamily.sans],
        },
        extend: {},
    },
    plugins: [],
};
