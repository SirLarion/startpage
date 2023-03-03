import React, { FC, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import arrow_button from "../../../../assets/arrow_button.svg";
import { noSelect } from "../../../../styles/common";

export interface IRotateButtonProps {
  rotate: () => void;
}

const StyledButtonBase = styled(animated.div)`
  position: absolute;
  z-index: 10;
  height: 26rem;
  width: 12rem;
`;

const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  filter: blur(3rem);
  transform: scale3d(1.1, 1.1, 1) translate3d(6rem, 2rem, 0);
`;

const StyledButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
  right: 0;
  top: 0;
  min-height: 100%;
  width: 8rem;
  ${noSelect}
`;

export const RotateButton: FC<IRotateButtonProps> = ({
  rotate,
  ...restProps
}) => {
  const [hover, setHover] = useState(false);
  const spring = useSpring({ opacity: hover ? 1 : 0 });
  const arrowSpring = useSpring({
    transform: hover ? "translate3d(0rem, 0, 0)" : "translate3d(2rem, 0, 0)",
  });
  return (
    <StyledButtonBase
      style={spring}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...restProps}
    >
      <Blur />
      <StyledButton onClick={rotate}>
        <animated.img
          style={arrowSpring}
          width={32}
          src={arrow_button}
          alt="arrow button"
        />
      </StyledButton>
    </StyledButtonBase>
  );
};
