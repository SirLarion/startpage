import React, { createContext, useEffect, useState, FC } from 'react';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

import { theme as themes } from '../../styles/theme';
import { TAppName } from '../../types';

export type TAppInfo =
  | {
      mode: 'entertainment' | 'production';
      apps: TAppName[];
    }
  | undefined;

export const AppsContext = createContext<TAppInfo>(undefined);

export const AppsProvider: FC = ({ children }) => {
  const [appInfo, setAppInfo] = useState<TAppInfo>(undefined);

  useEffect(() => {
    axios.get('http://localhost:12345/applications').then((res) => {
      setAppInfo(res.data);
    });
  }, []);

  const themeName = appInfo?.mode === 'production' ? 'light' : 'dark';

  return (
    <AppsContext.Provider value={appInfo}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </AppsContext.Provider>
  );
};
