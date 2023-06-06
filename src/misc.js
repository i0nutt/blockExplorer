import {Alchemy, AlchemySubscription, Network} from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getNFTMetaData( contractId, tokenID ) {
    return await alchemy.nft.getNftMetadata( contractId, tokenID );
}

async function getNFTFloorPrice( address ) {
    return await alchemy.nft.getFloorPrice( address );
}

async function watchForPendingTransaction( from, to) {
    alchemy.ws.on(
        {
            method: AlchemySubscription.MINED_TRANSACTIONS,
            addresses: [
                {
                    from,
                    to,
                },
                {
                    to: from,
                },
            ],
            includeRemoved: true,
            hashesOnly: false,
        },
        (tx) => console.log(tx)
    );
}
