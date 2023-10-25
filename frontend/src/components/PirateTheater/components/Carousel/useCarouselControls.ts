import { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';

import { ANIMATION_DURATION } from '.';

const DELAY_FOR_BUG = 20;

export const useCarouselControls = () => {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<AliceCarousel | null>(null);

  const control = (dir: 'left' | 'right') => {
    if (ref && ref.current) {
      if (dir === 'left') {
        ref.current.slidePrev();
      } else {
        ref.current.slideNext();
      }
      setTimeout(() => {
        setActive(ref?.current?.state.activeIndex || 0);
      }, ANIMATION_DURATION + DELAY_FOR_BUG);
    }
    if (listRef && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollTo({ top: 0 });
      }, ANIMATION_DURATION + DELAY_FOR_BUG);
    }
  };
  return {
    ref,
    listRef,
    prev: () => control('left'),
    next: () => control('right'),
    active,
  };
};
