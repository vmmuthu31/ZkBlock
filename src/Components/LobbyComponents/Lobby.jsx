import { AccumulativeShadows, Html, RandomizedLight, Text3D, useFont } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { Suspense, useMemo, useRef } from "react";
import { LobbyAvatar } from "./LobbyAvatar";
import { Skyscraper } from "./Skyscraper";
import { mapAtom, roomIDAtom, roomsAtom, socket } from "./SocketManager";
import { Tablet } from "./Tablet";
import { avatarUrlAtom } from "./UI";
import axios from "axios";
import { ethers } from "ethers"; // Import ethers.js

let firstLoad = true;
export const Lobby = () => {
  const [rooms] = useAtom(roomsAtom);
  const [avatarUrl] = useAtom(avatarUrlAtom);
  const [_roomID, setRoomID] = useAtom(roomIDAtom);
  const [_map, setMap] = useAtom(mapAtom);
  const joinRoom = (roomId) => {
    socket.emit("joinRoom", roomId, { avatarUrl });
    setMap(null);
    setRoomID(roomId);
  };
  const [coins, setCoins] = useState({ gold_coins: 0, diamonds: 0 });
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(""); // State for wallet address

  const worldId = "world_1"; // Example world ID
  const playerId = "player_123"; // Example player ID

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getOrCreateCoins/${playerId}`);
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    // Check if the user is already connected to a wallet
    checkIfWalletIsConnected();
  }, [playerId]);

  // Function to check if the wallet is already connected
  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]); // Set the connected wallet address
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const isMobile = window.innerWidth < 1024;

  const tablet = useRef();
  const goldenRatio = Math.min(1, window.innerWidth / 1600);

  const accumulativeShadows = useMemo(
    () => (
      <AccumulativeShadows
        temporal
        frames={30}
        alphaTest={0.85}
        scale={50}
        position={[0, 0, 0]}
        color="pink"
      >
        <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -20]} />
        <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -20]} />
      </AccumulativeShadows>
    ),
    []
  );
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // ugly safari fix as transform position is buggy on it

  return (
    <group position-y={-1.5}>
      <motion.group
        ref={tablet}
        scale={isMobile ? 0.18 : 0.22}
        position-x={isMobile ? 0 : -0.25 * goldenRatio}
        position-z={0.5}
        initial={{
          y: firstLoad ? 0.5 : 1.5,
          rotateY: isSafari ? 0 : isMobile ? 0 : Math.PI / 8,
        }}
        animate={{
          y: isMobile ? 1.65 : 1.5,
        }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
        onAnimationComplete={() => {
          firstLoad = false;
        }}
      >
        <Tablet scale={0.03} rotation-x={Math.PI / 2} />
        <Html position={[0, 0.17, 0.11]} transform={!isSafari} center scale={0.121}>
          <div className="text-center space-y-4">
            <h1 className="text-3xl text-white font-bold">Player Information</h1>

            {/* Coins Display */}
            <div className="flex justify-center gap-8 items-center">
              <div className="p-4 bg-yellow-400 text-black rounded-lg shadow-lg">
                <p className="text-xl font-semibold">Gold Coins</p>
                <p className="text-2xl font-bold">{coins.gold_coins}</p>
              </div>
              <div className="p-4 bg-blue-400 text-black rounded-lg shadow-lg">
                <p className="text-xl font-semibold">Diamonds</p>
                <p className="text-2xl font-bold">{coins.diamonds}</p>
              </div>
            </div>

            {/* Wallet Address Display or Connect Wallet Button */}
            <div className="mt-4 p-4 bg-purple-600 text-white rounded-lg shadow-lg">
              <p className="text-xl font-semibold">Wallet Address</p>
              {walletAddress ? (
                <p className="text-lg font-mono truncate">{walletAddress}</p>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {/* Rooms Section */}
          <div
            className={`${
              isSafari ? "w-[310px] h-[416px] lg:w-[390px] lg:h-[514px]" : "w-[390px] h-[514px]"
            } max-w-full overflow-y-auto p-5 place-items-center pointer-events-none select-none`}
          >
            <div className="w-full h-[300px] overflow-y-auto flex flex-col space-y-2">
              <h1 className="text-center text-white text-2xl font-bold">
                WELCOME TO
                <br />
                ZK Block 🦄
              </h1>
              <p className="text-center text-white">Please select a room to relax or Build ⚒️</p>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                  onClick={() => joinRoom(room.id)}
                >
                  <p className="text-uppercase font-bold text-lg">{room.name}</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${room.nbCharacters > 0 ? "bg-green-500" : "bg-orange-500"}`}
                    ></div>
                    {room.nbCharacters} people in this room
                  </div>
                </div>
              ))}
              <a href="/xox">
                <div className="p-4 rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto">
                  <p className="text-uppercase font-bold text-lg">Tik Tic Toc</p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    Ai in this room
                  </div>
                </div>
              </a>
              <div className="p-4 rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto">
                <p className="text-uppercase font-bold text-lg">Marketplace 〽️💹</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  Buy and sell with ease on our marketplace
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto">
                <p className="text-uppercase font-bold text-lg">Coming Soon !!</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Keep Playing 🙂
                </div>
              </div>
            </div>
          </div>
        </Html>
      </motion.group>

      <group position-z={-8} rotation-y={Math.PI / 6}>
        <Text3D
          font={"fonts/Inter_Bold.json"}
          position-z={1}
          size={0.3}
          position-x={-3}
          castShadow
          rotation-y={Math.PI / 8}
          bevelEnabled
          bevelThickness={0.005}
          letterSpacing={0.012}
        >
          Zk
          <meshStandardMaterial color="white" />
        </Text3D>

        <Text3D
          font={"fonts/Inter_Bold.json"}
          position-z={2.5}
          size={0.3}
          position-x={-3}
          castShadow
          rotation-y={Math.PI / 8}
          bevelEnabled
          bevelThickness={0.005}
          letterSpacing={0.012}
        >
          Block
          <meshStandardMaterial color="white" />
        </Text3D>
        <Skyscraper scale={1.32} />
        <Skyscraper scale={1} position-x={-3} position-z={-1} />
        <Skyscraper scale={0.8} position-x={3} position-z={-0.5} />
      </group>
      {accumulativeShadows}
      <Suspense>
        <LobbyAvatar
          position-z={-1}
          position-x={0.5 * goldenRatio}
          position-y={isMobile ? -0.4 : 0}
          rotation-y={-Math.PI / 8}
        />
      </Suspense>
    </group>
  );
};

useFont.preload("/fonts/Inter_Bold.json");
