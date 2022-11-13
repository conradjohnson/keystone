pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTToken is ERC721 {
    
    string public nameNFT;
    string public nameSymbol;
    string public nftTokenURI;
    uint256 public nftId;

    //Keep the record of  nfts
    mapping(uint256 => string) public tokenURIExists;
    
    
    //Keep the record for nfts value => give id returns cost 
    mapping(uint256 => uint256) public tokenIdToValue;
    

    
    // Base URI
    string  _baseURIextended;
    
    constructor () ERC721("Keystone Real Estate", "KRE") {
        nameNFT = "Keystone Real Estate";
        nameSymbol = "KRE";
    
    }
    
    
    
    function setBaseURI(string memory baseURI_) external  {
        _baseURIextended = baseURI_;
    }
    
    
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require( _exists(tokenId),"ERC721Metadata: URI set of nonexistent token");
        tokenURIExists[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

            string memory _tokenURI = tokenURIExists[tokenId];
            string memory base = _baseURI();
            
            // If there is no base URI, return the token URI.
            if (bytes(base).length == 0) {
                return _tokenURI;
            }
            // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
            if (bytes(_tokenURI).length > 0) {
                return string(abi.encodePacked(base, _tokenURI));
            }
            // // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
            // return string(abi.encodePacked(base, tokenId.toString()));
            return string(abi.encodePacked(base, tokenId));
    }
        
  
    function Mint (string memory _tokenURI) public returns (uint256)  {
        require(msg.sender != address(0));
        nftTokenURI = _tokenURI;
        // used as token id 
        nftId ++;
        // check if a token exists with the above token id => incremented counter
        require(!_exists(nftId));
        
        _mint(msg.sender,nftId);
        _setTokenURI(nftId, nftTokenURI);
        
        return nftId;
        
    }
    
    function tokenPrice (uint256 _tokenID) public view returns (uint256 nftPrice) {
        require(!_exists(nftId));
        nftPrice = tokenIdToValue[_tokenID]; 
    } 
    
    
}