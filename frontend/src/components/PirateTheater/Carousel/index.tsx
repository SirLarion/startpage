import React, { forwardRef } from "react";
import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";

type CarouselProps = React.ComponentProps<typeof AliceCarousel>;

export const Carousel = forwardRef<AliceCarousel, CarouselProps>(
  ({ infinite = true, ...props }, ref) => (
    <AliceCarousel
      ref={ref}
      infinite={infinite}
      disableDotsControls
      disableButtonsControls
      preservePosition
      {...props}
    />
  )
);
