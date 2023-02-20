import React, { FC, useState } from "react";
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

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
  border-radius: 1.5rem;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.4);
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

const StyledOpenContent = styled.div`
  min-width: 50rem;
  display: flex;
  position: relative;
  border-radius: 1.5rem;
  background-color: ${(p) => p.theme.background.secondary};
  box-shadow: 0 0 5rem ${(p) => p.theme.background.primary};
`;

export const OpenContent: FC<IOpenContentProps> = ({
  content,
  play,
  close,
}) => {
  const [closeHover, setCloseHover] = useState(false);
  const closeSpring = useSpring({
    scale: closeHover ? 1.3 : 1,
  });
  if (content) {
    const parts = content.name.split(" ");
    const year = last(parts);
    const title = takeWhile((p) => p !== year, parts).join(" ");
    return (
      <Modal onClick={close}>
        <StyledOpenContent onClick={(e) => e.stopPropagation()}>
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
