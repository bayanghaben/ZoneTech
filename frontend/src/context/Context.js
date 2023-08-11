import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const allData = createContext();

const AllDataProvider = ({ children }) => {
  const [signedInUser, setSignedUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCurrentUser = async () => {
    const user = JSON.parse(localStorage.getItem("token")) || null;
    if (user) {
      setSignedUser(user);
      const jwtToken = user;
      const decodedToken = jwtDecode(jwtToken);
      const fetchedUser = await axios.get(
        `http://localhost:3001/api/v1/users?id=${decodedToken.id}`
      );
      const userFound = fetchedUser.data.data.user;
      setCurrentUser(userFound);
    } else {
      setCurrentUser({});
      setSignedUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [refresh]);

  const valueToShare = {
    signedInUser,
    setSignedUser,
    currentUser,
    setCurrentUser,
    refresh,
    setRefresh,
    totalPrice,
    setTotalPrice,
  };

  return <allData.Provider value={valueToShare}>{children}</allData.Provider>;
};

export default AllDataProvider;
