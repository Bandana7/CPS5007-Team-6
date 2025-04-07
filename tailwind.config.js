module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
          mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.600'),
              a: {
                color: theme('colors.indigo.600'),
                '&:hover': {
                  color: theme('colors.indigo.700'),
                },
              },
              h1: {
                color: theme('colors.gray.900'),
                fontWeight: '600',
              },
              h2: {
                color: theme('colors.gray.900'),
                fontWeight: '600',
              },
              h3: {
                color: theme('colors.gray.900'),
                fontWeight: '600',
              },
              h4: {
                color: theme('colors.gray.900'),
                fontWeight: '600',
              },
            },
          },
        }),
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        cursor: ['disabled'],
        backgroundColor: ['active'],
        borderColor: ['active'],
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  };