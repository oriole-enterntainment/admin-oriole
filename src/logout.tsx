import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logOut, auth } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { UserDataAction } from "./redux/slice/userData";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logOut()
      .then(() => {
        dispatch(UserDataAction.logout());
        navigate("/");
        window?.location.reload();
      })
      .catch(() => {
        dispatch(UserDataAction.logout());
        navigate("/");
        window?.location.reload();
      });
  }, [navigate, dispatch]);

  return <></>;
};
export default Logout;
