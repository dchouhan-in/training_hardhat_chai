// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/// @title an implementation of ERC20 fungible token contract.
/// @author dchouhan-in@github.com
/// @notice creates contract for "DIV" token.
/// @dev by default it mints all the tokens to the deployer address.
contract ERC20Token {
    uint96 private _totalSupply;
    string private _symbol;
    string private _name;

    /// @dev event emmited when a token is transfered
    /// @param _from Address from whom token is transfered.
    /// @param _to Address to which token is transfered.
    /// @param _value Value of token to be transfered.
    event Transfered(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    /// @dev event emmited when someone approves else of their tokens
    /// @param _owner Owner of the tokens
    /// @param _spender Aproved address
    /// @param _value Value of token to be Approved!
    event Approved(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => mapping(address => uint96)) private _allowance;

    mapping(address => uint96) public _balanceOf;

    /// @dev constructor currently consist of minting logic.
    constructor(string memory tokenName, string memory tokenSymbol) {
        _name = tokenName;
        _symbol = tokenSymbol;
        _mint(msg.sender, 1000);
    }

    /// @dev Mints the tokens to an address.
    /// @param _to address to mint tokens to
    /// @param _value ammount of tokens
    function _mint(address _to, uint96 _value) public {
        _totalSupply += _value;
        _balanceOf[_to] += _value;
    }

    /// @dev Name of token
    /// @return name string
    function name() external view returns (string memory) {
        return _name;
    }

    /// @dev Symbol of token
    /// @return symbol string
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    /// @dev Allowed decimal places
    /// @return decimals uint8
    function decimals() external pure returns (uint8) {
        return 6;
    }

    /// @dev Total Supply Available
    /// @return totalSupply total supply currently available
    function totalSupply() public view returns (uint96) {
        return _totalSupply;
    }

    /// @dev Query balance of specific address
    /// @return balance balance of the _owner
    /// @param _owner address, to query balance of
    function balanceOf(address _owner) public view returns (uint96 balance) {
        return _balanceOf[_owner];
    }

    /// @dev Transfer tokens to an address
    /// @return success are the tokens successfuly transfered!
    /// @param _to address, to transfer token to
    /// @param _value amount of tokens to transfer.
    function transfer(
        address _to,
        uint96 _value
    ) public returns (bool success) {
        require(_balanceOf[msg.sender] >= _value, "Insufficient Balance!");
        _balanceOf[_to] += _value;
        _balanceOf[msg.sender] -= _value;

        emit Transfered(msg.sender, _to, _value);
        return true;
    }

    /// @dev Allows approved addresses to transfer funds in behalf
    /// @return success are the tokens successfuly transfered!
    /// @param _to address, to transfer token to
    /// @param _value amount of tokens to transfer.
    function transferFrom(
        address _owner,
        address _to,
        uint96 _value
    ) public returns (bool success) {
        require(
            _value <= _allowance[_owner][msg.sender],
            "insufficient approved balance!"
        );
        _allowance[_owner][msg.sender] -= _value;
        _balanceOf[_owner] -= _value;
        _balanceOf[_to] += _value;
        return true;
    }

    /// @dev approve spender to let spend in behalf
    /// @return success are the tokens successfuly transfered!
    /// @param _spender address, of the spender.
    /// @param _value amount of tokens to transfer.
    function approve(
        address _spender,
        uint96 _value
    ) public returns (bool success) {
        _allowance[msg.sender][_spender] = _value;
        emit Approved(msg.sender, _spender, _value);
        return true;
    }

    /// @dev query allowance
    /// @return remaining remaing allowed tokens
    /// @param _spender address, of the spender.
    /// @param _owner address of the owner.
    function allowance(
        address _owner,
        address _spender
    ) public view returns (uint96 remaining) {
        return _allowance[_owner][_spender];
    }
}
