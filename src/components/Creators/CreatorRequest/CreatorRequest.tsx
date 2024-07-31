import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userData from "../../../redux/slice/userData";
import { db, auth } from "../../../firebaseConfig";

import { getDocs, collection, where, limit, query } from "firebase/firestore";

import styles from "./CreatorRequest.module.css";
import { set } from "immer/dist/internal";

const Creators = [
  {
    id: 1,
    name: "Pratham",
    username: "@pratham",
    email: "pratham@hyprclub.com",
    details_link: "#",
    status: "Approved",
  },
  {
    id: 2,
    name: "Pratham",
    username: "@pratham",
    email: "pratham@hyprclub.com",
    details_link: "#",
    status: "Approved",
  },
  {
    id: 3,
    name: "Pratham",
    username: "@pratham",
    email: "pratham@hyprclub.com",
    details_link: "#",
    status: "Approved",
  },
];

const CreatorRequest = () => {
  const [request, setRequest] = useState<any>([]);
  const navigate = useNavigate();
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );
  const q1 = query(
    collection(db, "creatorRequest"),
    where("isDecisionTaken", "==", false)
  );

  //bring creatorRequests
  useEffect(() => {
    const run = async () => {
      let constant: any = [];
      await getDocs(q1)
        .then((querySnapshot) => {
          querySnapshot.forEach((snapshot) => {
            if (snapshot.exists()) {
              constant.push(snapshot.data().personalDetails);
              //   setRequest(snapshot.data().personalDetails);
            } else {
              setRequest("No Requests");
            }
          });
          setRequest(constant);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    run();
  }, [q1, request]);

  //check for admin and login
  useEffect(() => {
    if (loggedIn && uid && adminData?.isAdmin) {
    } else {
      navigate("/logout");
    }
  }, [loggedIn, uid, adminData, navigate]);
  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Creator Request</h2>
      <div className={styles.tables}>
        <div className={styles.head}>
          <div className={styles.j}>Request Id</div>
          <div className={styles.j}>Creator Name</div>
          <div className={styles.j}>Creator Username</div>
          <div className={styles.j}>emails</div>
          <div className={styles.j}>Details</div>
        </div>
        <div className={styles.body}>
          {request.map((e: any, index: number) => (
            <div className={styles.row} key={index}>
              <div className={styles.a}> {e.requestId}</div>
              <div className={styles.a}> {e.name}</div>
              <div className={styles.a}> {e.username}</div>
              <div className={styles.a}> {e.emailId}</div>
              <div className={styles.a}>
                {" "}
                <Link to={"/creatorApproval/" + e.requestId}>View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorRequest;
