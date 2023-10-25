import React, { forwardRef } from 'react';
import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';

export const ANIMATION_DURATION = 300;

type CarouselProps = React.ComponentProps<typeof AliceCarousel>;

export const Carousel = forwardRef<AliceCarousel, CarouselProps>(
  ({ infinite = true, ...props }, ref) => (
    <AliceCarousel
      ref={ref}
      infinite={infinite}
      animationDuration={ANIMATION_DURATION}
      disableDotsControls
      disableButtonsControls
      preservePosition
      {...props}
    />
  )
);
