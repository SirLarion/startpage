import React, { FC, useEffect, useState } from "react";
import { last, takeWhile } from "ramda";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { TContent } from "..";
import { Heading3, Heading4 } from "../../../styles/typography";
import cross_button from "../../../assets/cross_button.svg";

export interface IOpenContentProps {
  content: TContent | null;
  play: (path: string) => void;
  close: () => void;
}

const Modal = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Image = styled.img`
  border-radius: 0.5rem;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(animated.img)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
`;

const InfoBox = styled.section`
  padding: 2rem;
`;

const Title = styled(Heading3)`
  max-width: 25rem;
`;

const Year = styled(Heading4)`
  opacity: 0.7;
`;

const StyledOpenContent = styled(animated.div)`
  min-width: 50rem;
  display: flex;
  position: relative;
  border-radius: 0.5rem;
  background-color: ${p => p.theme.background.secondary};
  box-shadow: 0 0 5rem ${p => p.theme.background.primary};
`;

export const OpenContent: FC<IOpenContentProps> = ({
  content: contentSource,
  play,
  close,
}) => {
  const [content, setContent] = useState<TContent | null>(contentSource);
  const [closeHover, setCloseHover] = useState(false);

  const closeSpring = useSpring({
    scale: closeHover ? 1.3 : 1,
  });

  const modalSpring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    reverse: !contentSource,
  });

  const cardSpring = useSpring({
    from: {
      transform: "translate3d(0, 3rem, 0)",
    },
    to: {
      transform: "translate3d(0, 0rem, 0)",
    },
    reverse: !contentSource,
  });

  useEffect(() => {
    if (contentSource && contentSource !== content) {
      setContent(contentSource);
    }
    if (!contentSource && contentSource !== content) {
      setTimeout(() => {
        setContent(contentSource);
      }, 200);
    }
  }, [content, contentSource]);

  if (content) {
    const parts = content?.name?.split(" ") || [];
    const year = last(parts);
    const title = takeWhile(p => p !== year, parts).join(" ");
    return (
      <Modal onClick={close} style={modalSpring}>
        <StyledOpenContent
          onClick={e => e.stopPropagation()}
          style={cardSpring}
        >
          <Image
            width={400}
            src={`http://localhost:12345/content/${content.type}/${content.name}`}
            alt={`${content.name} large`}
          />
          <InfoBox>
            <Title>{title}</Title>
            <Year>{(year || "").replace(/[{()}]/g, "")}</Year>
            <CloseButton
              style={closeSpring}
              onClick={() => {
                close();
                setCloseHover(false);
              }}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
              width={12}
              height={12}
              src={cross_button}
              alt="close"
            />
          </InfoBox>
        </StyledOpenContent>
      </Modal>
    );
  }
  return null;
};
