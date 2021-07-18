import defaultTheme from "./default";

import { createTheme } from "@material-ui/core";

const overrides = {
  direction: "rtl",
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },
    "fontFamily": "IRANSans",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
};

export default {
  default: createTheme({ ...defaultTheme as any, ...overrides }),
};
