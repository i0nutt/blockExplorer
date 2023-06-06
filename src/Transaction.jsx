import * as React from 'react';
import MyTable from "./MyTable";
import {useState} from "react";

function Transaction( {transaction} ) {

    const [isHidden, setIsHidden] = useState(true);
    function toggleHidden( event ) {
        event.preventDefault();
        setIsHidden( ! isHidden );
    }
    function filterData() {
        const transactionDetails = {};
        //console.log(transaction);
        transactionDetails['Chain ID'] = transaction.chainId;
        transactionDetails['Sender'] = transaction.from;
        transactionDetails['Receiver'] = transaction.to;
        transactionDetails['Gas Limit'] = transaction.gasLimit.toString();
        return transactionDetails;
    }

    let content = (
        <div>
            <button onClick={toggleHidden}> Transaction {transaction.transactionIndex + 1} </button>
        </div>
    );
    if( ! isHidden ) {
       content = (
           <div className="Transaction">
               <button onClick={toggleHidden}> Transaction {transaction.transactionIndex + 1} </button>
               <MyTable
                   data = {filterData()}
               />
           </div>

       );
    }

    return content;
}

export default Transaction;
