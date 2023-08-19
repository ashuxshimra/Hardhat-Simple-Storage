const { task } = require("hardhat/config");
// here we are creating a custom task of hardhat
task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  //   below u have used a function which is anonymous and for making custom tasks we use this
  async (taskArgs, hre) => {
    //this hre is hardhat runtime environment and can access the ethers package which can give access to all the functions and tools as used here
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
  }
);
// also after this is done when done yarn hardhat , it doesnt show up in task list becauyse we havent imported in hardhat.config so do it and it'll come , geenrally we use scripts and so just know this
module.exports = {};
