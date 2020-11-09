//pragma solidity >=0.4.22 <0.8.0;
//
//import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
//
//contract TestERC20 is ERC20 {
//    constructor (
//        string memory name,
//        string memory symbol,
//        address initialAccount,
//        uint256 initialBalance
//    ) public payable ERC20(name, symbol) {
//        _mint(initialAccount, initialBalance);
//    }
//
//    function mint(address account, uint256 amount) public {
//        _mint(account, amount);
//    }
//
//    function burn(address account, uint256 amount) public {
//        _burn(account, amount);
//    }
//
//    function transferInternal(address from, address to, uint256 value) public {
//        _transfer(from, to, value);
//    }
//
//    function approveInternal(address owner, address spender, uint256 value) public {
//        _approve(owner, spender, value);
//    }
//}
