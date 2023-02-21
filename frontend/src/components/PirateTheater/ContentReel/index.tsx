import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { useHandleReel } from "../hooks/useHandleReel";
import { RotateButton } from "../RotateButton";
import { hideScrollbar } from "../../../styles/common";

export const VISIBLE_CONTENT_MAX = 7;

export interface IContentReelProps {
  items: ReactNode[];
  loading: boolean;
}

const RotateRight = styled(RotateButton)`
  right: 0;
`;
const RotateLeft = styled(RotateButton)`
  left: 0;
  transform: rotate3d(0, 1, 0, 180deg);
`;

const StyledContentReel = styled.div`
  max-width: 100vw;
  min-height: 23rem;
  ${hideScrollbar}

  .alice-carousel__stage {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const BasicReel = styled.div`
  display: flex;
  gap: 1.7rem;
  margin-left: 5rem;
`;

export const ContentReel: FC<IContentReelProps> = ({ items, loading }) => {
  const { ref, rotate } = useHandleReel();
  const showCarousel = items.length > VISIBLE_CONTENT_MAX;
  return (
    <StyledContentReel>
      {!loading &&
        (showCarousel ? (
          <>
            <RotateLeft rotate={() => rotate("left")} />
            <RotateRight rotate={() => rotate("right")} />
            <AliceCarousel
              ref={ref}
              keyboardNavigation
              disableDotsControls
              disableButtonsControls
              infinite
              paddingLeft={80}
              paddingRight={80}
              responsive={{
                0: {
                  items: VISIBLE_CONTENT_MAX,
                },
              }}
              items={items}
            />
          </>
        ) : (
          <BasicReel>{items}</BasicReel>
        ))}
    </StyledContentReel>
  );
};