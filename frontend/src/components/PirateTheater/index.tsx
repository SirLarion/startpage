import React, { FC } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

import { Heading1, Heading2 } from "../../styles/typography";
import { ContentPiece } from "./ContentPiece";
import { FadeToBlack } from "./FadeToBlack";
import { useLoadContent } from "./hooks/useLoadContent";
import { usePlayContent } from "./hooks/usePlayContent";

import piratePlain from "../../assets/pirate_plain.svg";
import { hideScrollbar } from "../../styles/common";

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
  > * {
    padding-left: 3rem;
  }
`;

const SectionBody = styled.div`
  max-width: 100vw;
  min-height: 23rem;
  position: relative;
  overflow-x: scroll;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 1.5rem;
  ${hideScrollbar}
`;

const LeftButton = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  height: 23rem;
  width: 3rem;
`;

const RightButton = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
  height: 23rem;
  width: 3rem;
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

  const visibleMoviesAmount = Math.min(movieList.length, 8);
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
          <LeftButton />
          <SectionBody>
            {!loading &&
              movieList.map((movie, i) => (
                <ContentPiece
                  key={`${movie}${i}`}
                  index={i + 3}
                  name={movie}
                  type="movies"
                  play={playContent}
                />
              ))}
          </SectionBody>
          <RightButton />
        </ContentSection>
        <ContentSection style={spring}>
          <Heading1>Series</Heading1>
          <SectionBody>
            {!loading &&
              seriesList.map((series, i) => (
                <ContentPiece
                  key={`${series}${i}`}
                  index={visibleMoviesAmount + i + 3}
                  name={series}
                  type="series"
                  play={playContent}
                />
              ))}
          </SectionBody>
        </ContentSection>
      </StyledPirateTheater>
      <FadeToBlack visible={playing} />
    </>
  );
};
