import React from "react";
import CustomHeader from "../Components/Landing/CustomHeader";

function MarketPlace() {
  return (
    <div>
      <CustomHeader />
      <div>
        <p className="mt-10 font-bricolage text-[#312B55] text-2xl font-semibold text-center">
          Marketplace
        </p>
        <p className="text-center text-lg mt-3">
          Discover, trade, and sell worlds created by players just like you.
          Each world is <br /> a unique NFT with its own value and story.
        </p>
      </div>
      <div className="flex justify-center gap-20 mt-10 text-white">
        <div className="bg-[#2C2652]  p-2 rounded-lg">
          <img src="/marketplace.svg" alt="" className="w-full" />
          <div className="flex gap-1 pt-2 flex-col">
            <p className="text-[14px] text-opacity-[60%]">World Name</p>
            <p className=" font-serif text-xl">The Enchanted Realm</p>
            <p className="text-sm">by @marcusvetri</p>
            <p className="text-sm">Size: 400x400 Blocks</p>
            <p className="text-sm">Listed: 3 Days Ago</p>
            <p className="flex items-center gap-2">
              {" "}
              <span>
                <img src="/icons/bounty.svg" />
              </span>
              500 Coins or 2 Diamonds
            </p>{" "}
            <button className=" bg-white text-[#2C2652] h-12 rounded-xl py-2 ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="bg-[#2C2652]  p-2 rounded-lg">
          <img src="/marketplace.svg" alt="" className="w-full" />
          <div className="flex gap-1 pt-2 flex-col">
            <p className="text-[14px] text-opacity-[60%]">World Name</p>
            <p className=" font-serif text-xl">The Enchanted Realm</p>
            <p className="text-sm">by @marcusvetri</p>
            <p className="text-sm">Size: 400x400 Blocks</p>
            <p className="text-sm">Listed: 3 Days Ago</p>
            <p className="flex items-center gap-2">
              {" "}
              <span>
                <img src="/icons/bounty.svg" />
              </span>
              500 Coins or 2 Diamonds
            </p>{" "}
            <button className=" bg-white text-[#2C2652] h-12 rounded-xl py-2 ">
              Buy Now
            </button>
          </div>
        </div>
        <div className="bg-[#2C2652]  p-2 rounded-lg">
          <img src="/marketplace.svg" alt="" className="w-full" />
          <div className="flex gap-1 pt-2 flex-col">
            <p className="text-[14px] text-opacity-[60%]">World Name</p>
            <p className=" font-serif text-xl">The Enchanted Realm</p>
            <p className="text-sm">by @marcusvetri</p>
            <p className="text-sm">Size: 400x400 Blocks</p>
            <p className="text-sm">Listed: 3 Days Ago</p>
            <p className="flex items-center gap-2">
              {" "}
              <span>
                <img src="/icons/bounty.svg" />
              </span>
              500 Coins or 2 Diamonds
            </p>
            <button className=" bg-white text-[#2C2652] rounded-xl h-12 py-2 ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPlace;
