import { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

export const useCarouselControls = (items = 1) => {
  const [active, setActive] = useState(0);
  const ref = useRef<AliceCarousel | null>(null);

  const control = (dir: "left" | "right") => {
    if (ref && ref.current) {
      if (dir === "left") {
        ref.current.slidePrev();
        setActive(i => mod(i - 1, items));
      } else {
        ref.current.slideNext();
        setActive(i => mod(i + 1, items));
      }
    }
  };
  return {
    ref,
    prev: () => control("left"),
    next: () => control("right"),
    active,
  };
};
