// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Exchange {
    
    // test variable
    string public greeting = 'Hello World';

    // test function
    function speak() public pure returns (string memory) {
        return 'I Have Spoken';
    }

    function pay(address payable recipient) public payable returns (string memory) {
        uint amount = msg.value;
        recipient.transfer(amount);
        return "sent";
    }


    function pay2(address payable recipient) public payable returns (uint) {
        uint amount = msg.value;
        recipient.transfer(amount);
        return msg.value;
    }

    function acceptEth() public payable {
        
    }
    
}