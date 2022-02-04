import React from 'react';
import styled from 'styled-components';

import netflix from './assets/netflix.svg';
import disney from './assets/disney.svg';
import hbo from './assets/hbo.svg';
import youtube from './assets/youtube.svg';
import soundcloud from './assets/soundcloud.svg';
import spotify from './assets/spotify.svg';

import { TAppConfig } from './';

const AppIcon = styled.img`
  width: 8rem;
  height: 8rem;
`;

export const ENTERTAINMENT_LINKS: TAppConfig[] = [
  {
    url: 'https://netflix.com',
    icon: <AppIcon src={netflix} alt="netflix" />,
  },
  {
    url: 'https://disneyplus.com',
    icon: <AppIcon src={disney} alt="disney+" />,
  },
  {
    url: 'https://hbomax.com',
    icon: <AppIcon src={hbo} alt="hbomax" />,
  },
  {
    url: 'https://youtube.com',
    icon: <AppIcon src={youtube} alt="youtube" />,
  },
  {
    url: 'https://soundcloud.com',
    icon: <AppIcon src={soundcloud} alt="soundcloud" />,
  },
  {
    url: 'https://open.spotify.com',
    icon: <AppIcon src={spotify} alt="spotify" />,
  },
];
