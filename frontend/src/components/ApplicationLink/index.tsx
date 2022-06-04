import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

import { TAppConfig } from '../../types';

const StyledApplicationLink = styled(animated.a)`
  position: relative;
`;

const IconWrapper: FC<{ animationDelay: number }> = ({
  animationDelay,
  children,
}) => {
  const spring = useSpring({
    config: config.stiff,
    delay: animationDelay,
    from: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  });
  return <animated.div style={spring}>{children}</animated.div>;
};

export const ApplicationLink: FC<TAppConfig & { delay: number }> = ({
  url,
  icon,
  delay,
  ...restProps
}) => {
  const [isHover, setHover] = useState(false);

  const { scale } = useSpring({
    scale: isHover ? 1.1 : 1,
  });

  return (
    <StyledApplicationLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ scale }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...restProps}
    >
      <IconWrapper animationDelay={delay}>{icon}</IconWrapper>
    </StyledApplicationLink>
  );
};
