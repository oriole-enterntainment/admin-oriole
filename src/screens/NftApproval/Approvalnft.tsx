import React from "react";
import Approvalnft from "../../components/Approval/Approvalnft";
import styles from "./Approvalnft.module.css";
import Header from "../../components/Header/Header";

const ApprovalNft = () => {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.div1}>
          <Approvalnft />
        </div>
        <div className={styles.div2}>
          {/* <img className={styles.img} src="../../images/nft image.png" alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default ApprovalNft;
