import React from "react";
import Header from "./Header";

function Hero() {
  return (
    <div className="bg-[#2C2652] h-[500px] border rounded-[40px]">
      <Header />
      <div className="text-center pt-28">
        <h1 className="text-white flex justify-center text-[56px] font-medium">
          <span>
            <img src="/crown.svg" alt="" />
          </span>
          Turn Your Wins Into Worlds, and <br /> Your Worlds Into NFTs!
        </h1>
        <p className="text-white text-lg mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="text-[#2C2652] bg-white rounded-full px-4 py-2 mt-4">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Hero;
