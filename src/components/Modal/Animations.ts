export const modalKeyframes = {
  backdropFadeIn: {
    "0%": {
      backdropFilter: "blur(0);background-color: rgba(255,255,255,0);",
    },
    "100%": {
      backdropFilter: "blur(4px);background-color: rgba(255,255,255,0.1);",
    },
  },
  backdropFadeOut: {
    "0%": {
      backdropFilter: "blur(4px);background-color: rgba(255,255,255,0.1);",
    },
    "100%": {
      backdropFilter: "blur(0px);background-color: rgba(255,255,255,0);",
    },
  },
  unfoldY: {
    "0%": { transform: "scaleY(0.01)" },
    "100%": { transform: "scaleY(1)" },
  },
  foldY: {
    "0%": { transform: "scaleY(1)" },
    "100%": { transform: "scaleY(.01)" },
  },
};
