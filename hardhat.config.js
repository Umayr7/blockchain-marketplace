require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};