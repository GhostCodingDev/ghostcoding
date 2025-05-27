"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

// CarouselRow: watches its last card with IntersectionObserver and re-queues it
function CarouselRow({
  items,
  direction,
  scrollTranslate,
  duration,
}: {
  items: Product[];
  direction: 1 | -1;
  scrollTranslate: MotionValue<number>;
  duration: number;
}) {
  const [queue, setQueue] = useState<Product[]>(items);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // When the last card is fully in view, move it to the end of the queue
  useEffect(() => {
    const node = lastItemRef.current;
    const root = containerRef.current;
    if (!node || !root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQueue((q) => {
            const [first, ...rest] = q;
            return [...rest, first];
          });
        }
      },
      { root, threshold: 1.0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [queue]);

  return (
    <div ref={containerRef} className="w-screen overflow-hidden mb-20">
      <motion.div
        style={{ x: scrollTranslate }}
        className="flex whitespace-nowrap items-center"
        animate={{
          // slide the row by one card width (100% / queue.length)
          x:
            direction === 1
              ? ["0%", `-${100 / queue.length}%`]
              : [`-${100 / queue.length}%`, "0%"],
        }}
        transition={{
          ease: "linear",
          duration,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {queue.map((product, i) => (
          <div
            key={`${product.title}-${i}`}
            ref={i === queue.length - 1 ? lastItemRef : null}
            className="inline-block mr-5"
          >
            <ProductCard product={product} translate={scrollTranslate} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export const MovingHeroParalax = ({
  products,
}: {
  products: Product[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax springs
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  // split into 3 roughly equal rows
  const total = products.length;
  const base = Math.floor(total / 3);
  const rem = total % 3;
  const counts = [
    base + (rem > 0 ? 1 : 0),
    base + (rem > 1 ? 1 : 0),
    base,
  ];
  let idxStart = 0;

  // control individual row speeds
  const durations = [2, 1, 2];

  return (
    <div
      ref={ref}
      className="h-[300vh] w-screen py-40 overflow-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {counts.map((count, idx) => {
          const slice = products.slice(idxStart, idxStart + count);
          idxStart += count;
          const dir = idx % 2 === 0 ? 1 : -1;
          const scrollTrans = dir === 1 ? translateX : translateXReverse;

          return (
            <CarouselRow
              key={idx}
              items={slice}
              direction={dir}
              scrollTranslate={scrollTrans}
              duration={durations[idx]}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export const Header = () => (
  <div className="max-w-screen relative mx-auto py-20 md:py-40 px-4 w-full flex flex-col items-center text-center">
    <h1 className="text-2xl md:text-7xl font-bold text-white">
      The only coder<br />
      you need
    </h1>
    <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
      We build beautiful products with the latest technologies and frameworks.
      <br />
      We are a team of passionate freelancers and designers that love to build
      <br />
      amazing products. Check out some of our Tech Stack below ↓
    </p>
  </div>
);

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => (
  <motion.a
    href={product.link}
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    className="group h-96 w-[30rem] inline-block relative shrink-0"
  >
    <div className="rounded-2xl overflow-hidden h-full w-full shadow-lg">
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
      />
    </div>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-80 bg-black" />
    <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 text-white">
      {product.title}
    </h2>
  </motion.a>
);
