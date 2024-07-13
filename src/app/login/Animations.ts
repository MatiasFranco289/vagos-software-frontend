export const loginFormKeyframes = {
  unfoldStepByStep: {
    "0%": {
      transform: "scale(0.01,0);",
    },
    "50%": {
      transform: "scale(0.01,1);",
    },
    "100%": {
      transform: "scale(1,1);",
    },
  },
  // This is similar to default spin animation from tailwind but keeps centered
  // the element by also applying 'transform translate'
  absoluteSpin: {
    "0%": {
      transform: "translate(-50%, -50%) rotate(0deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) rotate(360deg)",
    },
  },
  // Similar to other unfould animations but same as absoluteSpin, keeping centered
  absoluteUnfold: {
    "0%": {
      transform: "translate(-50%, -50%) scale(0.01, 0);",
    },
    "50%": {
      transform: "translate(-50%, -50%) scale(0.01,1)",
    },
    "100%": {
      transform: "translate(-50%, -50%) scale(1,1)",
    },
  },
};
