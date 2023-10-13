type TTheme = Record<string, Record<string, string>>;

const light: TTheme = {
  foreground: {
    primary: "#101010",
  },
  background: {
    primary: "#FFFFF0",
    gradient: 'linear-gradient(9deg, rgba(231,248,255,1) 11%, rgba(243,255,199,1) 95%)'
  },
};

const dark: TTheme = {
  foreground: {
    primary: "#DDDDDF",
  },
  background: {
    primary: "#050e19",
    secondary: "#0d131c",
    tertiary: "#080c11",
    gradient: 'linear-gradient(9deg, rgb(6 3 22) 11%, rgb(50 16 16) 95%)'
  },
  accent: {
    navy: "#101654",
    red: "#c00",
  },
};

export const theme = { light, dark };
