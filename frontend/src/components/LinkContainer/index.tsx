import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { ApplicationLink } from '../ApplicationLink';
import { AppsContext } from '../../providers/AppsProvider';
import { TAppConfig } from '../../types';
import { APPLICATION_LINKS } from '../../constants';

const StyledLinkContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 2rem;
`;

export const LinkContainer: FC = ({ ...restProps }) => {
  const appInfo = useContext(AppsContext);
  const selected = appInfo?.apps.map((a) => APPLICATION_LINKS[a]) || [];
  return (
    <StyledLinkContainer {...restProps}>
      {selected.map((link: TAppConfig, index: number) => (
        <ApplicationLink {...link} key={index} delay={index * 100} />
      ))}
    </StyledLinkContainer>
  );
};
