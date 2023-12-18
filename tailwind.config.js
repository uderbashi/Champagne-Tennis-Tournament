/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tennis-primary": "#FF5733",
        "tennis-secondary": "#FF3D1A",
        "tennis-text": "#FFFFFF",
        "tennis-offtext": "#FFDDDD",
      },
    },
    fontFamily: {
      sans: ["Helvetica", "Arial"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "780px",
    },
  },
  plugins: [],
};
