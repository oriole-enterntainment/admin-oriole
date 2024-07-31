import React, { useEffect, useState } from "react";
import styles from "./Approval.module.css";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db, firebaseApp, storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
const Approvalnft = () => {
  const [comments, setComments] = useState("");
  const { requestId } = useParams();
  const [nftData, setNftData] = useState<any>();
  const [docUrl, setDocUrl] = useState("");
  const [uid, setUid] = useState("");
  const [comment, setComment] = useState("");
  const [contract, setContAdd] = useState("");
  const [idToken, setTokenId] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const firebasetime = Timestamp.now().toDate();

  useEffect(() => {
    const run = async () => {
      if (requestId) {
        let constant: any = [];
        await getDoc(doc(db, "nftRequest", requestId))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setNftData(snapshot.data());
            } else {
              console.log("error with snapshot");
            }
          })
          .then(() => {
            //get document url
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(nftData);
      } else {
      }
    };
    run();
  }, [requestId]);

  const listItems = nftData?.perks.map((e: any) => <li>{e.description}</li>);
  const makeNftId = (len: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLengths = characters.length;
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLengths));
    }
    return result;
  };

  const handleReject = async () => {
    if (comment === "") {
      console.log("Please Add comments");
    } else {
      const docId = "DOC" + makeNftId(26);
      await updateDoc(doc(db, "nftRequest", nftData?.requestId), {
        isApproved: false,
        isMinted: false,
        state: "REJECTED",
        comments: comment,
        dateOfDecision: firebasetime,
      })
        .then(() => {
          console.log("Rejected");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleGenJson = async () => {};

  const handleAccept = async () => {
    console.log(firebasetime);
    //means nft is minted as well as approved by our executive.
    if (comment === "" || contract === "" || idToken === "") {
      console.log("Please Add comments and Contract Address");
    } else {
      const docId = "DOC" + makeNftId(26);
      await setDoc(doc(db, "nfts", docId), {
        nftUid: docId,
        collectionTag: nftData?.collectionTag,
        contractAddress: contract,
        creatorUid: nftData?.creatorUid,
        ownerUid: nftData?.creatorUid,
        perks: nftData?.perks,
        price: nftData?.price,
        category: nftData?.category,
        approvingTime: firebasetime,
        video: nftData?.video,
        token: idToken,
        nftPerkState: "PENDING",
        forSale: true,
      })
        .then(() => {
          updateDoc(doc(db, "nftRequest", nftData?.requestId), {
            isApproved: true,
            isMinted: true,
            state: "APPROVED",
            comments: comment,
            contractAddress: contract,
            dateOfDecision: firebasetime,
            nftUid: docId,
            token: idToken,
          });
        })
        .then(() => {
          console.log("ON Marketplace");
          //send automated email about new nft.
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h3> Creator</h3>
        <div className={styles.j}>
          <h4>Name</h4> <p>{nftData?.creatorName}</p>
        </div>
        <div className={styles.j}>
          <h4>UserName</h4> <p>{nftData?.creatorUsername}</p>
        </div>
        <div className={styles.j}>
          <h4>Email</h4> <p>{nftData?.creatorEmail}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Nft Details</h3>
        <div className={styles.j}>
          <h4>Title</h4> <p>{nftData?.title}</p>
        </div>
        <div className={styles.j}>
          <h4>Media File</h4>{" "}
          <img
            src={nftData?.nftMedia}
            height={100}
            width={100}
            alt="Failed to load IMAGE"
          />
        </div>
        <div className={styles.j}>
          <h4>Collection Tag</h4> <p>{nftData?.collectionTag}</p>
        </div>
        <div className={styles.j}>
          <h4>Price</h4> <p> INR {nftData?.price}</p>
        </div>
        <div className={styles.j}>
          <h4>Apply Date</h4> <p>{nftData?.applyDate}</p>
        </div>
        <div className={styles.j}>
          <h4>Description</h4> <p>{nftData?.description} </p>
        </div>
        <div className={styles.j}>
          <h4>Perks</h4> <ul>{listItems}</ul>
        </div>
        <div className={styles.j}>
          <h4>Comments</h4>{" "}
          <input
            className={styles.j}
            name="comment"
            placeholder="comments"
            required
            onChange={(e: React.ChangeEvent<any>) => {
              setComment(e.target.value);
            }}
          ></input>{" "}
        </div>
        <div className={styles.j}>
          <h4>Token ID</h4>{" "}
          <input
            className={styles.j}
            name="idToken"
            placeholder="idToken"
            required
            onChange={(e: React.ChangeEvent<any>) => {
              setTokenId(e.target.value);
            }}
          ></input>{" "}
        </div>
        <div className={styles.j}>
          <h4>Contract Address</h4>{" "}
          <input
            className={styles.j}
            name="contractAdd"
            placeholder="contract address"
            required
            onChange={(e: React.ChangeEvent<any>) => {
              setContAdd(e.target.value);
            }}
          ></input>{" "}
        </div>
        <div className={styles.j}>
          <button onClick={handleAccept}>Approve</button>
          <button onClick={handleReject}>Reject</button>
          <button onClick={handleGenJson}>Generate Json</button>
        </div>
      </div>
    </div>
  );
};

export default Approvalnft;
