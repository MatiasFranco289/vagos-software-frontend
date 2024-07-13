import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-100": "#191919",
        "dark-200": "#1d1d1d",
        "dark-300": "#242424",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        tilt: "tilt 5s infinite linear",
        "backdrop-blur-in": "backdropBlurIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1deg)",
          },
          "75%": {
            transform: "rotate(-1deg)",
          },
        },
        backdropBlurIn: {
          "0%": { backdropFilter: "blur(0)" },
          "100%": { backdropFilter: "blur(4px)" }, // Ajusta el valor según tu necesidad
        },
      },
    },
  },
  plugins: [],
};
export default config;
