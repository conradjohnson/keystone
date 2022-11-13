pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourToken is ERC20 {
    constructor() ERC20("Dolla!", "USD-RE") {
        _mint(msg.sender, 1000000000000 * 10 ** 18);
    }
}


