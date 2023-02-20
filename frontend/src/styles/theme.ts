type THexColor = `#${string}`;
type TTheme = Record<string, Record<string, THexColor>>;

const light: TTheme = {
  foreground: {
    primary: "#101010",
  },
  background: {
    primary: "#FFFFF0",
  },
};

const dark: TTheme = {
  foreground: {
    primary: "#DDDDDF",
  },
  background: {
    primary: "#000000",
    secondary: "#15202d",
  },
};

export const theme = { light, dark };
