import chai, { expect } from 'chai'
import { Contract } from 'ethers'
import { MaxUint256 } from 'ethers/constants'
import { bigNumberify, hexlify, keccak256, defaultAbiCoder, toUtf8Bytes } from 'ethers/utils'
import { solidity, MockProvider, deployContract } from 'ethereum-waffle'
import { BN, ecsign } from 'ethereumjs-util'
import TestERC20 from '../build/contracts/TestERC20.json'
import { expandTo18Decimals, getApprovalDigest } from './shared/util'

chai.use(solidity)

describe('Erc20', () => {
  const provider = new MockProvider({
    hardfork: 'istanbul',
    mnemonic: 'crazy syrup normal tumble base glass nurse assist surprise lazy alarm immune',
    gasLimit: 9999999,
    fork: 'http://127.0.0.1:9545',
    debug: true
  })
  const [wallet, other] = provider.getWallets()

  const TOTAL_SUPPLY = expandTo18Decimals(10000)
  const TEST_AMOUNT = expandTo18Decimals(1)
  const test_address: String = '0x8aCc161acB2626505755bBF36184841B8c099806'

  let token: Contract   // erc20
  beforeEach(async () => {
    if (!token) {
      token = await deployContract(wallet, TestERC20, ['test', 'test', wallet.address, TOTAL_SUPPLY])
      console.log(token.address)
    }
  })

  it('name, symbol, decimals, totalSupply, balanceOf', async () => {
    const name = await token.name()
    expect(name).to.eq('test')
    expect(await token.symbol()).to.eq('test')
    expect(await token.decimals()).to.eq(18)
    expect(await token.totalSupply()).to.eq(TOTAL_SUPPLY)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY)
    const ret = await token.balanceOf(wallet.address)
    console.log(ret)
    console.log('done .')
  })

  it('approve', async () => {
    await expect(token.approve(test_address, TEST_AMOUNT))
      .to.emit(token, 'Approval')
      .withArgs(wallet.address, test_address, TEST_AMOUNT)
    expect(await token.allowance(wallet.address, test_address)).to.eq(TEST_AMOUNT)
  })

  it('transfer', async () => {
    await expect(token.transfer(test_address, TEST_AMOUNT))
      .to.emit(token, 'Transfer')
      .withArgs(wallet.address, test_address, TEST_AMOUNT)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
    expect(await token.balanceOf(test_address)).to.eq(TEST_AMOUNT.sub(0))
  })

})
