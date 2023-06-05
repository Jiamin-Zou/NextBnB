import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.currentUser);

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, []);
  return <div>Profile</div>;
};

export default Profile;
