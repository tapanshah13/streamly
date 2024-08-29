"use client";

import React, { useRef, MutableRefObject } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Define the props expected by the Player component
interface PlayerProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

// Dynamically import the Player component with proper casting
const Player = dynamic(() =>
  import("@lottiefiles/react-lottie-player").then(
    (mod) => mod.default as unknown as React.ForwardRefExoticComponent<PlayerProps & React.RefAttributes<unknown>>
  ), {
  ssr: false,
});

const NotFound = () => {
  const playerRef = useRef<MutableRefObject<null>>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E0E3EB] dark:bg-[#10141E] w-[90%] mx-auto">
      <h1 className="text-4xl text-white sm:text-[48px] font-semibold mb-4">
        Oops! Page Not Found 🕵️‍♂️
      </h1>
      <p className="text-[15px] sm:text-[18px] font-light text-[#9CA3AF] mb-2 text-center">
        It seems you&apos;ve taken a wrong turn. The page you&apos;re looking for might have been moved, removed, or it&apos;s temporarily unavailable.
      </p>

      <div className="h-[300px] sm:h-[350px]">
        <Player
          src="https://lottie.host/0c8f383a-0668-465b-bb60-76ab47cae3ca/9EDnZblA3S.json"
          className="w-[500px] sm:w-[600px]"
          autoplay
          ref={playerRef}
          loop
        />
      </div>

      <p className="text-[15px] sm:text-[18px] font-light text-[#9CA3AF] mb-2 text-center">
        Return to our{" "}
        <Link href="/" className="text-white hover:underline" aria-label="Home">
          Home Page
        </Link>{" "}
        to explore from the beginning.
      </p>
    </div>
  );
};

export default NotFound;
