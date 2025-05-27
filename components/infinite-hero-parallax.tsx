"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export const InfiniteMovingCards = ({
  items,
  translate,
  direction = "left",
  speed,
  pauseOnHover = true,
  className,
}: {
  items: Product[];
  translate: MotionValue<number>;
  direction?: "left" | "right";
  speed: string;
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
 
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
 
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
 
      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <motion.a
            key={item.title}
            href={item.link}
            style={{ x: translate }}
            whileHover={{ y: -20 }}
            className="group 2xl:h-96 xl:h-96 md:h-72 h-52 lg:h-96 xl:w-[30rem] 2xl:w-[30rem] lg:w-[30rem] md:w-[20rem] w-[20rem] inline-block relative shrink-0"
          >
            <div className="rounded-2xl overflow-hidden h-full w-full shadow-lg">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0"
              />
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-80 bg-black" />
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 text-white">
              {item.title}
            </h2>
          </motion.a>
        ))}
      </ul>
    </div>
  );
};

export const InfiniteHeroParalax = ({ products }: { products: Product[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax springs
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);

  const total = products.length;
  const base = Math.floor(total / 3);
const counts = [base, base, total - base * 2];
 
  let idxStart = 0;

  return (
    <div
      ref={ref}
      className="h-[300vh] w-screen 2xl:py-40 xl:py-40 lg:py-40 md:py-20 py-10 overflow-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {counts.map((count, idx) => {
          const slice = products.slice(idxStart, idxStart + count);
          idxStart += count;
          const dir = idx % 2 === 0 ? "left" : "right";
          const scrollTrans = dir === "left" ? translateX : translateXReverse;
          const speed = idx === 1 ? "slow" : "normal";

          return (
            <InfiniteMovingCards
              key={idx}
              items={slice}
              translate={scrollTrans}
              direction={dir}
              speed={speed}
              className="2xl:mb-6 xl:mb-6 lg:mb-6 md:mb-4 mb-2"
              pauseOnHover={true}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export const Header = () => (
  <div className="max-w-screen mx-auto py-20 md:py-40 px-4 w-full flex flex-col items-center text-center">
    <h1 className="text-2xl md:text-7xl font-bold text-white">
      The only coder<br /> you need
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


// Add the below css classes to your globals.css file
{/*
    @theme inline {
  --animate-scroll: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;

  @keyframes scroll {
    to {
      transform: translate(calc(-50% - 0.5rem));
    }
  }
}
     */}