
pragma solidity ^0.8.0;

contract NFTMarketPlace {
    
    YourToken token;
    NFTToken  NFT;
  
    //keep the record for tokenID is listed on sale or not
    mapping(uint256 => bool) public tokenIdForSale;
    //keep the record for cost of the token
    mapping(uint256 => uint) public tokenIdToValue;
    
    
    
    //keep the address of the nft buyer
    mapping(uint256 => address) public nftBuyers;
    
    
    constructor (address tokenAddress, address NFTAddress)  {
        token = YourToken(tokenAddress);
        NFT = NFTToken(NFTAddress);
       
    
    }
    
    function nftSale(uint256 _tokenId, uint256 _nftPrice, bool forSale) external {
        require(msg.sender == NFT.ownerOf(_tokenId),"Only owners can change this status");
        tokenIdForSale[_tokenId] = forSale;
        tokenIdToValue[_tokenId] = _nftPrice;
    }
    
   
    function nftBuy(uint256 _tokenId) public {
        require(tokenIdForSale[_tokenId],"Token must be on sale first");
        uint nftPrice = tokenIdToValue[_tokenId];
        require(token.allowance(msg.sender, address(this)) >= nftPrice, "Insufficient allowance.");
        require(token.balanceOf(msg.sender) >= nftPrice, "Insufficient balance.");
        
        // transfer the money tokens from the buyer to the seller
        token.transferFrom(msg.sender, NFT.ownerOf(_tokenId), nftPrice);
        // transfer the nft from the seller to the buyer
        NFT.transferFrom(NFT.ownerOf(_tokenId), msg.sender, _tokenId);
        
        nftBuyers[_tokenId] = msg.sender;
    }
}