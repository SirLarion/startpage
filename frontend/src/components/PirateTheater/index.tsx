import React, { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring';

import { Heading1 } from '../../styles/typography';
import { PlayContext } from '../../providers/PlayProvider';
import { ContentPiece } from './components/ContentPiece';
import { FadeToBlack } from './components/FadeToBlack';
import { useLoadContent } from './hooks/useLoadContent';

import { ContentReel, VISIBLE_CONTENT_MAX } from './components/ContentReel';
import { OpenContent } from './components/OpenContent';

import { SearchInput } from './components/SearchInput';

const Wrapper = styled.div`
  position: relative;
`;

const StyledPirateTheater = styled.div`
  margin-bottom: 5rem;
`;

const SectionLabel = styled(animated(Heading1))`
  position: absolute;
  top: 0;
  font-size: 24rem;
`;

const ContentSection = styled(animated.section)`
  width: 100vw;
  min-height: 52rem;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2rem;

  > :first-child {
    padding-left: 5rem;
  }
`;

const search = (arr: string[], str: string) =>
  arr
    .filter(v => v.toLowerCase().includes(str.toLowerCase()))
    .sort((a, b) => a.indexOf(str) - b.indexOf(str));

export type TContent = {
  type: 'movies' | 'series';
  name: string;
};

export const PirateTheater: FC = () => {
  const [openedContent, setOpenedContent] = useState<TContent | null>(null);

  const [searchString, setSearch] = useState('');
  const {
    movieList: moviesRaw,
    seriesList: seriesRaw,
    loading,
  } = useLoadContent();
  const { playing } = useContext(PlayContext);

  const spring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 0.1,
    },
    delay: 1000,
    config: config.molasses,
  });

  const movieList = search(moviesRaw, searchString);
  const seriesList = search(seriesRaw, searchString);

  const visibleMoviesAmount = Math.min(movieList.length, VISIBLE_CONTENT_MAX);

  return (
    <Wrapper>
      <StyledPirateTheater>
        <ContentSection>
          <SectionLabel style={spring}>MOVIES</SectionLabel>
          <ContentReel
            items={movieList.map((movie, i) => {
              const content: TContent = { type: 'movies', name: movie };
              return (
                <ContentPiece
                  key={`${movie}${i}${searchString}`}
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
          <SectionLabel style={spring}>SERIES</SectionLabel>
          <ContentReel
            items={seriesList.map((series, i) => {
              const content: TContent = { type: 'series', name: series };
              return (
                <ContentPiece
                  key={`${series}${i}${searchString}`}
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
      <SearchInput searchString={searchString} setSearch={setSearch} />
      <FadeToBlack visible={playing} />
    </Wrapper>
  );
};
