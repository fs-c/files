module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },

    content: [
        './pages/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                mono: 'JetBrains Mono',
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],

    variants: {},
};