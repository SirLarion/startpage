import React from 'react';
import styled from 'styled-components';

import netflix from './assets/netflix.svg';
import disney from './assets/disney.svg';
import hbo from './assets/hbo.svg';
import youtube from './assets/youtube.svg';
import soundcloud from './assets/soundcloud.svg';
import spotify from './assets/spotify.svg';
import github from './assets/github.svg';
import somafm from './assets/somafm.svg';

import { TAppConfig } from './';

const StyledIcon = styled.img`
  width: 20vw;
  height: 20vw;
  min-width: 14rem;
  min-height: 14rem;
`;

export const ENTERTAINMENT_LINKS: TAppConfig[] = [
  {
    url: 'https://netflix.com',
    icon: <StyledIcon src={netflix} alt="netflix" />,
  },
  {
    url: 'https://disneyplus.com',
    icon: <StyledIcon src={disney} alt="disney+" />,
  },
  {
    url: 'https://hbomax.com',
    icon: <StyledIcon src={hbo} alt="hbomax" />,
  },
  {
    url: 'https://youtube.com',
    icon: <StyledIcon src={youtube} alt="youtube" />,
  },
  {
    url: 'https://soundcloud.com',
    icon: <StyledIcon src={soundcloud} alt="soundcloud" />,
  },
  {
    url: 'https://open.spotify.com',
    icon: <StyledIcon src={spotify} alt="spotify" />,
  },
];

export const PRODUCTION_LINKS: TAppConfig[] = [
  {
    url: 'https://github.com',
    icon: <StyledIcon src={github} alt="github" />,
  },
  {
    url: 'https://soundcloud.com',
    icon: <StyledIcon src={soundcloud} alt="soundcloud" />,
  },
  {
    url: 'https://somafm.com/player/#/now-playing/groovesalad',
    icon: <StyledIcon src={somafm} alt="somafm" />,
  },
];
