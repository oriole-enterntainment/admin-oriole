import React, { useEffect, useState } from "react";
import styles from "./Approval.module.css";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
const CollectionApproval = () => {
  //   const { requestId } = useParams();
  //   const [nftData, setNftData] = useState<any>();
  //   const [docUrl, setDocUrl] = useState("");
  //   const [uid, setUid] = useState("");
  //   const [comment, setComment] = useState("");
  //   const current = new Date();
  //   const date = `${current.getDate()}/${
  //     current.getMonth() + 1
  //   }/${current.getFullYear()}`;
  //   useEffect(() => {
  //     const run = async () => {
  //       if (requestId) {
  //         let constant: any = [];
  //         await getDoc(doc(db, "nftRequest", requestId))
  //           .then((snapshot) => {
  //             if (snapshot.exists()) {
  //               setNftData(snapshot.data());
  //               setUid(snapshot.data().personalDetails.uid);
  //             } else {
  //               console.log("error with snapshot");
  //             }
  //           })
  //           .then(() => {
  //             //get document url
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //         console.log(nftData);
  //       } else {
  //       }
  //     };
  //     run();
  //   }, [requestId]);
  //   const listItems = nftData?.perks.map((e: any) => <li>{e.description}</li>);
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h3> Creator</h3>
        <div className={styles.j}>
          <h4>Name</h4> <p>{"nftData?.creatorName"}</p>
        </div>
        <div className={styles.j}>
          <h4>USerName</h4> <p>{"nftData?.creatorUsername"}</p>
        </div>
        <div className={styles.j}>
          <h4>Email</h4> <p>{"nftData?.creatorEmail"}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Nft Details</h3>
        <div className={styles.j}>
          <h4>Title</h4> <p>{"nftData?.title"}</p>
        </div>
        <div className={styles.j}>
          <h4>Media File</h4>{" "}
          <img
            src={"nftData?.nftMedia"}
            height={100}
            width={100}
            alt="Failed to load media"
          />
        </div>
        <div className={styles.j}>
          <h4>Collection Tag</h4> <p>{"nftData?.collectionTag"}</p>
        </div>
        <div className={styles.j}>
          <h4>Price</h4> <p> INR {"nftData?.price"}</p>
        </div>
        <div className={styles.j}>
          <h4>Apply Date</h4> <p>{"nftData?.applyDate"}</p>
        </div>
        <div className={styles.j}>
          <h4>Description</h4> <p>{"nftData?.description"} </p>
        </div>
        {/* <div className={styles.j}>
            <h4>Perks</h4> <ul>{"listItems"}</ul>
          </div> */}
        <div className={styles.j}>
          <button>Approve</button>
          <button>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default CollectionApproval;
