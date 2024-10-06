import React from "react";
import Hero from "../Components/Landing/Hero";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[#EFFAFF] font-bricolage p-5 min-h-screen pb-5">
      <Hero />
      <div>
        <p
          id="works"
          className="text-[#312B55] font-bold text-3xl text-center mt-20"
        >
          How It Works:Build, Play and Earn
        </p>
        <p className="text-center px-80 pt-4">
          Discover how to play and build in Zkblock. Win coins and diamonds
          through mini-games, use them to buy blocks and land, and create your
          own world.
        </p>
      </div>
      <div className="mt-10 flex justify-center gap-10 xl:flex-row flex-col">
        <img src="/list1.svg" alt="" className="w-full " />
        <img src="/list2.svg" alt="" className="w-full " />
        <img src="/list3.svg" alt="" className="w-full " />
      </div>
      <div className="flex justify-center  ">
        <Link to="/lobby">
          <button className="bg-[#443E65] mt-12 px-5 py-3 rounded-lg text-[#ECE9FF]">
            Start Building{" "}
          </button>
        </Link>
        <img src="/crownright.svg" alt="" />
      </div>

      <div className="flex items-center justify-center mt-8">
        <div className="flex justify-between flex-col gap-10">
          <p className="text-[#312B55] text-[36px] font-bold">
            Trade, Buy, and Sell <br /> in the Marketplace.
          </p>
          <p className="w-[400px]">
            Explore the zkblock marketplace where your creativity turns into
            real value. Trade your custom-built worlds as NFTs, buy exclusive
            upgrades, or acquire limited-time items. Whether you're looking to
            expand your empire or find rare collectibles, the marketplace is
            where builders meet traders.{" "}
          </p>
          <div>
            <Link to="/marketplace">
              <button className="bg-[#443E65] px-5 py-3 rounded-lg text-[#ECE9FF]">
                Explore the Marketplace
              </button>
            </Link>
          </div>
        </div>
        <img src="/human.svg" alt="" className="w-1/2" />
      </div>
      <div className="flex items-center gap-20 justify-center mt-10">
        <img src="/block.svg" alt="" className="w-1/2" />
        <div className="flex justify-between flex-col gap-10">
          <p className="text-[#312B55] text-[36px] font-bold">
            Start Small, Build <br /> Big, Earn More!
          </p>
          <p className="w-[450px]">
            Win coins and diamonds, build your own world, and turn your
            creations into valuable NFTs. Join a vibrant community where play
            meets profit, and creativity knows no bounds.
          </p>
          <div>
            <Link to="/lobby">
              <button className="bg-[#443E65] px-5 py-3 rounded-lg text-[#ECE9FF]">
                Start Creating Now{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="border border-t-[#443E65] border-opacity-[60%] mx-20 mt-7 "></div>
      <div className=" flex justify-between mx-20 mt-5">
        <p className="text-[#443E65] text-2xl">ZkBlock</p>
        <div className="flex  gap-6  justify-center">
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
        <div className="flex gap-5">
          <img src="/icons/twitter.svg" alt="logo" className="h-[30px]" />
          <img src="/icons/linkedin.svg" alt="logo" className="h-[30px]" />
        </div>
      </div>
    </div>
  );
}

export default Home;
