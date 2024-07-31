import React, { useState, useEffect } from "react";

import styles from "./Nftapproval.module.css";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { getDocs, collection, where, limit, query } from "firebase/firestore";

const Items = [
  {
    id: 1,
    token_id: 12345,
    price: "45,900",
    image: "nft.png",
    quantity: 30,
    creator_id: "@pratham",
    creator_name: "Pratham",
    tags: "art, bollywood",
    status: "",
    comment: "nft op",
    detail_link: "#",
  },
  {
    id: 2,
    token_id: 12345,
    price: "45,900",
    image: "nft.png",
    quantity: 30,
    creator_id: "@pratham",
    creator_name: "Pratham",
    tags: "art, bollywood",
    status: "",
    comment: "nft op",
    detail_link: "#",
  },
  {
    id: 2,
    token_id: 12345,
    price: "45,900",
    image: "nft.png",
    quantity: 30,
    creator_id: "@pratham",
    creator_name: "Pratham",
    tags: "art, bollywood",
    status: "",
    comment: "nft op",
    detail_link: "#",
  },
];

const Nftapproval = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>([]);
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );
  const q1 = query(
    collection(db, "nftRequest"),
    where("state", "==", "PENDING")
  );

  useEffect(() => {
    if (adminData?.isAdmin) {
      const run = async () => {
        let constant: any = [];
        await getDocs(q1)
          .then((querySnapshot) => {
            querySnapshot.forEach((snapshot) => {
              if (snapshot.exists()) {
                constant.push(snapshot.data());
              } else {
              }
            });
            setRequest(constant);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      run();
    } else {
    }
  }, [adminData, q1, request]);
  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>NFT Approval</h2>
      <table className={styles.table}>
        <tr className={styles.head}>
          <th className={styles.heading}>Request Id</th>
          <th className={styles.heading}>Price</th>
          <th className={styles.heading}>Title</th>
          <th className={styles.heading}>Creator Email</th>
          <th className={styles.heading}>Category</th>
          <th className={styles.heading}>Creator Name</th>
          <th className={styles.heading}>Apply Date</th>
          {/* <th className={styles.heading}>Nft Status</th> */}
          {/* <th className={styles.heading}>Comments</th> */}
          <th className={styles.heading}>View Details</th>
        </tr>

        {request.map((e: any, index: number) => (
          <tr className={styles.body} key={index}>
            <td className={styles.items}>{e.requestId}</td>
            <td className={styles.items}>{e.price} INR</td>
            <td className={styles.items}>{e.title}</td>
            <td className={styles.items}>{e.creatorEmail}</td>
            <td className={styles.items}>{e.category}</td>
            <td className={styles.items}>{e.creatorName}</td>
            <td className={styles.items}>{e.applyDate}</td>
            {/* <td className={styles.items}>
              <button>Approve</button>
              <button>Reject</button>
            </td> */}
            {/* <td className={styles.items}>{e.comment}</td> */}
            <td className={styles.items}>
              <button onClick={() => navigate("/nftapproval/" + e.requestId)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </table>
      <button type="submit" className={styles.btn}>
        <p className={styles.p}>Load More</p>
      </button>
    </div>
  );
};

export default Nftapproval;
