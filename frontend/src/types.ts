import { ReactNode } from 'react';
import { APPLICATION_NAMES } from './constants';

export type TAppName = typeof APPLICATION_NAMES[number];

export type TAppMap = Record<TAppName, TAppConfig>;

export type TAppConfig = {
  url: string;
  icon: ReactNode;
};
