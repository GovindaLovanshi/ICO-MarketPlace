// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient,uint256 amount) external returns(bool);

    function balanceOf(address account) external view returns(uint256);

    function symbol()external view returns (string memory);
    function totalSupply() external view returns(uint256);
    function name() external view returns(string memory);
}

contract ICOMarketplace{
    struct TokenList{

        address token;
        bool supported;
        uint256 price;
        address creator;
        string name;
        string symbol;

    }

    // //maping
    
    mapping(address => TokenDetails) public tokenDetails;
    address[] public allSupportedTokens;
    address public owner;

    // EVEnTs

    event TokenReceived(address indexed token,address indexed from,uint256 amount);
    event TokenTransfered(address indexed token,address indexed  to,uint256 amount);
    event TokenWithdraw(address indexed token,address indexed to,uint256 amount);
    event TokenAdded(address indexed token,uint256 price,address indexed creator,
    string name,string symbol);


    modifier supportedToken(address _token){
        require(tokenDetails[_token].supported,"Token Not Supported");
        _;
    }

    modifier onluOwner(){
        require(msg.sender == owner,"Caller is not the owner");
        _;
    }

    modifier onlyCreater(address _token){
        require(msg.sender == tokenDetails[_token].creator,"Caller is not the token creator");
        _;
    }

    receive () external payable{
        revert("Contract does not accept Ether Directly");
        _;
    }

    constructor (){
        owner = msg.sender;
    }

    // Contract function

    function createICOSale(address _token,uint256 _price)external{
        IERC20 token = IERC20(_token);
        string memory tokenName = token.name();
        string memory tokenSymbol = token.symbol();

        tokenDetails[_token] = tokenDetails({
            token : _token,
            supported:true,
            price:_price,
            creator:msg.sender,
            name:tokenName,
            symbol :tokenSymbol
        });

        allSupportTokens.push(_token);
        emit TokenAdded(token, price, creator, name, symbol);(_token,_price,,msg.sender,tokenName,tokenSymbol);
    }

    function multiply(uint256 x,uint256 y) internal pure returns(uint256 z){
        require(y == 0 ||( z = x * y) / y == x) ;
    }

    function getBalance(address _token ) external view returns (uint256){
        
        require(tokenDetails[_token].supported,"Token Not Supported");

        IERC20  token = IERC20(_token);

        return token.balanceOf(address(this));
    }

    function getSupportedTokens() external view returns(address[] memory){
        return allSupportedTokens;
    }

    function buyToken(address _token,uint256 amount ) external payable supportedToken(_token){
        require(_amount > 0,"Amount must br grater then 0");
        TokenDetail memory details = tokenDetails[_token];
        uint256 totalCost = multiply(details.price, _amount);
        require(msg.value == totalCost,"Icorrect Ether Amount");

        // TRANSFER THE PAYMENT TO THE TOKEN CREATor

        (bool sent,) = details.creator.call{value : msg.value}("");
        require(sent,"Failed to transfer Ether to token creatoe");


        emit TokenTransfered(_token, msg.sender, _amount);
    }

    function withdrawToken(address _token,uint256 _amount) external onlyCreater(_token) supportedToken(_token){
        require(_amount > 0,"AMount Mustr be greator then 0");

        IERC20 token =IERC20(_token);
        uint256 balance = token.balanceOf(address(this));
        require(balane >= _amount,"InSUfficiant token Balance");
        require(token.transfer(msg.sender,_amount),"Token Transfer Failed");

        emit TokenWithdraw(_token,msg.sender,_amount);
    }

    function getTokenDetails(address _token ) external view returns (TokenDetails memory){
        require(tokenDetails[_token].supported,"Token Not Supported");

        return tokenDetails[_token];
    }

    function getTokenCreatedBy(address _creator) external view returns (TokenDetails[] memory){

        uint256 count=  0 ;
        for(uint256 i = 0; i< allSupportedTokens.length;i++){
            if(tokenDetails[allSupportedTokens[i]].creator == _creator){
                count++;
            }
        }

        TokenDetails[] memory tokens = new TokenDetails[](count);

        uint256 index = 0;

        for(uint256 i= 0;i<allSupportedTokens.length;i++){
            if(tokenDetails[allSupportedTokens[i]].creator == _creator){
                token[index] = tokenDetails[allSupportedTokens[i]];
                index++;
            }
        }

        return tokens;
    }

    function getAllTokens() external view returns(TokenDetails[] memory){

        uint256 length = allSupportedTokens.length;

        tokenDetails[] memory tokens = new TokenDetails[](length);

        for(uint256 i = 0;i<length;i++){
            tokens[i] = tokenDetails[allSupportedTokens[i]];
        }

        return tokens;
    }
}