import React, { FC, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { Heading4 as BaseHeading } from "../../../../../styles/typography";

import play_button from "../../../../../assets/play_button.svg";

export interface IEpisodeProps {
  index: number;
  length: string;
  play: () => void;
}

const StyledEpisode = styled(animated.div)`
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  padding: 1.25rem 1.5rem 1.25rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${p => p.theme.background.secondary};
  transition: background-color 400ms ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${p => p.theme.accent.red};
  }
`;

const Heading4 = animated(BaseHeading);

const Length = styled(Heading4)`
  opacity: 0.4;
  font-size: 0.75rem;
  margin-right: 2rem;
`;

export const Episode: FC<IEpisodeProps> = ({ index, length, play }) => {
  const [hover, setHover] = useState(false);
  const spring = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 1rem, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0rem, 0)" },
    delay: index * 70,
  });

  const textSpring = useSpring({
    transform: hover ? "translate3d(1rem, 0, 0)" : "translate3d(0rem, 0, 0)",
  });

  const playSpring = useSpring({
    opacity: hover ? 1 : 0,
    transform: hover ? "scale3d(1.1, 1.1, 1)" : "scale3d(0.5, 0.5, 1)",
  });

  return (
    <StyledEpisode
      style={spring}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={play}
    >
      <Heading4 style={textSpring}>
        {`Episode ${index + 1}`}
        <Length>{length}</Length>
      </Heading4>
      <animated.img
        width={16}
        style={playSpring}
        src={play_button}
        alt="play"
      />
    </StyledEpisode>
  );
};
