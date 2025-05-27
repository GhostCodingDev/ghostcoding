'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';
import { ThreeDMarquee } from '@/components/aceternity/3dmarquee';

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

/**
 * MarqueeHeroParallax replicates the original scroll behavior:
 * 1. 3D marquee tilts into view.
 * 2. Marquee straightens and lifts to reveal header text.
 * 3. Marquee scrolls out horizontally underneath the header.
 */
const MarqueeHeroParallax: React.FC<{ products: Product[] }> = ({ products }) => {
  const marqueeImages = products.map((p) => p.thumbnail);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };

  // 1. Tilt marquee from 55°/–45° to flat over first 20% scroll
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [55, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-45, 0]),
    springConfig
  );

  // 2. Lift marquee up by 200px between 20–30% scroll to reveal header
  const translateY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.3], [0, -200]),
    springConfig
  );

  // 3. Scroll marquee out from 30–100% of scroll by viewport width
  const translateX = useSpring(
    useTransform(scrollYProgress, [0.3, 1], ['0%', '-100%']),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="w-screen h-[300vh] relative overflow-hidden antialiased [perspective:1000px]"
    >
      {/* 3D marquee layer */}
      <motion.div
        className="absolute inset-0 -z-50 w-screen h-screen overflow-hidden"
        style={{
          rotateX,
          rotateZ,
          translateY,
          transformOrigin: 'center',
        }}
      >
        <motion.div
          className="absolute inset-0 w-screen h-screen"
          style={{ x: translateX }}
        >
          <ThreeDMarquee images={marqueeImages} className="w-screen h-screen" />
        </motion.div>
      </motion.div>

      {/* Header overlay */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
          The only coder<br /> you need
        </h1>
        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-xl text-neutral-200">
          We build beautiful products with the latest technologies and frameworks. We are a team of passionate freelancers and designers that love to build amazing products.
        </p>
      </div>
    </div>
  );
};

export default MarqueeHeroParallax;
