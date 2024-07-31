import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Approval.module.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { error } from "console";

const Approval = () => {
  const { requestId } = useParams();
  const [userData, setUserData] = useState<any>();
  const [docUrl, setDocUrl] = useState("");
  const [uid, setUid] = useState("");
  const [comment, setComment] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  //handle accept button
  const handleApprove = async () => {
    console.log(comment);
    if (requestId) {
      await updateDoc(doc(db, "hyprUsers", uid), {
        bankAccountDetails: {
          accountHolderName: userData?.bankAccountDetails?.accountHolderName,
          accountHolderPhoneNumber:
            userData?.bankAccountDetails?.accountHolderPhoneNumber,
          accountNumber: userData?.bankAccountDetails?.accountNumber,
          accountType: userData?.bankAccountDetails?.accountType,
          ifscCode: userData?.bankAccountDetails?.ifscCode,
        },
        isCreator: true,
        isKycDone: true,
        creatorApproval: {
          approvalStatus: "APPROVED",
          comments: comment,
          dateOfDecision: date,
        },
      })
        .then(() => {
          updateDoc(doc(db, "creatorRequest", requestId), {
            isDecisionTaken: true,
            isApproved: true,
            dateOfDecision: date,
            comments: comment,
          });
        })
        .then(() => {
          console.log("Approved");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("something went wrong");
    }
  };

  const handleReject = async () => {
    console.log(comment);
    if (requestId) {
      await updateDoc(doc(db, "hyprUsers", uid), {
        creatorApproval: {
          approvalStatus: "REJECTED",
          comments: comment,
          dateOfDecision: date,
        },
      })
        .then(() => {
          updateDoc(doc(db, "creatorRequest", requestId), {
            isDecisionTaken: true,
            isApproved: false,
            dateOfDecision: date,
            comments: comment,
          });
        })
        .then(() => {
          console.log("Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("something went wrong");
    }
  };
  //fetch request details
  useEffect(() => {
    const run = async () => {
      if (requestId) {
        let constant: any = [];
        await getDoc(doc(db, "creatorRequest", requestId))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.data());
              setUid(snapshot.data().personalDetails.uid);
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
        console.log(userData);
      } else {
      }
    };
    run();
  }, [requestId]);

  // bring documents from storage
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h3> creator</h3>
        <div className={styles.j}>
          <h4>Name</h4> <p>{userData?.personalDetails?.name}</p>
        </div>
        <div className={styles.j}>
          <h4>UserName</h4> <p>@{userData?.personalDetails?.username}</p>
        </div>
        <div className={styles.j}>
          <h4>Email address</h4> <p>{userData?.personalDetails?.emailId}</p>
        </div>
        <div className={styles.j}>
          <h4>Twitter link</h4> <p>{userData?.socials?.twitterLink}</p>
        </div>
        <div className={styles.j}>
          <h4>Instagram Link</h4> <p>{userData?.socials?.instagramLink}</p>
        </div>
        <div className={styles.j}>
          <h4>Youtube Link</h4> <p>{userData?.socials?.youtubeProfileUrl}</p>
        </div>
        <div className={styles.j}>
          <h4>Personal Wbsite</h4> <p>{userData?.socials?.portfolioUrl}</p>
        </div>
        <div className={styles.j}>
          <h4>Date of Joining</h4> <p>{userData?.dateOfJoining}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h3>Bank Details</h3>
        <div className={styles.j}>
          <h4>Account Holder Name</h4>{" "}
          <p>{userData?.bankAccountDetails?.accountHolderName}</p>
        </div>
        <div className={styles.j}>
          <h4>Account no.</h4>{" "}
          <p>{userData?.bankAccountDetails?.accountNumber}</p>
        </div>
        <div className={styles.j}>
          <h4>IFSC code</h4> <p>{userData?.bankAccountDetails?.ifscCode}</p>
        </div>
        <div className={styles.j}>
          <h4>Account Type</h4>{" "}
          <p>{userData?.bankAccountDetails?.accountType}</p>
        </div>
        <div className={styles.j}>
          <h4>Mobile No.</h4>{" "}
          <p>{userData?.bankAccountDetails?.accountHolderPhoneNumber}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h3>KYC Verification</h3>
        <div className={styles.j}>
          <h4>Verification Document type</h4>{" "}
          <p>{userData?.kycDetails?.documentType}</p>
        </div>
        <div className={styles.j}>
          <h4>Document no.</h4> <p>{userData?.kycDetails?.documentNumber}</p>
        </div>
        <div className={styles.j}>
          <h4>document</h4> <p>DOCUMENT</p>{" "}
          <a
            className={styles.link}
            href={userData?.kycDetails?.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </div>
        <div className={styles.j}>
          <h4>document</h4> <p>Signed Photo</p>{" "}
          <a
            className={styles.link}
            href={userData?.kycDetails?.signedPhotoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
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
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Approval;
