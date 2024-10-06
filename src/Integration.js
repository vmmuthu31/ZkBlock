import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";
import game from "./game.json"
import { parseEther } from "viem";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const contract_address = "0xC20DeDbE8642b77EfDb4372915947c87b7a526bD";

const scroll_address = "0x284DAFC430a7AA660925fAf018918f3Ecd216CB8";

const manta_address = "0x064fDd34631E558dBD57EA80aaf4B02Da4b1fA19"


export const Mint = async (userMessage) => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

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


  const tx = await contract.calculateAIResult(
   "11","Hello",{value:ethers.utils.parseEther("0.0105"), 
    gasLimit:10000000
   }
  );

  await tx.wait();

  console.log("tx", tx);

  const eventFilter = contract.filters.promptRequest();
  console.log("event filter", eventFilter);
    // Define the block range
    const fromBlock = 0; // Start block number
    const toBlock = 'latest'; // End block number
  
    // Query past events
    const events = await contract.queryFilter(eventFilter, fromBlock, toBlock);
  console.log("events",events);
    // Process the events
    const ev =[]
    events.forEach(event => {
        console.log(event.args); // Access event arguments
        ev.push(event.args)
    });
  

  return ev;
};
export const Getty = async (val) => {
  // provider

  console.log("val", val);
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);



  const tx = await contract.requests(
   val
  );


  console.log("tx", tx);

  return tx;
};
export const Evy = async () => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

  contract.on("promptRequest", (requestId, sender, modelId,prompt) => {
    console.log("AIResultCalculated event detected:");
    console.log("Model ID:", modelId.toString());
    console.log("Request ID:", requestId.toString());
    console.log("Sender:", sender.toString());
    console.log("Prompt:", prompt.toString());
  });


  const eventFilter = contract.filters.promptRequest();
console.log("event filter", eventFilter);
  // Define the block range
  const fromBlock = 0; // Start block number
  const toBlock = 'latest'; // End block number

  // Query past events
  const events = await contract.queryFilter(eventFilter, fromBlock, toBlock);

  // Process the events
  events.forEach(event => {
      console.log(event.args); // Access event arguments
  });

};


export const UpdateGameData = async (player,gold,diamond,mapId, data) => {
    // provider
  
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);
  
    //signer
  
    const signer = provider.getSigner();
  
    console.log("signer", signer);
    // contract instance
  
    const contract = new ethers.Contract(scroll_address, game, signer);
  
    console.log("contract", contract);
  
  
  
    const tx = await contract.updatePlayerAndAddData(
     player,
     gold,diamond,mapId, data
    );
  
  
    console.log("tx", tx);
  
    return tx;
  };