import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#00A6F0",
  secondary: "#25282F",
  // colors
  links: "#f21170",
  black: "#1E1B26",
  white: "#FFFFFF",
  lightGray: "#64676D",
  lightGray2: "#EFEFF0",
  lightGray3: "#D4D5D6",
  lightGray4: "#7D7E84",
  gray: "#2D3038",
  gray1: "#282C35",
  darkRed: "#31262F",
  lightRed: "#C5505E",
  darkBlue: "#22273B",
  lightBlue: "#424BAF",
  darkGreen: "#213432",
  lightGreen: "#31Ad66",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 8,
  padding: 16,
  padding2: 36,
  padding_fields: 12,

  // font sizes
  largeTitle: 50,
  h1: 32,
  h2: 26,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 18,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Roboto-Regular", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Regular", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Regular", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Regular", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 26,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 28,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
  },
  body2_bangla: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 18,
    color: COLORS.gray,
    lineHeight: 26,
  },
  body3_bangla: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 14,
    color: COLORS.gray,
  },
  button: {
    fontFamily: "HindSiliguri-Regular",
    fontSize: 18,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
