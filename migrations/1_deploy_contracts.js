const AIdentityRegistry = artifacts.require("AIdentityRegistry");

module.exports = function (deployer) {
    deployer.deploy(AIdentityRegistry);
};
