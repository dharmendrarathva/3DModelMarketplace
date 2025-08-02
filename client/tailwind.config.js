// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         "primary-200": "#ffbf00",
//         "primary-100": "#ffc929",
//         "secondary-200": "#00b050",
//         "secondary-100": "#0b1a78",
//       },
//       animation: {
//         opacity: 'opacity 1s ease-in-out',
//         bounce: 'bounce 1s infinite',
//         shake: 'shake 0.5s ease-in-out',
//         scaleUp: 'scaleUp 0.5s ease-in-out',
//         fadeOutScaleUp: 'fadeOutScaleUp 1s ease-in-out forwards',
//         float: 'float 3s ease-in-out infinite',
//         flash: 'flash 1s linear infinite',
//         wiggle: 'wiggle 0.5s ease-in-out infinite',
//         spinSlow: 'spin 3s linear infinite',
//         pingSlow: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
//       },
//       keyframes: {
//         opacity: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//         bounce: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-4px)' },
//         },
//         shake: {
//           '0%': { transform: 'translateX(0)' },
//           '25%': { transform: 'translateX(-10px)' },
//           '50%': { transform: 'translateX(10px)' },
//           '75%': { transform: 'translateX(-10px)' },
//           '100%': { transform: 'translateX(0)' },
//         },
//         scaleUp: {
//           '0%': { transform: 'scale(1)' },
//           '100%': { transform: 'scale(1.1)' },
//         },
//         fadeOutScaleUp: {
//           '0%': { opacity: 1, transform: 'scale(1)' },
//           '100%': { opacity: 0, transform: 'scale(1.2)' },
//         },
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-8px)' },
//         },
//         flash: {
//           '0%, 100%': { opacity: 1 },
//           '50%': { opacity: 0 },
//         },
//         wiggle: {
//           '0%, 100%': { transform: 'rotate(-5deg)' },
//           '50%': { transform: 'rotate(5deg)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         "primary-100": "#ffc929",
//         "primary-200": "#ffbf00",
//         "secondary-100": "#0b1a78",
//         "secondary-200": "#00b050",
//       },
//       animation: {
//         // General
//         opacity: "opacity 1s ease-in-out",
//         bounce: "bounce 1s infinite",
//         shake: "shake 0.5s ease-in-out",
//         flash: "flash 1s linear infinite",
//         wiggle: "wiggle 0.5s ease-in-out infinite",

//         // Transform effects
//         scaleUp: "scaleUp 0.5s ease-in-out",
//         fadeOutScaleUp: "fadeOutScaleUp 1s ease-in-out forwards",

//         // Movement
//         float: "float 3s ease-in-out infinite",
//         drop: "drop 1.5s ease-in-out infinite",

//         // Spin variants
//         spinSlow: "spin 3s linear infinite",
//         spinReverse: "spinReverse 6s linear infinite",

//         // Ping
//         pingSlow: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",

//         // Gradient effects
//         gradientMove: "gradientMove 3s ease infinite",
//         gradientFillOnce: "gradientFillOnce 1.5s ease-out forwards",
//       },
//       keyframes: {
//         // Fade and opacity
//         opacity: {
//           "0%": { opacity: 0 },
//           "100%": { opacity: 1 },
//         },
//         flash: {
//           "0%, 100%": { opacity: 1 },
//           "50%": { opacity: 0 },
//         },

//         // Bounce, float, shake, wiggle
//         bounce: {
//           "0%, 100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(-4px)" },
//         },
//         float: {
//           "0%, 100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(-8px)" },
//         },
//         shake: {
//           "0%": { transform: "translateX(0)" },
//           "25%": { transform: "translateX(-10px)" },
//           "50%": { transform: "translateX(10px)" },
//           "75%": { transform: "translateX(-10px)" },
//           "100%": { transform: "translateX(0)" },
//         },
//         wiggle: {
//           "0%, 100%": { transform: "rotate(-5deg)" },
//           "50%": { transform: "rotate(5deg)" },
//         },

