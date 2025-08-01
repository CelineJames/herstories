/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App/**/*.{js,ts,jsx,tsx}", // App Router files
    "./Views/**/*.{js,ts,jsx,tsx}", // Your logic/components
    "./components/**/*.{js,ts,jsx,tsx}", // Future component folder
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        threeK: "2560px",
      },
      colors: {
        primary: "#4F3484", //purple
        secondary: "#AD4A00", //orange
        primarydeep: "#2C1D49", //deep purple
        navyblue: "#2B303B",
        ashwhite: "#FAFAFA",
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
