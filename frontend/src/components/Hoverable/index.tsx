import React, { FC, ReactNode, useState } from "react";
import { animated, useSpring } from "react-spring";

export const Hoverable: FC<{ scaleFactor?: number, children?: ReactNode }> = ({
  scaleFactor = 1.3,
  children,
  ...restProps
}) => {
  const [hover, setHover] = useState(false);
  const spring = useSpring({
    transform: hover
      ? `scale3d(${scaleFactor}, ${scaleFactor}, 1) rotate3d(0, 0, 1, 0.05deg)`
      : `scale3d(1, 1, 1) rotate3d(0, 0, 1, 0.05deg)`,
  });
  return (
    <animated.div
      onClick={() =>
        setTimeout(() => {
          setHover(false);
        }, 50)
      }
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={spring}
      {...restProps}
    >
      {children}
    </animated.div>
  );
};
