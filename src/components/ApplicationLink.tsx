import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import netflix from '../assets/netflix.svg';

const APP_IDS = [
  'netflix',
  // 'youtube',
  // 'hbo',
  // 'disney',
  // 'soundcloud',
  // 'spotify',
] as const;

const AppIcon = styled.img`
  width: 8rem;
  height: 8rem;
`;

type TAppId = typeof APP_IDS[number];
type TAppConfig = {
  url: `https://${string}`;
  icon: ReactNode;
};

const APPS: Record<TAppId, TAppConfig> = {
  netflix: {
    url: 'https://netflix.com',
    icon: <AppIcon src={netflix} alt="netflix" />,
  },
};

export interface IApplicationLinkProps {
  id: TAppId;
}

const StyledApplicationLink = styled.div``;

export const ApplicationLink: FC<IApplicationLinkProps> = ({
  id,
  ...restProps
}) => {
  return (
    <StyledApplicationLink {...restProps}>
      <img src={`/assets/${id}.svg`} alt={id} />
    </StyledApplicationLink>
  );
};
