/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        md2: "960px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        threeK: "2560px",
      },
      colors: {
        primary: "#4F3484",
        secondary: "#AD4A00",
        primarydeep: "#2C1D49",
        navyblue: "#2B303B",
        ashwhite: "#FAFAFA",
        // Dark mode palette
        dark: {
          bg: "#1A0A2E",
          surface: "#2D1B4E",
          border: "#3D2560",
          text: "#F5F0FF",
          muted: "#C084B8",
        },
      },
      fontFamily: {
        alnevrada: ["AlNevrada", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lufga: ["Lufga", "serif"],
      },
    },
  },
  plugins: [],
};
