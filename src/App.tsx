import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import CreatorApproval from "./screens/CreatorApproval/CreatorApproval";
import Creators from "./screens/Creators/Creators";
import Help_support from "./screens/Help_support/Help_support";
import ApprovalNft from "./screens/NftApproval/Approvalnft";
import NftTransaction from "./screens/NftTransaction/NftTransaction";
import { onAuthStateChanged } from "firebase/auth";
import Logout from "./logout";
import { useDispatch, RootStateOrAny, DefaultRootState } from "react-redux";
import { useSelector } from "react-redux";
import { UserDataAction } from "./redux/slice/userData";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ListFormat } from "typescript";
import CollectionApp from "./screens/collectionApproval/collectionApproval";
import CollectionApproval from "./components/Approval/collectionApproval";

function App() {
  const dispatch = useDispatch();
  const adminData = useSelector((state: RootStateOrAny) => state?.adminData);
  const { loggedIn, uid } = useSelector(
    (state: RootStateOrAny) => state?.adminData
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(UserDataAction.login(user));
      } else {
        dispatch(UserDataAction.logout());
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    const run = async () => {
      if (loggedIn && uid ) {
        if (adminData) {
         await getDoc(doc(db, "admin", uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              dispatch(UserDataAction.updateAdminData(docSnap.data()));
            } else {
            }
          })
          .catch((erro) => {
            console.log(erro);
          });
        }        
      } else {
        console.log("No User Data");
      }
    };
    run();
  }, [loggedIn, uid, db]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* <Route path="/home" element={<NftTransaction />} /> */}
            {/* <Route path="/creator" element={<Creators />} /> */}
            <Route path="/home" element={<Help_support />} />
            {/* <Route path="/nftapproval/:requestId" element={<ApprovalNft />} /> */}
            {/* <Route
              path="/creatorapproval/:requestId"
              element={<CreatorApproval />}
            /> */}
            {/* <Route
              path="/collectionApproval/:requestId"
              element={<CollectionApp />}
            /> */}
            <Route path="/" element={<AdminLogin />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
