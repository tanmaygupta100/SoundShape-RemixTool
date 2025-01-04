/** @type {import('tailwindcss').Config} */

// Uses installed plugins, such as the gradient colouring:
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Setting file types for tailwind to scan for.
  ],
  theme: {
    extend: {
      colors: { // Added new theme.extend.colors section for custom colours.
        cusBg: '#201713',
        cusAppBg: '#0d0d0d',
        cusTxt: '#a3755c',
        cusBrdr: '#a3755c',
        cusSldr: '#8f8f8f',
      },
      boxShadow: {
        //horizontal offset, vertical offset, blur radious
        // R G B + transparency
        'cusShadow': '0 0 10px 5px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [plugin],
}

