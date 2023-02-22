import React, { FC } from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

export interface IFadeToBlackProps {
  visible: boolean;
}

const StyledFadeToBlack = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: black;
`;

export const FadeToBlack: FC<IFadeToBlackProps> = ({ visible }) => {
  const spring = useSpring({
    opacity: visible ? 1 : 0,
    config: config.molasses,
  });
  return visible ? <StyledFadeToBlack style={spring} /> : null;
};
