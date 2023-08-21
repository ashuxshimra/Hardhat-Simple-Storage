require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify"); //IMPORYINT the hardhat verify plugin tjhat we installed
require("hardhat-gas-reporter"); //importing so that we can run as yarn hardhat ,also when done yarn hardhat test , thye gas report will automaticalyy formed
// require("./tasks/block-number");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //  here u can set the default n/w's and also the list of n.w's where youy can deploy ur contract
  defaultNetwork: "hardhat",
  networks: {
    //we can also inculde the list of n.w's so in terminal when we can run and specify the n.w it will refer here
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111, //now in terminal u can do yarn run hardhat scripts/deploy.js --network sepolia , then the deploy script will run with sepolia netwrok to deploy
    },
    localhost: {
      //now when run yarn hardhat run .. --network localhost , its gonna use the acc from local host to fund the deployment and transactions
      url: "http://127.0.0.1:8545/", //got from yarn hardhat node
      // accounts is given in yarn hardhat node
      chainId: 31337, //this is chainid for hardhat , this localhost runs on harhdat chyain but is different from default hardhat network
    },
  },
  solidity: "0.8.19",
  etherscan: {
    //DEFINING THE ETHERSCAN APIN KEY HERE AFTER INSTALLING THE PLUGOIN OF VERIFY FROM HARDHAT ALSO , WE WANT TO VERIFY OUR CONTRACT LOCALLY FROM ETHERSCAN
    apiKey: process.env.ETHERSCAN_API_KEY, //then run this command and done verification-> npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
  },
  gasReporter: {
    //after installoing the package of gas reporter , now by default it is not enabvled hence in order to use this gas reporter we need to do this,check documentation
    enabled: false,
    // lets further customise the gasReporter
    outputFile: "gas-repor.txt", //this will give report in separate txt file , also in gitigboire mention it
    currency: "USD", //for every function which costs a certain gas , that will be converted to USD by eth comparison since this is deplouyed in eth mainnet and to get this price realtime , use coinmarketcap and signin and get the api
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    noColors: true, //make sure to add this as it will arerange evertthing oganized in reports
    token: "MATIC", //IF U wish to see the repiort when contract deployed in other bc n.w's
  },
};
