import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "N5lg6Vk0u-FVp5oaIy7S9QUhzyVZ_PzX",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);  
  
// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();
    
// Get all outbound transfers for a provided address
alchemy.core
    .getTokenBalances('0xF2f5F514603b937D786C25e31077597859B7e5DD')
    .then(console.log);

// Get all the NFTs owned by an address
const nfts = alchemy.nft.getNftsForOwner("0xF2f5F514603b937D786C25e31077597859B7e5DD");
    
// Listen to all new pending transactions
alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: "0xshah.eth" },
    (res) => console.log(res)
);