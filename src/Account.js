import React, {useEffect, useState} from "react";
import {Utils, Alchemy, Network} from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
function Balance({address}) {
    const [balance, setBalance] = useState('');

    async function getBalance() {

        try {
            const retrieveBalance = await alchemy.core.getBalance(address);
            setBalance( Utils.formatEther(retrieveBalance ) );
        } catch ( e ) {
            alert( "Invalid address provided");
            setBalance( '');
        }
    }
    useEffect( () => {
        if( address ) {
            getBalance().then();
        }
    }, [address] );

    if( balance ) {
        return (
            <div>
                You have {balance} ETH in you wallet !!!
            </div>
        );
    } else {
        return null;
    }

}
function Account() {

    const [address, setAddress] = useState('');

    function changeAddress( evt ) {
        evt.preventDefault();
        setAddress( evt.target.address.value );
    }

    return (
        <div>
            <form onSubmit={changeAddress}>
                <label> Write your address here</label>
                <br/>
                <input name = 'address' type = 'text'/>
                <br/>
                <input type='submit'/>
            </form>
            <Balance
                address={address}
            />
      </div>
    );
}

export default Account;
