


import { InfiniteHeroParalax } from "@/components/infinite-hero-parallax";


export default function Home() {
  const products = [
  {
    title: "Flutter",
    link: "https://flutter.dev",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/flutter.png",
  },
  {
    title: "FlutterFlow",
    link: "https://flutterflow.io",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/flutterflow.jpg",
  },
  {
    title: "Nextjs",
    link: "https://nextjs.org",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/nextjs.jpg",
  },
 
  {
    title: "React",
    link: "https://react.dev",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/React.jpg",
  },
  {
    title: "Typescript",
    link: "https://www.typescriptlang.org",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/TypeScript-Courses.jpeg",
  },
  {
    title: "Javascript",
    link: "https://www.javascript.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/javascript.jpg",
  },
 
  
  {
    title: "Express JS",
    link: "https://expressjs.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/express.png",
  },
  {
    title: "Node JS",
    link: "https://nodejs.org/en",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/nodejs.jpeg",
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/tailwind.jpg",
  },
  {
    title: "Python",
    link: "https://www.python.org",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/python.jpg",
  },
  {
    title: "Clerk Authentication",
    link: "https://clerk.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/integration-stack/clerk.png",
  },
 
  {
    title: "Convex",
    link: "https://www.convex.dev",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/convex.png",
  },
  {
    title: "Firebase",
    link: "https://firebase.google.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/firebase.jpg",
  },
  {
    title: "Bunny CDN",
    link: "https://bunny.net",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/bunnynet-logo-blog.png",
  },
  {
    title: "Mongo DB",
    link: "https://www.mongodb.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/mongodb.png",
  },

  //example extras
  {
    title: "Flutter",
    link: "https://flutter.dev",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/flutter.png",
  },
  {
    title: "FlutterFlow",
    link: "https://flutterflow.io",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/flutterflow.jpg",
  },
  {
    title: "Nextjs",
    link: "https://nextjs.org",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/nextjs.jpg",
  },
 
  {
    title: "React",
    link: "https://react.dev",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/React.jpg",
  },
  {
    title: "Typescript",
    link: "https://www.typescriptlang.org",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/TypeScript-Courses.jpeg",
  },
  {
    title: "Javascript",
    link: "https://www.javascript.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/javascript.jpg",
  },
  {
    title: "Express JS",
    link: "https://expressjs.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/express.png",
  },
  {
    title: "Node JS",
    link: "https://nodejs.org/en",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/nodejs.jpeg",
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com",
    thumbnail:
      "https://main-ghost-coding.b-cdn.net/ghost-coding/tailwind.jpg",
  },
  
];
  return (
    
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <InfiniteHeroParalax products={products} />
      </main>
      
    
  );
}
