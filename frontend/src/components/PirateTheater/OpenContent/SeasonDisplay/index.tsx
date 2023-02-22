import React, { FC } from "react";
import styled from "styled-components";

import { Text } from "../../../../styles/typography";
import { TSeriesSeasons } from "../../hooks/useLoadContentInfo";

import arrow_button from "../../../../assets/arrow_button.svg";
import { Carousel } from "../../Carousel";
import { Hoverable } from "../../../Hoverable";
import { useCarouselControls } from "../../Carousel/useCarouselControls";

export interface ISeasonDisplayProps {
  seasons: TSeriesSeasons;
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 5rem;

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
  margin: 1.5rem 0;
`;

export const SeasonDisplay: FC<ISeasonDisplayProps> = ({
  seasons,
  ...restProps
}) => {
  const seasonAmount = Object.keys(seasons).length;
  const { ref, prev, next, active } = useCarouselControls(seasonAmount);

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
      {(seasons[`s${active + 1}`] || []).map((_, i) => (
        <Text>{i}</Text>
      ))}
    </StyledSeasonDisplay>
  );
};
