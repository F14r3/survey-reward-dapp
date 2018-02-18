module.exports = {
  
  networks: {

    // Test RPC environment
    development: {
      host: "localhost",
      port: 8545,
      gas: 0xfffffffffff, //Maximum Gas
      gasPrice: 0x01, //Minimal Gas Price
      network_id: "*" //Listen to all networks
    }
  }
};
