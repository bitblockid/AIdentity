const Web3 = require("web3");
const contract = require("./build/contracts/OpenAIDRegistry.json");

async function registerModel() {
    const web3 = new Web3("http://localhost:8545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];
    const registry = new web3.eth.Contract(contract.abi, deployedNetwork.address);

    const accounts = await web3.eth.getAccounts();
    await registry.methods.registerModel("model1", "attributes").send({ from: accounts[0] });

    console.log("Model registered!");
}

registerModel();
