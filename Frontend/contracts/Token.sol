// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import the token interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

// Define the smart contract
contract Beluga{
    // Declare state variables to store the token addresses
    IERC20 public erc20;
    IERC721 public erc721;
    IERC1155 public erc1155;
    

    // Initialize the token addresses in the constructor
    constructor(address _erc20, address _erc721, address _erc1155) {
        erc20 = IERC20(_erc20);
        erc721 = IERC721(_erc721);
        erc1155 = IERC1155(_erc1155);
    }

    // Define a function to display the ERC-20 balance of a user
    function displayERC20(address _user) public view returns (uint256) {
        // Return the ERC-20 balance of the user
        return erc20.balanceOf(_user);
    }

    // Define a function to display the ERC-721 balance of a user
    function displayERC721(address _user) public view returns (uint256) {
        // Return the ERC-721 balance of the user
        return erc721.balanceOf(_user);
    }

    // Define a function to display the ERC-1155 balance of a user for a specific token ID
    function displayERC1155(address _user, uint256 _id) public view returns (uint256) {
        // Return the ERC-1155 balance of the user for the token ID
        return erc1155.balanceOf(_user, _id);
    }

    // Define a function to approve another user to spend ERC-20 tokens on behalf of the owner
    function approveERC20(address _spender, uint256 _amount) public {
        // Approve the spender to spend the amount of ERC-20 tokens
        erc20.approve(_spender, _amount);
    }

    // Define a function to approve another user to spend ERC-721 tokens on behalf of the owner
    function approveERC721(address _spender) public {
        // Approve the spender to spend all ERC-721 tokens
        erc721.setApprovalForAll(_spender, true);
    }

    // Define a function to approve another user to spend ERC-1155 tokens on behalf of the owner
    function approveERC1155(address _spender) public {
        // Approve the spender to spend all ERC-1155 tokens
        erc1155.setApprovalForAll(_spender, true);
    }

    // Define a function to show the allowance of another user to spend ERC-20 tokens on behalf of the owner
    function showAllowanceERC20(address _owner, address _spender) public view returns (uint256) {
        // Return the allowance of the spender to spend ERC-20 tokens
        return erc20.allowance(_owner, _spender);
    }

    // Define a function to show the allowance of another user to spend ERC-721 tokens on behalf of the owner
    function showAllowanceERC721(address _owner, address _spender) public view returns (bool) {
        // Return the allowance of the spender to spend ERC-721 tokens
        return erc721.isApprovedForAll(_owner, _spender);
    }

    // Define a function to show the allowance of another user to spend ERC-1155 tokens on behalf of the owner
    function showAllowanceERC1155(address _owner, address _spender) public view returns (bool) {
        // Return the allowance of the spender to spend ERC-1155 tokens
        return erc1155.isApprovedForAll(_owner, _spender);
    }



//defining the IERC_20 function for increasing the allowances
    //function increaseAllowance(address spender, uint256 addedValue) external virtual returns (bool);


    // Define a function to increase the allowance of another user to spend ERC-20 tokens on behalf of the owner
    // function increaseAllowanceERC20(address _spender, uint256 _addedValue) virtual public {
    //     // Increase the allowance of the spender by the added value
    //     erc20.increaseAllowance(_spender, _addedValue);
    // }

    // // Define a function to decrease the allowance of another user to spend ERC-20 tokens on behalf of the owner
    // function decreaseAllowanceERC20(address _spender, uint256 _subtractedValue) public {
    //     // Decrease the allowance of the spender by the subtracted value
    //     erc20.decreaseAllowance(_spender, _subtractedValue);
    // }

    // Define a function to set or revoke the approval of another user to spend ERC-721 tokens on behalf of the owner
    function setApprovalForAllERC721(address _spender, bool _approved) public {
        // Set or revoke the approval of the spender for all ERC-721 tokens
        erc721.setApprovalForAll(_spender, _approved);
    }

    // Define a function to set or revoke the approval of another user to spend ERC-1155 tokens on behalf of the owner
    function setApprovalForAllERC1155(address _spender, bool _approved) public {
        // Set or revoke the approval of the spender for all ERC-1155 tokens
        erc1155.setApprovalForAll(_spender, _approved);
    }
}