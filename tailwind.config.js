/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            fontWeight: {
                semibold: 500,
            },
            borderRadius: {
                '4xl': '2.5rem',
            },
            colors: {
                brand: {
                    DEFAULT: '#008DFF',
                    100: '#a3e2ff',
                    200: '#7ad1ff',
                    300: '#52bdff',
                    400: '#29a6ff',
                    500: '#008DFF',
                    600: '#0070d9',
                    700: '#0056b3',
                    800: '#003f8c',
                    900: '#002b66',
                },
            },
        },
    },
};