//         // Scale and transform
//         scaleUp: {
//           "0%": { transform: "scale(1)" },
//           "100%": { transform: "scale(1.1)" },
//         },
//         fadeOutScaleUp: {
//           "0%": { opacity: 1, transform: "scale(1)" },
//           "100%": { opacity: 0, transform: "scale(1.2)" },
//         },

//         // Gradient movement
//         gradientMove: {
//           "0%, 100%": { backgroundPosition: "50% 100%" },
//           "50%": { backgroundPosition: "50% 0%" },
//         },

//         // Gradient fill animation (once)
//         gradientFillOnce: {
//     "0%": { transform: "translateY(100%)" },
//     "100%": { transform: "translateY(20%)" }, // Stops at 80%
//   },
//       },
//     },
//   },
//   plugins: [],
// };


// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
       fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // global default
        montserrat: ['Montserrat', 'sans-serif'], // optional alias
       },
      
      colors: {
        "primary-100": "#ffc929",
        "primary-200": "#ffbf00",
        "secondary-100": "#0b1a78",
        "secondary-200": "#00b050",
      },
      animation: {
         
        // General
         bubbleMove: 'bubbleMove 1s linear infinite',
        opacity: "opacity 1s ease-in-out",
        bounce: "bounce 1s infinite",
        shake: "shake 0.5s ease-in-out",
        flash: "flash 1s linear infinite",
        bounceCart: 'bounceCart 1s ease-out',
    wiggle: 'wiggle 1.5s infinite ease-in-out',
floatGhost: 'floatGhost 4s ease-in-out infinite',
 bounceInCartoon: 'bounceInCartoon 0.6s ease-out',

        // Transform effects
        scaleUp: "scaleUp 0.5s ease-in-out",
        fadeOutScaleUp: "fadeOutScaleUp 1s ease-in-out forwards",

        // Movement
        float: "float 3s ease-in-out infinite",
        drop: "drop 1.5s ease-in-out infinite",

        // Spin variants
        spinSlow: "spin 3s linear infinite",
        spinReverse: "spinReverse 6s linear infinite",

        // Ping
        pingSlow: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",

        // Gradient effects
        gradientMove: "gradientMove 3s ease infinite",
        gradientFillOnce: "gradientFillOnce 1.5s ease-out forwards",

        // Lighting effect
        flicker: "flicker 2s infinite",
      },
      keyframes: {
        // Fade and opacity
        bubbleMove: {
          '0%': { opacity: '0' },
          '10%': { opacity: '0.4', transform: 'translate(10%,10%)' },
          '50%': { opacity: '0.2', transform: 'translate(450%,25%)' },
          '80%': { opacity: '0', transform: 'translateX(555%)' },
          '100%': { opacity: '0', left: '0%', top: '0%' },
        },
         floatGhost: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-12px)' },
    },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        flash: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
          bounceCart: {
      '0%': { transform: 'translateY(-200px)', opacity: 0 },
      '60%': { transform: 'translateY(30px)', opacity: 1 },
      '100%': { transform: 'translateY(0)' },
    },
    wiggle: {
      '0%, 100%': { transform: 'rotate(-2deg)' },
      '50%': { transform: 'rotate(2deg)' },
    },
    floatGhost: {
      '0%, 100%': { transform: 'translateY(0)', opacity: 0.1 },
      '50%': { transform: 'translateY(-20px)', opacity: 0.3 },
    },
    bounceInCartoon: {
      '0%': { transform: 'scale(0.9)', opacity: 0 },
      '60%': { transform: 'scale(1.05)', opacity: 1 },
      '100%': { transform: 'scale(1)' },
    },
  

        // Bounce, float, shake, wiggle
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },

        // Scale and transform
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        fadeOutScaleUp: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(1.2)" },
        },

        // Gradient movement
        gradientMove: {
          "0%, 100%": { backgroundPosition: "50% 100%" },
          "50%": { backgroundPosition: "50% 0%" },
        },

        // Gradient fill animation (once)
        gradientFillOnce: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(20%)" },
        },

      

      },
    },
  },
  plugins: [],
};
