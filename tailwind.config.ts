import type { Config } from "tailwindcss";
import { modalKeyframes } from "./src/components/Modal/Animations";
import { glowingButtonKeyframes } from "./src/components/GlowingButton/Animations";
import { loginFormKeyframes } from "./src/app/login/Animations";
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
        "dark-400": "#2b313c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        tilt: "tilt 5s infinite linear",
        "backdrop-fade-in": "backdropFadeIn 0.2s ease-out forwards .1s",
        "backdrop-fade-out": "backdropFadeOut 0.2s ease-out forwards .1s",
        "unfold-y": "unfoldY .1s linear",
        "unfold-step-by-step": "unfoldStepByStep .3s ease-out",
        "absolute-unfold": "absoluteUnfold .4s ease-out",
        "fold-y": "foldY .1s linear forwards",
        "absolute-spin": "absoluteSpin 2s linear infinite;",
      },
      keyframes: {
        ...modalKeyframes,
        ...glowingButtonKeyframes,
        ...loginFormKeyframes,
      },
    },
  },
  plugins: [],
};
export default config;
