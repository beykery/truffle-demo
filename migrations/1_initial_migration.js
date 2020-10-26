const Migrations = artifacts.require("Migrations");
const ERC20 = artifacts.require("@openzeppelin/contracts/ERC20");

module.exports = function (deployer, network) {
    console.log("start deploy .");

    if (network === 'development') {
        // deployer.deploy(Migrations, {overwrite: false, gas: 4612388, from: "0x30e64D42b3815D42E47F364F2129466F234cBEda"});
        deployer.deploy(ERC20, 'test', 'test', {
            overwrite: true,
            gas: 4612388,
            from: "0x30e64D42b3815D42E47F364F2129466F234cBEda"
        });
    }
};
