"use client";

import { useSpring, animated } from "@react-spring/web";

export const Sample = () => {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 950 },
    config: {
      friction: 40,
      tension: 210,
    },
  });

  return (
    <>
      <animated.div
        style={{
          width: 80,
          height: 80,
          background: "#ff6d6d",
          borderRadius: 8,
          ...springs,
        }}
      />
    </>
  );
};
