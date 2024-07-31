import React from 'react';
import Header from '../../components/Header/Header';
import Nftapproval from '../../components/NftTransaction/NftApproval/Nftapproval';
import Nsfwapproval from '../../components/NftTransaction/NsfwApproval/Nsfwapproval';
import TransactionHistory from '../../components/NftTransaction/TransactionHistory/TransactionHistory';
import styles from "./NftTransaction.module.css"

const NftTransaction = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <h1 className={styles.h1}> NFT Transactions</h1>
                <br/>
                <TransactionHistory />
                <br/>
                <Nftapproval />
                <br/>
                <Nsfwapproval />
            </div>

        </>
    );
};

export default NftTransaction;