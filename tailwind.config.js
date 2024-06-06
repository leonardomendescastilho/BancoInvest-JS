/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js}',
    './*.{html,js}'
  ],
  
  theme: {
    extend: {
      boxShadow: {
       'custom-focus': '0 4px 4px rgba(0, 0, 0, 0.2), 0 -4px 4px -4px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};
