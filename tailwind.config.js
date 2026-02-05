/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    important: '#root',
    theme: {
        extend: {
            colors: {
                'apple-blue': '#007AFF',
                'apple-gray': '#F5F5F7',
                'apple-dark': '#1D1D1F',
                'apple-text-secondary': '#6E6E73',
                'apple-border': '#D2D2D7',
            },
            fontFamily: {
                'apple': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                'apple': '12px',
                'apple-sm': '8px',
                'apple-lg': '16px',
            },
            boxShadow: {
                'apple': '0px 2px 8px rgba(0, 0, 0, 0.08)',
                'apple-md': '0px 4px 12px rgba(0, 0, 0, 0.1)',
                'apple-lg': '0px 8px 24px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
}
