import React from "react";
import CollectionApproval from "../../components/Approval/collectionApproval";
import styles from "./collectionApp.module.css";
import Header from "../../components/Header/Header";

const CollectionApp = () => {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.div1}>
          <CollectionApproval />
        </div>
        <div className={styles.div2}>
          {/* <img className={styles.img} src="../../images/nft image.png" alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default CollectionApp;
