import React, { FC, useContext, useEffect, useState } from "react";
import { last, takeWhile } from "ramda";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";

import { Heading3, Heading4 } from "../../../../styles/typography";
import { PlayContext } from "../../../../providers/PlayProvider";
import { Hoverable } from "../../../Hoverable";
import { TContent } from "../..";
import { useLoadContentInfo } from "../../hooks/useLoadContentInfo";
import { SeasonDisplay } from "./SeasonDisplay";

import cross_button from "../../../../assets/cross_button.svg";
import play_button from "../../../../assets/play_button.svg";

const IMAGE_HEIGHT_PX = 568;

export interface IOpenContentProps {
  content: TContent | null;
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
  min-height: 35.5rem;
  max-height: 35.5rem;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(Hoverable)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
`;

const PlayButton = styled.div`
  border-radius: 2rem;
  margin: 2rem;
  padding: 0.5rem;
  max-width: max-content;
  background-color: ${p => p.theme.background.secondary};
  transition: background-color 400ms ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${p => p.theme.accent.red};
  }

  > :first-child {
    padding: 0.75rem;
  }
`;

const InfoBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoBody = styled.div`
  flex: 1;
  background-color: ${p => p.theme.background.tertiary};
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  > :first-child {
    max-width: 25rem;
  }
  > :last-child {
    opacity: 0.7;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledOpenContent = styled(animated.div)`
  min-width: 50rem;
  max-height: min-content;
  display: flex;
  position: relative;
  border-radius: 0.5rem;
  background-color: ${p => p.theme.background.secondary};
  box-shadow: 0 0 5rem #000000;
`;

export const OpenContent: FC<IOpenContentProps> = ({
  content: contentSource,
  close,
}) => {
  const { play } = useContext(PlayContext);
  const [content, setContent] = useState<TContent | null>(contentSource);

  const [titleRef, { height }] = useMeasure();
  const { loading, info } = useLoadContentInfo(content);

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
    const parts = content.name.split(" ") || [];
    const year = last(parts);
    const title = takeWhile(p => p !== year, parts).join(" ");
    const isSeries = content.type === "series";
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
            <Header ref={titleRef}>
              <Heading3>{title}</Heading3>
              <Info>
                <Heading4>{(year || "").replace(/[{()}]/g, "")}</Heading4>
                {!isSeries && <Heading4>{info?.length || ""}</Heading4>}
              </Info>
            </Header>
            <CloseButton>
              <img
                onClick={close}
                width={12}
                height={12}
                src={cross_button}
                alt="close"
              />
            </CloseButton>
            <InfoBody>
              {isSeries ? (
                !loading && (
                  <SeasonDisplay
                    name={content.name}
                    seasons={info?.seasons || {}}
                    availableHeight={IMAGE_HEIGHT_PX - height}
                  />
                )
              ) : (
                <PlayButton onClick={() => play(`movies/${content.name}`)}>
                  <Hoverable>
                    <img width={16} height={16} src={play_button} alt="play" />
                  </Hoverable>
                </PlayButton>
              )}
            </InfoBody>
          </InfoBox>
        </StyledOpenContent>
      </Modal>
    );
  }
  return null;
};
