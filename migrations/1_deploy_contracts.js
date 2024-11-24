const OpenAIDRegistry = artifacts.require("OpenAIDRegistry");

module.exports = function (deployer) {
    deployer.deploy(OpenAIDRegistry);
};
