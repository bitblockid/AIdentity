const OpenAIDRegistry = artifacts.require("OpenAIDRegistry");

contract("OpenAIDRegistry", accounts => {
    it("should register a new model", async () => {
        const registry = await OpenAIDRegistry.deployed();
        await registry.registerModel("model1", "attributes", { from: accounts[0] });
        const model = await registry.getModel("model1");
        assert.equal(model.id, "model1", "Model ID does not match");
        assert.equal(model.owner, accounts[0], "Owner does not match");
    });
});
