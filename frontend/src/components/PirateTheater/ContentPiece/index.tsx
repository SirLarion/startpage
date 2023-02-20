import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { TContent } from "..";
import { VISIBLE_CONTENT_MAX } from "../ContentReel";

export interface IContentPieceProps {
  content: TContent;
  index: number;
  extraDelay: number;
  open: () => void;
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
  content,
  index,
  extraDelay,
  open,
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
    delay: index > VISIBLE_CONTENT_MAX ? 70 : (index + extraDelay) * 70,
  });

  // Rotate as little as possible to force subpixel rendering on firefox
  const hoverSpring = useSpring({
    transform: hover
      ? "scale3d(1.1, 1.1, 1) rotate3d(0, 0, 1, 0.05deg)"
      : "scale3d(1, 1, 1) rotate3d(0, 0, 1, 0.05deg)",
  });

  return (
    <StyledContentPiece
      style={entranceSpring}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setTimeout(() => setHover(false), 100)}
      onClick={open}
      {...restProps}
    >
      <StyledImage
        style={hoverSpring}
        width={224}
        src={`http://localhost:12345/content/${content.type}/${content.name}`}
        alt={content.name}
      />
    </StyledContentPiece>
  );
};
