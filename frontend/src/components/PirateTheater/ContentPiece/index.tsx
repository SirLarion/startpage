import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

export interface IContentPieceProps {
  name: string;
  type: "movies" | "series";
  play: (contentPath: string) => void;
}

const StyledContentPiece = styled.div`
  min-width: 14rem;
  max-width: 14rem;
  cursor: pointer;
  > :last-child {
    margin-top: 1rem;
  }
`;

const StyledImage = styled(animated.img)`
  border-radius: 0.5rem;
`;

export const ContentPiece: FC<IContentPieceProps> = ({
  name,
  type,
  play,
  ...restProps
}) => {
  const [hover, setHover] = useState(false);

  const hoverSpring = useSpring({
    transform: hover ? "scale3d(1.1, 1.1, 1)" : "scale3d(1, 1, 1)",
  });

  return (
    <StyledContentPiece
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
