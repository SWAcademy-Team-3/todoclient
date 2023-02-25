import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCookie } from "../service/Cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    memberId: null,
    newLetterCount: null,
    coinCount: null,
  });

  const changeUserData = useCallback((value) => {
    setUser(value);
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")))
  }, [])

  return (
    <UserContext.Provider value={{ user, changeUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
