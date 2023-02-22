import React, { FC, useContext } from "react";
import styled from "styled-components";

import { Text } from "../../../../styles/typography";
import { PlayContext } from "../../../../providers/PlayProvider";
import { TSeriesSeasons } from "../../hooks/useLoadContentInfo";

import { Carousel } from "../../Carousel";
import { Hoverable } from "../../../Hoverable";
import { useCarouselControls } from "../../Carousel/useCarouselControls";
import { Episode } from "../Episode";

import arrow_button from "../../../../assets/arrow_button.svg";

export interface ISeasonDisplayProps {
  name: string;
  seasons: TSeriesSeasons;
  availableHeight: number;
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 5rem;
  margin-bottom: 1rem;

  > .alice-carousel {
    min-width: 12rem;
    max-width: 12rem;
  }
`;

const SeasonLabel = styled(Text)`
  max-width: max-content;
  margin: auto;
`;

const Arrow = styled(Hoverable)`
  cursor: pointer;
  opacity: 0.7;
`;

const StyledSeasonDisplay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.75rem;
  background-color: ${p => p.theme.background.tertiary};
`;

const Body = styled.div<{ $availableHeight: number }>`
  padding: 0 1.25rem;
  flex: 1;
  max-height: calc(${p => p.$availableHeight}px - 6rem);
  overflow: scroll;
  > :not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;

export const SeasonDisplay: FC<ISeasonDisplayProps> = ({
  name,
  seasons,
  availableHeight,
  ...restProps
}) => {
  const seasonAmount = Object.keys(seasons).length;
  const { play } = useContext(PlayContext);
  const { ref, prev, next, active, sliding } =
    useCarouselControls(seasonAmount);

  const activeSeason: keyof TSeriesSeasons = `s${active + 1}`;

  return (
    <StyledSeasonDisplay {...restProps}>
      <Header>
        <Arrow>
          <img
            onClick={prev}
            height={16}
            width={12}
            style={{ transform: "rotate3d(0, 0, 1, 180deg)" }}
            src={arrow_button}
            alt="left arrow"
          />
        </Arrow>
        <Carousel
          activeIndex={active}
          ref={ref}
          responsive={{ 0: { items: 1 } }}
          infinite={seasonAmount > 1}
          items={[...new Array(seasonAmount)].map((_, i) => (
            <SeasonLabel>{`Season ${i + 1}`}</SeasonLabel>
          ))}
        />
        <Arrow>
          <img
            onClick={next}
            height={16}
            width={12}
            src={arrow_button}
            alt="right arrow"
          />
        </Arrow>
      </Header>
      <Body $availableHeight={availableHeight}>
        {!sliding &&
          (seasons[activeSeason] || []).map((ep, i) => {
            return (
              <Episode
                key={ep}
                index={i}
                play={() => play(`series/${name}/${activeSeason}/${ep}`)}
              />
            );
          })}
      </Body>
    </StyledSeasonDisplay>
  );
};
