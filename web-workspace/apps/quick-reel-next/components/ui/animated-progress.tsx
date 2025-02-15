"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useSpring, animated } from "@react-spring/web";
import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value: number;
};

const AnimatedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, value, ...props }, ref) => {
  const animatedStyle = useSpring({
    width: `${value}%`,
    config: { tension: 150, friction: 50 },
  });

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild style={{ width: "100%" }}>
        <animated.div className="h-full bg-primary" style={animatedStyle} />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
});
AnimatedProgress.displayName = ProgressPrimitive.Root.displayName;

export { AnimatedProgress };
