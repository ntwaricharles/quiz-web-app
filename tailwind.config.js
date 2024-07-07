/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: "#A729F5",
        darkNavy: "#313E51",
        navy: "#3B4D66",
        greyNavy: "#626C7F",
        lightGrey: "#F4F6FA",
        lightBlue: "#ABC1E1",
        green: "#26D782",
        red: "#EE5454",
        orange: "#FF7E35",
        green: "#2FD887",
        blue: "#306AFF",
      },
      fontFamily: {
        primary: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
