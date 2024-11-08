/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      indigo: {
        100: '#E8EAF6',  // lighter indigo
        200: '#BEC7FD',  // pale indigo
      },
      gray: {
        100: '#F5F5F5',  // lightest gray
        200: '#B0BEC5',  // blue gray
        800: '#37474F',  // dark gray
      },
      cyan: {
        400: '#00BCD4',  // primary cyan
        100: '#E0F7FA',  // light cyan
      },
      emerald: {
        200: '#A7F3D0',  // light emerald
      },
      red: {
        300: '#FF8A80',  // light red
      },
      yellow: {
        400: '#FFEB3B',  // primary yellow
      },
      blue: {
        500: '#7283E8'
      },
      black: {
        500: '#000000'
      },
      purple: {
        500: '#BEC7FD'
      },
      lightPurple: {
        500: '#7283E8'
      }
    },
    extend: {
      fontSize: {
        'base': '16px', // 16px font size
      }
    },
    maxHeight: {
      '500': '420px', // Add your custom height here
    },
    backdropBlur: {
      // You can customize the values or add your own
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
    },

  },
  plugins: [],
}
