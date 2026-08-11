/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        ink: {
          950: "#0e1116",
          900: "#151922",
          700: "#343d4d",
          500: "#657085"
        },
        clinic: {
          50: "#eefcf8",
          100: "#d5f7ee",
          500: "#13987d",
          600: "#087c67",
          700: "#066555"
        },
        pulse: {
          50: "#fff7ed",
          400: "#f59e0b",
          600: "#b45309"
        },
        clay: {
          50: "#fff1ed",
          500: "#d65a31",
          700: "#9d351c"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(14, 17, 22, 0.10)"
      }
    }
  },
  plugins: []
};
