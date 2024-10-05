import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-[#2C2652] font-bricolage text-white  border rounded-[40px]">
      <Header />
      <div className=" bg-scale-in pb-20 bg-cover mt-16">
        <div className="text-center pt-28">
          <h1 className="text-white flex justify-center text-[56px] font-medium">
            <span>
              <img src="/crown.svg" alt="" />
            </span>
            Turn Your Wins Into Worlds, and <br /> Your Worlds Into NFTs!
          </h1>
          <p className="text-white italic text-lg mt-4">
            Step into a universe where games reward you <br /> with coins and
            diamonds. Use them to build <br /> your world and sell it as an NFT.
          </p>
          <Link to="/lobby">
            <button className="text-[#3C375F] bg-[#F7F6FF] font-serif font-semibold rounded-lg px-10 py-3 text-xl mt-8">
              Play Now!
            </button>
          </Link>
        </div>
        <div className="flex  gap-6 pt-10 justify-center">
          <div className="flex gap-2 items-center">
            <img src="/icons/game.svg" alt="" className="w-full " />
            <p className=" whitespace-nowrap">Play Mini Games</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/icons/crown.svg" alt="" className="w-full " />
            <p className=" whitespace-nowrap">Earn Coins & Diamonds</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/icons/map.svg" alt="" className="w-full " />
            <p className=" whitespace-nowrap">Build Your World</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/icons/card.svg" alt="" className="w-full " />
            <p className=" whitespace-nowrap">Sell as NFT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
