import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

export * from './constants';

const APP_IDS = [
  'netflix',
  // 'youtube',
  // 'hbo',
  // 'disney',
  // 'soundcloud',
  // 'spotify',
] as const;

export type TAppId = typeof APP_IDS[number];
export type TAppConfig = {
  url: `https://${string}`;
  icon: ReactNode;
};

export interface IApplicationLinkProps {
  id: TAppId;
}

const StyledApplicationLink = styled.a``;

export const ApplicationLink: FC<TAppConfig> = ({
  url,
  icon,
  ...restProps
}) => {
  return (
    <StyledApplicationLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...restProps}
    >
      {icon}
    </StyledApplicationLink>
  );
};
