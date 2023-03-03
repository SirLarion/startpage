import { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

import { ANIMATION_DURATION } from ".";

const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

export const useCarouselControls = (items: number) => {
  const [active, setActive] = useState(0);
  const [sliding, setSliding] = useState(false);
  const ref = useRef<AliceCarousel | null>(null);

  const control = (dir: "left" | "right") => {
    if (ref && ref.current) {
      if (dir === "left") {
        ref.current.slidePrev();
        setTimeout(() => {
          setActive((i) => mod(i - 1, items));
        }, ANIMATION_DURATION);
      } else {
        ref.current.slideNext();
        setTimeout(() => {
          setActive((i) => mod(i + 1, items));
        }, ANIMATION_DURATION);
      }
    }
  };
  return {
    ref,
    prev: () => control("left"),
    next: () => control("right"),
    active,
    sliding,
  };
};
