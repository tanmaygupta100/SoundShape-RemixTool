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
        cusBg: '#2a2a36',
        cusAppBg: '#15151c',
        cusTxt: '#9f9fcf',
        cusBrdr: '#51518a',
        cusSldr: '#3b3b52',
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

