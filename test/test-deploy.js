// one of the most used rhing of hardhat is running tests for our sc , its because we want ti check whether our contract does what we wanted it to do , its the first line of defence when it comes to security
// testing is done by hardhat and mocha a js framweork to perform tests
const { ethers } = require("hardhat");
const { assert } = require("chai"); //this is used to compare the values for test and is provided by chai package which comes with hardhat
describe("SimpleStorage", function () {
  //this describe is used to describe for which sc test needs to be done and that now in function how the test will be performed , also this  descrivbe is provided by mocha framework
  //for test there are 2 things , beforeEach and it() ,
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    //this before each is used to specify what all things needs to be done , before actually running each of it()- these define the code for test , hence before perofirmiung test for a contract we first need to deploy it , hence in this deploy the contract as done
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    // these simpleStorageFactory and simpleStorage both need to be access by it() where we wirte our test so make it appear global variable
  });
  // now in it args , we specify what the test needs to look like and then we perform test
  it("Should start with a favorite number of 0", async function () {
    //   it.only("Should start with a favorite number of 0", async function () { and then done yarn hardhat test then only this specific test will run
    const currentValue = await simpleStorage.retrieve(); //this shouydk give 0
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  }); //now run yarn hardhat test and see the test result
  //lets define another test for this contract
  //   bascially in test we are accessing thy deployed contract and comparuing the expceted result
  it("Should update when we call store function", async function () {
    const transactionResponse = await simpleStorage.store("7");
    await transactionResponse.wait(1);
    const expectedValue = "7";
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
