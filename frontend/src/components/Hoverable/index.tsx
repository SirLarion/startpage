import React, { FC, useState } from "react";
import { animated, useSpring } from "react-spring";

export const Hoverable: FC<{ scaleFactor?: number }> = ({
  scaleFactor = 1.3,
  children,
  ...restProps
}) => {
  const [hover, setHover] = useState(false);
  const spring = useSpring({
    transform: hover
      ? `scale3d(${scaleFactor}, ${scaleFactor}, 1)`
      : `scale3d(1, 1, 1)`,
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
