import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export interface IContentPieceProps {
  name: string;
  type: "movies" | "series";
  index: number;
  play: (contentPath: string) => void;
}

const StyledContentPiece = styled(animated.div)`
  min-width: 14rem;
  max-width: 14rem;
  cursor: pointer;
`;

const StyledImage = styled(animated.img)`
  border-radius: 0.5rem;
`;

export const ContentPiece: FC<IContentPieceProps> = ({
  name,
  type,
  index,
  play,
  ...restProps
}) => {
  const [hover, setHover] = useState(false);

  const entranceSpring = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(0, 2rem, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0rem, 0)",
    },
    delay: index * 70,
  });

  const hoverSpring = useSpring({
    transform: hover ? "scale3d(1.1, 1.1, 1)" : "scale3d(1, 1, 1)",
  });

  return (
    <StyledContentPiece
      style={entranceSpring}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setTimeout(() => setHover(false), 100)}
      onClick={() => play(`${type}/${name}`)}
      {...restProps}
    >
      <StyledImage
        style={hoverSpring}
        width={224}
        src={`http://localhost:12345/content/${type}/${name}`}
        alt={name}
      />
    </StyledContentPiece>
  );
};
