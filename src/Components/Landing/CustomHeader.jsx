import React from "react";
import { Link } from "react-router-dom";

function CustomHeader() {
  return (
    <div className="bg-[#2C2652] text-white py-4 px-8 font-bricolage  mx-5 mt-5 rounded-t-2xl">
      <div className="flex justify-between">
        <Link to="/">
          <div className="flex gap-3 items-center">
            <img src="/logo.svg" alt="logo" className="h-[50px]" />
            <h1 className="text-4xl font-bold  ">ZkBlock</h1>
          </div>
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/">
            <p>Home</p>
          </Link>
          <a href="#works">
            <p>How it works</p>
          </a>
          <Link to="/marketplace">
            {" "}
            <p>Marketplace</p>
          </Link>
          <button
            className="text-[#2C2652] bg-white rounded-full px-4 py-2"
            type="button"
          >
            View my World
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomHeader;
