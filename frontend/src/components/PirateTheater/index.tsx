import React, { FC } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ContentPiece } from "./ContentPiece";
import { FadeToBlack } from "./FadeToBlack";
import { useLoadContent } from "./hooks/useLoadContent";
import { usePlayContent } from "./hooks/usePlayContent";

const ContentSection = styled.section`
  max-width: 100vw;
  width: 100vw;
  overflow-x: hidden;
`;

const SectionLabel = styled.h1`
  font-size: 6rem;
  color: ${theme.dark.foreground.primary};
`;

const SectionBody = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledPirateTheater = styled.div`
  padding: 3rem;
  > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const PirateTheater: FC = () => {
  const { movieList, seriesList, loading } = useLoadContent();
  const { playContent, playing } = usePlayContent();
  if (!loading) {
    return (
      <>
        <StyledPirateTheater>
          <ContentSection>
            <SectionLabel>Movies</SectionLabel>
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
            <SectionLabel>Series</SectionLabel>
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
  return <div>borka borka</div>;
};
