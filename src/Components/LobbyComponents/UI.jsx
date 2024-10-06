import { atom, useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { motion } from "framer-motion";
import { roomItemsAtom } from "./Room";
import { roomIDAtom, socket } from "./SocketManager";
import { Getty, Mint } from "../../Integration";
import { ethers } from "ethers";
import axios from "axios";
import { MdOutlineAutorenew } from "react-icons/md";

// Create an atom for storing the avatar model URL
export const avatarUrlAtom = atom("/models/vitalik_buterin.glb"); // Default avatar model
export const buildModeAtom = atom(false);
export const shopModeAtom = atom(false);
export const draggedItemAtom = atom(null);
export const draggedItemRotationAtom = atom(0);

const PasswordInput = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkPassword = () => {
    socket.emit("passwordCheck", password);
  };

  useEffect(() => {
    socket.on("passwordCheckSuccess", () => {
      onSuccess();
      onClose();
    });
    socket.on("passwordCheckFail", () => {
      setError("Wrong password");
    });
    return () => {
      socket.off("passwordCheckSuccess");
      socket.off("passwordCheckFail");
    };
  });

  return (
    <div className="fixed z-10 grid place-items-center w-full h-full top-0 left-0">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-4 z-10">
        <p className="text-lg font-bold">Password</p>
        <input
          autoFocus
          type="text"
          className="border rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="space-y-2 mt-2">
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 flex-1 w-full"
            onClick={checkPassword}
          >
            Enter
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export const UI = () => {
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);
  const [shopMode, setShopMode] = useAtom(shopModeAtom);
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [draggedItemRotation, setDraggedItemRotation] = useAtom(
    draggedItemRotationAtom
  );
  const [_roomItems, setRoomItems] = useAtom(roomItemsAtom);
  const [passwordMode, setPasswordMode] = useState(false);
  const [avatarMode, setAvatarMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useAtom(avatarUrlAtom); // Access and update the avatar URL
  const [roomID, setRoomID] = useAtom(roomIDAtom);
  const [passwordCorrectForRoom, setPasswordCorrectForRoom] = useState(false);
  const [coins, setCoins] = useState({ gold_coins: 0, diamonds: 0 });

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setRoomID(null);
    setBuildMode(false);
    setShopMode(false);
  };

  useEffect(() => {
    setPasswordCorrectForRoom(false);
  }, [roomID]);

  const fetchCoins = async () => {
    try {
      const playerId = localStorage.getItem("address");
      const response = await axios.get(
        `https://api.zkblock.xyz/api/getOrCreateCoins/${playerId}`
      );
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  const ref = useRef();
  const [chatMessage, setChatMessage] = useState("");
  const sendChatMessage = () => {
    if (chatMessage.length > 0) {
      socket.emit("chatMessage", chatMessage);
      setChatMessage("");
    }
  };

  // Menu state to toggle character selection UI
  const [menuOpen, setMenuOpen] = useState(false);

  // Chatbot state
  const [chatBotOpen, setChatBotOpen] = useState(false); // For toggling chatbot open/close
  const [messages, setMessages] = useState([]); // To store chat messages
  const [userMessage, setUserMessage] = useState(""); // User's input message

  // Available characters for selection
  const characters = [
    { name: "Vitalik_Buterin", file: "/models/vitalik_buterin.glb" },
    { name: "Nagi", file: "/models/nagi.glb" },
    { name: "Thiru", file: "/models/thiru.glb" },
    // Add more models here as needed
  ];

  const [outputString, setOutputString] = useState("");

  const convertHexToString = (hex) => {
    try {
      // Remove the '0x' prefix if present
      const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;

      // Convert the hex string to a buffer (array of bytes)
      const bytesArray = ethers.utils.arrayify(`0x${cleanHex}`);

      // Convert the bytes array to a string
      const resultString = ethers.utils.toUtf8String(bytesArray);
      console.log("result string", resultString);
      // Set the output string in the state
      setOutputString(resultString);
      return resultString;
    } catch (error) {
      console.error("Error while converting hex to string:", error);
      setOutputString("Invalid hex input!");
    }
  };

  // Function to handle character selection
  const selectCharacter = (characterFile) => {
    setAvatarUrl(characterFile); // Update the avatar URL with the selected model
  };

  // Function to send message to chatbot
  const sendToChatBot = async () => {
    console.log("user message", userMessage);
    const res = await Mint(userMessage, coins);

    console.log("res", res);
    const len = res.length;
    console.log("res last", res[len - 1]);
    const last = res[len - 1];
    const reqID = last["requestId"];

    const reqIdInString = reqID.toString();

    console.log("req in string", reqIdInString);

    localStorage.setItem("reqId", reqIdInString);
    console.log("calling read");

    const answer = await Getty(reqIdInString);

    console.log("answer", answer);
    const valans = answer["output"];

    console.log("val", valans);
    console.log("val", valans.toString());
    const result = convertHexToString(answer);

    // if (userMessage.trim() !== "") {
    //   const newMessages = [
    //     ...messages,
    //     { sender: "user", text: userMessage },
    //     { sender: "bot", text: "Hello, how can I assist you?" }, // Simulated AI response
    //   ];
    //   setMessages(newMessages);
    //   setUserMessage(""); // Clear input field
    // }
  };

  const Refresh = async () => {
    try {
      const val = localStorage.getItem("reqId");
      const res = await Getty(val);
      const valans = res["output"];

      console.log("val", valans);
      console.log("val", valans.toString());
      const mes = convertHexToString(valans.toString());

      const newMessages = [
        ...messages,
        { sender: "user", text: userMessage },
        { sender: "bot", text: mes }, // Simulated AI response
      ];
      setMessages(newMessages);
      setUserMessage(""); // Clear input field
    } catch (error) {
      console.log("error in refresh");
    }
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className=""
      >
        {avatarMode && (
          <AvatarCreator
            subdomain="wawa-sensei-tutorial"
            className="fixed top-0  left-0  w-full h-full"
            onAvatarExported={(event) => {
              let newAvatarUrl =
                event.data.url === avatarUrl.split("?")[0]
                  ? event.data.url.split("?")[0] + "?" + new Date().getTime()
                  : event.data.url;
              newAvatarUrl +=
                (newAvatarUrl.includes("?") ? "&" : "?") +
                "meshlod=1&quality=medium";
              setAvatarUrl(newAvatarUrl);
              localStorage.setItem("avatarURL", newAvatarUrl);
              if (roomID) {
                socket.emit("characterAvatarUpdate", newAvatarUrl);
              }
              setAvatarMode(false);
            }}
          />
        )}

        {passwordMode && (
          <PasswordInput
            onClose={() => setPasswordMode(false)}
            onSuccess={() => {
              setBuildMode(true);
              setPasswordCorrectForRoom(true);
            }}
          />
        )}

        {/* Menu Button with Icons */}
        <div className="fixed top-4 left-4">
          <button
            className="bg-blue-500 p-2 rounded-full hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(!menuOpen)} // Toggle the menu visibility
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Show Dark Theme Popup with Horizontal Scrolling Character Selection */}
        {menuOpen && (
          <div className="fixed -right-60 top-0 transform -translate-x-1/2 bg-black bg-opacity-70 text-white rounded-lg shadow-lg p-1 z-[9999] w-10/12 max-w-xl">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="text-red-500 text-lg"
                onClick={() => setMenuOpen(false)}
              >
                X
              </button>
            </div>

            {/* Horizontally Scrolling Character Selection */}
            <div className="overflow-x-auto z-[9999] flex space-x-4 p-4">
              {characters.map((character) => (
                <div
                  key={character.file}
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    avatarUrl === character.file
                      ? "border-blue-500"
                      : "border-gray-500"
                  }`}
                  onClick={() => selectCharacter(character.file)}
                >
                  <img
                    src={`/thumbnails/${character.name.toLowerCase()}.png`} // Assuming you have thumbnails for each model
                    alt={character.name}
                    className="w-32 h-32"
                  />
                  <p className="text-center mt-2">{character.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ChatBot Button */}
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-green-500 p-2 rounded-full hover:bg-green-700 transition"
            onClick={() => setChatBotOpen(!chatBotOpen)} // Toggle chatbot visibility
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h8m-4 4h4m-4-8h.01M4 8h.01M4 12h.01M4 16h.01"
              />
            </svg>
          </button>
        </div>

        {/* Chatbot UI */}
        {chatBotOpen && (
          <div className="fixed bottom-0 right-4 bg-white text-black rounded-lg shadow-lg w-80 h-96 flex flex-col p-4 z-30">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">AI ChatBot</h2>
              <button
                className="text-red-500"
                onClick={() => setChatBotOpen(false)} // Close the chatbot
              >
                X
              </button>
            </div>
            <div className="flex-1 overflow-y-auto my-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border p-2 rounded-lg"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendToChatBot();
                }}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={sendToChatBot}
              >
                Send
              </button>
              <MdOutlineAutorenew
                className="bg-blue-500 w-10 h-10 text-white p-2 rounded-lg"
                onClick={Refresh}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="fixed inset-4 flex items-center justify-end flex-col pointer-events-none select-none">
          {roomID && !shopMode && !buildMode && (
            <div className="pointer-events-auto p-4 flex items-center space-x-4">
              <input
                type="text"
                className="w-56 border px-5 p-4 h-full rounded-full"
                placeholder="Message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChatMessage();
                  }
                }}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button
                className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                onClick={sendChatMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-center space-x-4 pointer-events-auto">
            {roomID && !shopMode && !buildMode && (
              <button
                className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
                onClick={leaveRoom}
              >
                LOBBY
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
