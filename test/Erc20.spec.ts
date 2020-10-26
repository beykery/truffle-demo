import chai, { expect } from "chai";
import { Contract } from "ethers";
import { MaxUint256 } from "ethers/constants";
import { bigNumberify, hexlify, keccak256, defaultAbiCoder, toUtf8Bytes } from "ethers/utils";
import { solidity, MockProvider, deployContract } from "ethereum-waffle";
import { BN, ecsign } from "ethereumjs-util";
import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";

chai.use(solidity);

describe("Erc20", () => {
  const provider = new MockProvider({
    hardfork: "istanbul",
    mnemonic: "crazy syrup normal tumble base glass nurse assist surprise lazy alarm immune",
    gasLimit: 9999999,
    fork: "http://127.0.0.1:9545",
    debug: true
  });
  const [wallet, other] = provider.getWallets();

  let token: Contract;
  beforeEach(async () => {
    token = await deployContract(wallet, ERC20, ["test", "test"]);
    console.log(token.address);
  });

  it("name, symbol, decimals, totalSupply, balanceOf", async () => {
    const name = await token.name();
    expect(name).to.eq("test");
    expect(await token.symbol()).to.eq("test");
    expect(await token.decimals()).to.eq(18);
    expect(await token.totalSupply()).to.eq(0);
    expect(await token.balanceOf(wallet.address)).to.eq("");
    const ret = await token.balanceOf(wallet.address);
    console.log(ret);
    console.log("done .");
  });

});
