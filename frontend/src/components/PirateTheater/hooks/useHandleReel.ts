import { useRef } from "react";
import AliceCarousel from "react-alice-carousel";

export const useHandleReel = () => {
  const ref = useRef<AliceCarousel | null>(null);

  const rotate = (dir: "left" | "right") => {
    if (ref && ref.current) {
      if (dir === "left") {
        ref.current.slidePrev();
      } else {
        ref.current.slideNext();
      }
    }
  };
  return {
    ref,
    rotate,
  };
};
