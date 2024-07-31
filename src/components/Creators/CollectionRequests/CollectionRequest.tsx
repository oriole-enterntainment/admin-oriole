import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CollectionRequests.module.css";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { getDocs, collection, where, limit, query } from "firebase/firestore";

const Collection = [
  {
    collectionReqId: 1,
    creatorName: "Pratham",
    username: "@pratham",
    date: "27/12/2022",
    email: "pratham@hyprclub.com",
    status: "Approved",
  },
];

const CollectionRequest = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>([]);
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );
  const q1 = query(
    collection(db, "collectionRequest"),
    where("isDecisionTaken", "==", false)
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
      <h2 className={styles.h2}>Collection Request</h2>
      <table className={styles.table}>
        <tr className={styles.head}>
          <th className={styles.j}>Request Id</th>
          <th className={styles.j}>Creator Name</th>
          <th className={styles.j}>Apply Date</th>
          <th className={styles.j}>Request Type</th>
          <th className={styles.j}>Detail View</th>
        </tr>
        {request.map((e: any, index: number) => (
          <tr className={styles.row} key={index}>
            <td className={styles.a}> {e.collectionReqId}</td>
            <td className={styles.a}> {e.creatorName}</td>
            <td className={styles.a}> {e.applyDate}</td>
            <td className={styles.a}> {e.typeOfRequest}</td>
            <div className={styles.a}>
              {" "}
              <Link to={"/collectionApproval/" + e.collectionReqId}>View</Link>
            </div>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CollectionRequest;
