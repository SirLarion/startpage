import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const [selected, setSelected] = useState(-1);
  const links = type === 'production' ? PRODUCTION_LINKS : ENTERTAINMENT_LINKS;

  useEffect(() => {
    setInterval(() => {
      axios
        .get('http://localhost:5000/selected')
        .then((res) => setSelected(parseInt(res.data)));
    }, 500);
  }, []);

  useEffect(() => {
    axios.post('http://192.168.1.61:5000/selected', { selected });
  }, [selected]);

  return (
    <StyledLinkContainer {...restProps}>
      {links.map((link: TAppConfig, index: number) => (
        <ApplicationLink
          {...link}
          key={index}
          delay={index * 100}
          select={() => setSelected(index)}
          isSelected={selected === index}
        />
      ))}
    </StyledLinkContainer>
  );
};
