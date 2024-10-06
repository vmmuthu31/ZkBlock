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

export const Mint = async (userMessage, coins) => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

//   let gasLimit;
//   const fee = await contract.estimateFee("11");
//   console.log("fee",fee.toString());
//   try {
//     gasLimit = await contract.estimateGas.calculateAIResult(
//       "11",
//       JSON.stringify({
//           charactername: "thiru",
//           token: "1000",
//           items: { chair: "10", cup: "5" }
//       }),
//       { value: ethers.utils.parseEther("0.01") }
//   );
//   console.log("Estimated Gas Limit: ", gasLimit.toString());
//  const fee = await contract.estimateFee("11");
//  console.log("fee",fee.toString());
//     console.log("Estimated Gas Limit: ", gasLimit.toString());
//   } catch (err) {
//     console.error("Error estimating gas: ", err);
//     // Fallback to a manual gas limit if estimation fails
//     gasLimit = ethers.BigNumber.from("500000"); // Set a fallback value
//   }

const prompt = `Game Description : Build Worlds: Use coins and diamonds to buy blocks and land, and construct unique worlds.,
no of blocks: 5,
names:[graph, scroll, ORA, grass,Manta],
Each block required 200 coins to purchase them
`

  const tx = await contract.calculateAIResult(
   "11",`User Query: ${userMessage} , I have:  Gold:${coins.gold_coins}, Diamond:${coins.diamond},  game Description: ${prompt}, if user asks anything regrding this data then only give them these data else just talk in general `,{value:ethers.utils.parseEther("0.0105"), 
    gasLimit:10000000
   }
  );

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

  const contractaddress = CONTRACT_ADDRESSES[network.chainId];
  const contract = new ethers.Contract(contractaddress, game, signer);

  const tx = await contract.updatePlayerAndAddData(
    player,
    gold,
    diamond,
    mapId,
    data
  );

  return tx;
};
