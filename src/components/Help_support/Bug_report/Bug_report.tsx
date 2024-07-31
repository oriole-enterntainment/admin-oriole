import React, { useEffect, useState } from "react";
import styles from "./Bug_report.module.css";
import { db, auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { getDocs, collection, where, limit, query } from "firebase/firestore";

const BugReport = [
  {
    reportId: "NULL",
    dateOfReporting: "NO BUG",
    reporterName: "NO BUG",
    reporterEmail: "NO BUG",
    bugState: "NO BUG",
    description: "NO BUG",
  },
];
const Bug_report = () => {
  const [request, setRequest] = useState<any>([]);
  const navigate = useNavigate();
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );
  const q1 = query(
    collection(db, "bugReport"),
    where("bugState", "==", "PENDING")
  );

  //get Bugs
  // useEffect(() => {
  //   if (adminData?.isAdmin) {
  //     const run = async () => {
  //       let constant: any = [];
  //       await getDocs(q1)
  //         .then((querySnapshot) => {
  //           querySnapshot.forEach((snapshot) => {
  //             if (snapshot.exists()) {
  //               constant.push(snapshot.data());
  //             } else {
  //               constant.push(BugReport);
  //             }
  //           });
  //           setRequest(constant);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     };
  //     run();
  //   } else {
  //   }
  // }, [adminData, q1, request]);

  //handle login state.
  // useEffect(() => {
  //   if (loggedIn && uid && adminData?.isAdmin) {
  //   } else {
  //     navigate("/logout");
  //   }
  // }, [loggedIn, uid, adminData, navigate]);

  return (
    <div className={styles.main}>
      <table className={styles.table}>
        <h2 className={styles.h2}>Report a Bug</h2>
        <tr className={styles.head}>
          <th className={styles.heading}>Bug Id</th>
          <th className={styles.heading}>Date</th>
          <th className={styles.heading}>Name</th>
          <th className={styles.heading}>Email</th>
          <th className={styles.heading}>Description</th>
          <th className={styles.heading}>Status</th>
        </tr>
        {request.map((e: any, index: number) => (
          <tr className={styles.body} key={index}>
            <td className={styles.items}> {e.reportId}</td>
            <td className={styles.items}> {e.dateOfReporting}</td>
            <td className={styles.items}> {e.reporterName}</td>
            <td className={styles.items}> {e.reporterEmailId}</td>
            <td className={styles.items}> {e.description}</td>
            <td className={styles.items}> {e.bugState}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Bug_report;
