const OpenAIDRegistry = artifacts.require("OpenAIDRegistry");

contract("OpenAIDRegistry", accounts => {
    it("should register a new model", async () => {
        const registry = await OpenAIDRegistry.deployed();
        await registry.registerModel("model1", "attributes", { from: accounts[0] });
        const model = await registry.getModel("model1");
        assert.equal(model.id, "model1", "Model ID does not match");
        assert.equal(model.owner, accounts[0], "Owner does not match");
    });

    it("should allow updating model attributes", async () => {
        const registry = await OpenAIDRegistry.deployed();
        await registry.updateModel("model1", "updated attributes", { from: accounts[0] });
        const model = await registry.getModel("model1");
        assert.equal(model.attributes, "updated attributes", "Attributes do not match");
    });

    it("should allow transferring ownership", async () => {
        const registry = await OpenAIDRegistry.deployed();
        await registry.transferOwnership("model1", accounts[1], { from: accounts[0] });
        const owner = await registry.getModelOwner("model1");
        assert.equal(owner, accounts[1], "Ownership was not transferred correctly");
    });

    it("should maintain ownership history", async () => {
        const registry = await OpenAIDRegistry.deployed();
        const history = await registry.getOwnershipHistory("model1");
        assert.equal(history.length, 2, "Ownership history length does not match");
        assert.equal(history[1], accounts[1], "Ownership history is incorrect");
    });
});
