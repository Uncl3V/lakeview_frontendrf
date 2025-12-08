/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#0A1C38",
        secondaryTeal: "#246E71",
        accentCyan: "#00BCD4"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    }
  },
  plugins: []
};
