import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  scrollSepolia,
  arbitrumSepolia,
  mantaSepoliaTestnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import WorldIDconnect from "./WorldIDConnext";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "zkblock",
  projectId: "YOUR_PROJECT_ID",
  chains: [mantaSepoliaTestnet, scrollSepolia, arbitrumSepolia],
  ssr: true,
});

function Header() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="bg-[#FFFFFF] text-white py-4 px-8 font-bricolage bg-opacity-[9%]">
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
                <WorldIDconnect />
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Header;
