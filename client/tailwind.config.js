/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-200": "#ffbf00",
        "primary-100": "#ffc929",
        "secondary-200": "#00b050",
        "secondary-100": "#0b1a78",
      },
      animation: {
        opacity: 'opacity 1s ease-in-out', // Fade-in animation
        bounce: 'bounce 1s infinite', // Bouncing animation
        shake: 'shake 0.5s ease-in-out', // Shaking animation
        scaleUp: 'scaleUp 0.5s ease-in-out', // Scale-up animation
        fadeOutScaleUp: 'fadeOutScaleUp 1s ease-in-out forwards', // Fade-out with scale-up
      },
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        // New fade-out with scale-up effect
        fadeOutScaleUp: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
