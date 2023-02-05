import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import axios from "axios";

import { TAppConfig } from "../../types";

const StyledApplicationLink = styled(animated.a)`
  position: relative;

  :focus-visible {
    outline: none;
  }
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
      transform: "scale(0.8)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  });
  return <animated.div style={spring}>{children}</animated.div>;
};

export interface IApplicationLinkProps extends TAppConfig {
  delay: number;
  selected?: boolean;
  setSelected?: (value: boolean) => void;
}

export const ApplicationLink: FC<IApplicationLinkProps> = ({
  url,
  icon,
  delay,
  selected = false,
  setSelected = () => {},
  ...restProps
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const { scale } = useSpring({
    scale: selected ? 1.1 : 1,
  });

  const getLocal = () => axios.get(url);

  const conditionalProps = url.startsWith("http://localhost")
    ? {
        onClick: getLocal,
      }
    : { target: "_blank", rel: "noopener noreferrer", href: url };

  useEffect(() => {
    if (linkRef && linkRef.current && selected) {
      linkRef.current.focus();
    }
  }, [selected]);

  return (
    <StyledApplicationLink
      ref={linkRef}
      style={{ scale }}
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      onKeyDown={console.log}
      {...conditionalProps}
      {...restProps}
    >
      <IconWrapper animationDelay={delay}>{icon}</IconWrapper>
    </StyledApplicationLink>
  );
};
