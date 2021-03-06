type THexColor = `#${string}`;
type TTheme = Record<string, Record<string, THexColor>>;

const light: TTheme = {
  foreground: {
    primary: '#101010',
  },
  background: {
    primary: '#FFFFF0',
  },
};

const dark: TTheme = {
  foreground: {
    primary: '#FDFDFF',
  },
  background: {
    primary: '#000000',
  },
};

export const theme = { light, dark };
