import { Alchemy, Network } from 'alchemy-sdk';
import {useState, useEffect} from 'react';
import MyTable from './MyTable';
import Transaction from "./Transaction";


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Block( {blockNumber, setShouldRefresh}) {
    const [transactions, setTransactions] = useState([]);
    const [limit, setLimit] = useState(5);
    const [isHidden, setIsHidden] = useState(true);
    const [block, setBlock] = useState({});
    function changeLimit( event ) {
        event.preventDefault();
        setLimit( limit + 5 );
    }
    function toggleHidden( event ) {
        event.preventDefault();
        setShouldRefresh( ! isHidden );
        setIsHidden( ! isHidden );
    }

    useEffect(() => {
        if( blockNumber ) {
            getBlockDetails().then();
        }
        async function getBlockDetails( blockNumber ) {
            const myBlock = await alchemy.core.getBlockWithTransactions( blockNumber )
            const details = {};
            details['hash'] = myBlock.hash;
            details['parentHash'] = myBlock.parentHash;
            details['timestamp'] = myBlock.timestamp;
            details['nonce'] = myBlock.nonce;
            details['miner'] = myBlock.miner;
            setBlock( details );
            setTransactions( myBlock.transactions.slice(0, limit < myBlock.transactions.length ? limit :  myBlock.transactions.length) );
        }

    }, [blockNumber, limit]);

    if ( block.hash && transactions.length > 0 ) {
        let content = (
            <div className="Block">
                <button onClick={toggleHidden}> Block Number : {blockNumber} </button>
            </div>
        );
        if( ! isHidden ) {
            content = (
                <div className="Block">
                    <button onClick={toggleHidden}> Block Number : {blockNumber} </button>

                    <MyTable
                        data = {block}
                    />
                    {transactions.map( value => (
                        <Transaction
                            transaction = { value }
                        />
                    ) ) }

                    <button onClick={changeLimit}> Load More Transactions </button>
                </div>
            );
        }
        return content;
    }
    else {
        return (
            <div> Loading ...</div>
        );
    }

}

export default Block;
