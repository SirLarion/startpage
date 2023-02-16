import React, { FC } from "react";
import styled from "styled-components";

import { Heading1, Heading2 } from "../../styles/typography";
import { ContentPiece } from "./ContentPiece";
import { FadeToBlack } from "./FadeToBlack";
import { useLoadContent } from "./hooks/useLoadContent";
import { usePlayContent } from "./hooks/usePlayContent";

import piratePlain from "../../assets/pirate_plain.svg";
import { hideScrollbar } from "../../styles/common";

const PIRATE_LOGO_SIZE = 96;

const StyledPirateTheater = styled.div`
  margin-bottom: 5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.5rem;

  > ${Heading2} {
    font-weight: 400;
    font-family: "Cabin";
  }
`;

const Logo = styled.img`
  margin: 0 0.5rem;
`;

const ContentSection = styled.section`
  width: 100vw;
  > * {
    padding-left: 3rem;
  }
`;

const SectionBody = styled.div`
  max-width: 100vw;
  overflow-x: scroll;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 1.5rem;
  ${hideScrollbar}
`;

export const PirateTheater: FC = () => {
  const { movieList, seriesList, loading } = useLoadContent();
  const { playContent, playing } = usePlayContent();
  if (!loading) {
    return (
      <>
        <StyledPirateTheater>
          <Header>
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
            <Heading1>Movies</Heading1>
            <SectionBody>
              {movieList.map((movie, i) => (
                <ContentPiece
                  key={`${movie}${i}`}
                  name={movie}
                  type="movies"
                  play={playContent}
                />
              ))}
            </SectionBody>
          </ContentSection>
          <ContentSection>
            <Heading1>Series</Heading1>
            <SectionBody>
              {seriesList.map((series, i) => (
                <ContentPiece
                  key={`${series}${i}`}
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
  }
  return null;
};
