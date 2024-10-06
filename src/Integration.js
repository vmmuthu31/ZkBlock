import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";
import game from "./game.json";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const CONTRACT_ADDRESSES = {
  3441006: "0x064fDd34631E558dBD57EA80aaf4B02Da4b1fA19", // manta testnet
  534351: "0x284DAFC430a7AA660925fAf018918f3Ecd216CB8", // scroll testnet
};
const contract_address = "0xC20DeDbE8642b77EfDb4372915947c87b7a526bD";
const scroll_address = "0x284DAFC430a7AA660925fAf018918f3Ecd216CB8";
const manta_address = "0x064fDd34631E558dBD57EA80aaf4B02Da4b1fA19";

export const Mint = async (userMessage) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);
  const tx = await contract.calculateAIResult("11", "Hello", {
    value: ethers.utils.parseEther("0.0105"),
    gasLimit: 10000000,
  });

  await tx.wait();
  const eventFilter = contract.filters.promptRequest();
  const fromBlock = 0;
  const toBlock = "latest";
  const events = await contract.queryFilter(eventFilter, fromBlock, toBlock);
  const ev = [];
  events.forEach((event) => {
    ev.push(event.args);
  });

  return ev;
};

export const Getty = async (val) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);
  const tx = await contract.requests(val);
  return tx;
};
export const Evy = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);
  contract.on("promptRequest", (requestId, sender, modelId, prompt) => {
    console.log("AIResultCalculated event detected:");
    console.log("Model ID:", modelId.toString());
    console.log("Request ID:", requestId.toString());
    console.log("Sender:", sender.toString());
    console.log("Prompt:", prompt.toString());
  });

  const eventFilter = contract.filters.promptRequest();
  const fromBlock = 0;
  const toBlock = "latest";

  const events = await contract.queryFilter(eventFilter, fromBlock, toBlock);
  events.forEach((event) => {
    console.log(event.args);
  });
};

export const UpdateGameData = async (player, gold, diamond, mapId, data) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  const contractAddress = CONTRACT_ADDRESSES[network.chainId];
  const contract = new ethers.Contract(contractAddress, game, signer);
  console.log(contractAddress);
  const PlayerAddress = "0x1234567890abcdef1234567890abcdef12345678";
  const GoldAmount = ethers.utils.parseUnits("10", 18);
  const DiamondAmount = ethers.utils.parseUnits("5", 18);
  const MapId = 12345;
  const Data = "Initial game data for player on map 12345";
  const tx = await contract.updatePlayerAndAddData(
    PlayerAddress,
    GoldAmount,
    DiamondAmount,
    MapId,
    Data
  );

  return tx;
};
