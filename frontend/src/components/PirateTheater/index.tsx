import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { animated, config, useSpring } from "react-spring";

import { Heading1, Heading2 } from "../../styles/typography";
import { PlayContext } from "../../providers/PlayProvider";
import { ContentPiece } from "./ContentPiece";
import { FadeToBlack } from "./FadeToBlack";
import { useLoadContent } from "./hooks/useLoadContent";

import { ContentReel, VISIBLE_CONTENT_MAX } from "./ContentReel";
import { OpenContent } from "./OpenContent";

import piratePlain from "../../assets/pirate_plain.svg";

const PIRATE_LOGO_SIZE = 64;

const Wrapper = styled.div`
  position: relative;
`;

const StyledPirateTheater = styled.div`
  margin-bottom: 5rem;
`;

const Header = styled(animated.header)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  > ${Heading2} {
    font-weight: 400;
    font-family: "Cabin";
  }
`;

const Logo = styled.img`
  margin: 0 0.75rem;
`;

const ContentSection = styled(animated.section)`
  width: 100vw;
  position: relative;
  > :first-child {
    padding-left: 5rem;
  }
`;

export type TContent = {
  type: "movies" | "series";
  name: string;
};

export const PirateTheater: FC = () => {
  const [openedContent, setOpenedContent] = useState<TContent | null>(null);
  const { movieList, seriesList, loading } = useLoadContent();
  const { playing } = useContext(PlayContext);

  const spring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 1000,
    config: config.molasses,
  });

  const visibleMoviesAmount = Math.min(movieList.length, VISIBLE_CONTENT_MAX);

  return (
    <Wrapper>
      <StyledPirateTheater>
        <Header style={spring}>
          <Heading2>Pirate</Heading2>
          <Logo
            width={PIRATE_LOGO_SIZE}
            height={PIRATE_LOGO_SIZE}
            src={piratePlain}
            alt="yarr im a pirate"
          />
          <Heading2>Theater</Heading2>
        </Header>
        <ContentSection>
          <animated.div style={spring}>
            <Heading1>Movies</Heading1>
          </animated.div>
          <ContentReel
            items={movieList.map((movie, i) => {
              const content: TContent = { type: "movies", name: movie };
              return (
                <ContentPiece
                  key={`${movie}${i}`}
                  index={i}
                  extraDelay={2}
                  content={content}
                  open={() => setOpenedContent(content)}
                />
              );
            })}
            loading={loading}
          />
        </ContentSection>
        <ContentSection>
          <animated.div style={spring}>
            <Heading1>Series</Heading1>
          </animated.div>
          <ContentReel
            items={seriesList.map((series, i) => {
              const content: TContent = { type: "series", name: series };
              return (
                <ContentPiece
                  key={`${series}${i}`}
                  index={i}
                  extraDelay={visibleMoviesAmount}
                  content={content}
                  open={() => setOpenedContent(content)}
                />
              );
            })}
            loading={loading}
          />
        </ContentSection>
      </StyledPirateTheater>
      <OpenContent
        content={openedContent}
        close={() => setOpenedContent(null)}
      />
      <FadeToBlack visible={playing} />
    </Wrapper>
  );
};
