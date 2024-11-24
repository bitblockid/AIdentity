// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract OpenAIDRegistry {
    struct Model {
        string id;
        address owner;
        string attributes;
        uint256 timestamp;
        uint256 version;
    }

    mapping(string => Model) private models;
    mapping(string => address[]) private ownershipHistory;

    event ModelRegistered(string id, address owner, uint256 timestamp, uint256 version);
    event ModelUpdated(string id, string attributes, uint256 timestamp, uint256 version);
    event OwnershipTransferred(string id, address previousOwner, address newOwner, uint256 timestamp);

    function registerModel(string memory id, string memory attributes) public {
        require(models[id].owner == address(0), "Model already exists");
        models[id] = Model(id, msg.sender, attributes, block.timestamp, 1);
        ownershipHistory[id].push(msg.sender);
        emit ModelRegistered(id, msg.sender, block.timestamp, 1);
    }

    function updateModel(string memory id, string memory attributes) public {
        require(models[id].owner == msg.sender, "Not the owner of this model");
        models[id].attributes = attributes;
        models[id].timestamp = block.timestamp;
        models[id].version += 1;
        emit ModelUpdated(id, attributes, block.timestamp, models[id].version);
    }

    function transferOwnership(string memory id, address newOwner) public {
        require(models[id].owner == msg.sender, "Not the owner of this model");
        address previousOwner = models[id].owner;
        models[id].owner = newOwner;
        ownershipHistory[id].push(newOwner);
        emit OwnershipTransferred(id, previousOwner, newOwner, block.timestamp);
    }

    function getModel(string memory id) public view returns (string memory, address, string memory, uint256, uint256) {
        require(models[id].owner != address(0), "Model not found");
        Model memory model = models[id];
        return (model.id, model.owner, model.attributes, model.timestamp, model.version);
    }

    function getOwnershipHistory(string memory id) public view returns (address[] memory) {
        require(models[id].owner != address(0), "Model not found");
        return ownershipHistory[id];
    }

    function getModelOwner(string memory id) public view returns (address) {
        require(models[id].owner != address(0), "Model not found");
        return models[id].owner;
    }

    function doesModelExist(string memory id) public view returns (bool) {
        return models[id].owner != address(0);
    }
}
