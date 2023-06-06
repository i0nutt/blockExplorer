import './App.css';
import Block from "./Block";
import {useEffect, useState} from "react";
import { Alchemy, Network } from 'alchemy-sdk';
import * as PropTypes from "prop-types";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};

function App() {

    const [limit, setLimit] = useState(5);
    const [blockNumber, setBlockNumber] = useState("");
    const [blockNumbers, setBlockNumbers] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(true);
    function changeLimit() {
        setLimit( limit + 5);
    }

    async function getBlockNumber() {
        setBlockNumber( "" + await alchemy.core.getBlockNumber() );
    }

    useEffect(() => {
        const interval = setInterval( () => {
            getBlockNumber().then();
        }, 5000);
    } );

    useEffect( () => {
        console.log(blockNumber, shouldRefresh);
        if ( blockNumber && shouldRefresh) {
            const numbers = [];
            for ( let i = blockNumber ; i > blockNumber - limit; i --) {
                numbers.push( i );
            }
            setBlockNumbers( numbers );
        }
    }, [blockNumber, limit, shouldRefresh ]);

    if ( blockNumbers.length > 0 ) {
        return (
            <div className="App">
                {blockNumbers.map(value => (
                    <Block
                        blockNumber={value}
                        setShouldRefresh = { setShouldRefresh }
                    />
                ))}
                <button onClick={changeLimit}> Load More Blocks</button>
            </div>
        );
    } else {
        return (
            <div className="App">
                <p> Loading ... </p>
            </div>
        );
    }
}

export default App;
