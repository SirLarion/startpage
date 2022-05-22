import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

export * from './constants';

export type TAppConfig = {
  url: `https://${string}`;
  icon: ReactNode;
};

const StyledApplicationLink = styled(animated.a)`
  position: relative;
`;

// const StyledSelectionGlow = styled.div`
//   position: absolute;
//   z-index: 0;
// `;

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

export const ApplicationLink: FC<
  TAppConfig & { delay: number; select: () => void; isSelected: boolean }
> = ({ url, icon, delay, select, isSelected, ...restProps }) => {
  const [isHover, setHover] = useState(false);

  const { scale } = useSpring({
    scale: isHover || isSelected ? 1.1 : 1,
  });

  useEffect(() => {
    if (isSelected) {
      setTimeout(() => window.open(url, '_blank'), 500);
    }
  }, [isSelected, url]);

  return (
    <StyledApplicationLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ scale }}
      onClick={select}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...restProps}
    >
      <IconWrapper animationDelay={delay}>{icon}</IconWrapper>
    </StyledApplicationLink>
  );
};
