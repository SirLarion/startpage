import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

import { theme } from "../../../styles/theme";

export interface IContentPieceProps {
  name: string;
  type: "movies" | "series";
  play: (contentPath: string) => void;
}

const StyledContentPiece = styled.div`
  width: 14rem;
  max-width: 14rem;
  cursor: pointer;
  > h4 {
    margin-top: 1rem;
    color: ${theme.dark.foreground.primary};
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
    <StyledContentPiece onClick={() => play(`${type}/${name}`)} {...restProps}>
      <StyledImage
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setTimeout(() => setHover(false), 100)}
        style={hoverSpring}
        width={224}
        src={`http://localhost:12345/content/${type}/${name}`}
        alt={name}
      />
      <h4>{name}</h4>
    </StyledContentPiece>
  );
};
