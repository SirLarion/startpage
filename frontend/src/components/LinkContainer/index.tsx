import React, { FC } from 'react';
import styled from 'styled-components';

import {
  ApplicationLink,
  TAppConfig,
  ENTERTAINMENT_LINKS,
  PRODUCTION_LINKS,
} from '../ApplicationLink';

type TLinkSet = 'production' | 'entertainment';

export interface ILinkContainerProps {
  type: TLinkSet;
}

const StyledLinkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
`;

export const LinkContainer: FC<ILinkContainerProps> = ({
  type,
  ...restProps
}) => {
  const links = type === 'production' ? PRODUCTION_LINKS : ENTERTAINMENT_LINKS;

  return (
    <StyledLinkContainer {...restProps}>
      {links.map((link: TAppConfig, index: number) => (
        <ApplicationLink {...link} key={index} delay={index * 100} />
      ))}
    </StyledLinkContainer>
  );
};
