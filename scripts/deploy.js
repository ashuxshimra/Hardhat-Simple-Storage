const { ethers } = require("hardhat"); //grabbing ethers from hardhat
const { run } = require("hardhat"); //run is used to run any tasks of hardhat like verify , coverage, etc etc
//asyc main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    //now making this object so as to deploy , and grabbing the contract factory-this bascially gets the compiled sc code ,wallet , to which n.w
    "SimpleStorage" //name of the compiled contract u need to deploy. hardehat ether will know that compiled contract is in artifacts folder
  );
  console.log("Deploying contract .....");
  const simpleStorage = await SimpleStorageFactory.deploy();

  // await SimpleStorage.deployed()//further waiting for deployed contract using await
  console.log(`Deployed to address :${simpleStorage.target}`);
  // what happens when we deploy to our hardhat network?
  // if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
  //   //that is it has to be of any reattestnet chainid and api should exist then only call verify function
  //   console.log("Waiting for block confirmations...");
  //   await simpleStorage.deployTransaction.wait(6);
  //   await verify(simpleStorage.target, []);
  // }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);
  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}
// u can also verify the contract programatically as done but the command as done does it automatical;ly
// const verify = async (contractAddress, args) => {
//   console.log("Verifying contract...")
//   try {
//     await run("verify:verify", { //the verify task takes two parameters so defuining it
//       address: contractAddress,
//       constructorArguments: args,
//     })
//   } catch (e) {
//     if (e.message.toLowerCase().includes("already verified")) {
//       console.log("Already Verified!")
//     } else {
//       console.log(e)
//     }
//   }
// }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
