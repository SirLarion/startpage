import React, { FC } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import { Heading1, Heading2 } from "../../styles/typography";
import { ContentPiece } from "./ContentPiece";
import { FadeToBlack } from "./FadeToBlack";
import { useLoadContent } from "./hooks/useLoadContent";
import { usePlayContent } from "./hooks/usePlayContent";

import piratePlain from "../../assets/pirate_plain.svg";
import { ContentReel, VISIBLE_CONTENT_MAX } from "./ContentReel";

const PIRATE_LOGO_SIZE = 64;

const StyledPirateTheater = styled.div`
  margin-bottom: 5rem;
`;

const Header = styled(animated.header)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

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

export const PirateTheater: FC = () => {
  const { movieList, seriesList, loading } = useLoadContent();

  const { playContent, playing } = usePlayContent();

  const spring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 100,
  });

  const visibleMoviesAmount = Math.min(movieList.length, VISIBLE_CONTENT_MAX);

  return (
    <>
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
        <ContentSection style={spring}>
          <Heading1>Movies</Heading1>
          <ContentReel
            items={movieList.map((movie, i) => (
              <ContentPiece
                key={`${movie}${i}`}
                index={i + 1 + 3}
                name={movie}
                type="movies"
                play={playContent}
              />
            ))}
            loading={loading}
          />
        </ContentSection>
        <ContentSection style={spring}>
          <Heading1>Series</Heading1>
          <ContentReel
            items={seriesList.map((series, i) => (
              <ContentPiece
                key={`${series}${i}`}
                index={visibleMoviesAmount + i + 3}
                name={series}
                type="series"
                play={playContent}
              />
            ))}
            loading={loading}
          />
        </ContentSection>
      </StyledPirateTheater>
      <FadeToBlack visible={playing} />
    </>
  );
};
