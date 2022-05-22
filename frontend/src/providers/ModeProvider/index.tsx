import React, { createContext, useState, FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme as themes } from '../../styles/theme';

export const ModeContext = createContext('production');

type TMode = 'production' | 'entertainment';

export const ModeProvider: FC = ({ children }) => {
  const [mode] = useState<TMode>('entertainment');
  const themeName = mode === 'production' ? 'light' : 'dark';
  return (
    <ModeContext.Provider value={mode}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </ModeContext.Provider>
  );
};
