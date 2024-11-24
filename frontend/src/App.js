import React, { useState, useEffect } from "react";
import Web3 from "web3";
import OpenAIDRegistry from "./contracts/OpenAIDRegistry.json";

function App() {
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [modelId, setModelId] = useState("");
    const [attributes, setAttributes] = useState("");
    const [modelData, setModelData] = useState(null);

    useEffect(() => {
        loadWeb3();
    }, []);

    async function loadWeb3() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = OpenAIDRegistry.networks[networkId];
            const instance = new web3.eth.Contract(OpenAIDRegistry.abi, deployedNetwork.address);
            setContract(instance);
        } else {
            alert("Please install MetaMask to interact with this application.");
        }
    }

    async function registerModel() {
        if (contract && modelId && attributes) {
            await contract.methods.registerModel(modelId, attributes).send({ from: account });
            alert("Model registered successfully!");
        } else {
            alert("Please ensure all fields are filled and MetaMask is connected.");
        }
    }

    async function getModel() {
        if (contract && modelId) {
            const data = await contract.methods.getModel(modelId).call();
            setModelData(data);
        } else {
            alert("Please provide a model ID and ensure MetaMask is connected.");
        }
    }

    return (
        <div>
            <h1>OpenAID Frontend</h1>
            <p>Connected Account: {account}</p>
            <div>
                <h2>Register Model</h2>
                <input
                    type="text"
                    placeholder="Model ID"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Attributes"
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                />
                <button onClick={registerModel}>Register</button>
            </div>
            <div>
                <h2>Get Model</h2>
                <input
                    type="text"
                    placeholder="Model ID"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                />
                <button onClick={getModel}>Get Model</button>
                {modelData && (
                    <div>
                        <p><strong>ID:</strong> {modelData[0]}</p>
                        <p><strong>Owner:</strong> {modelData[1]}</p>
                        <p><strong>Attributes:</strong> {modelData[2]}</p>
                        <p><strong>Timestamp:</strong> {new Date(parseInt(modelData[3]) * 1000).toLocaleString()}</p>
                        <p><strong>Version:</strong> {modelData[4]}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
