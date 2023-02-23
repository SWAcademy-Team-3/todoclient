import { createContext, useCallback, useContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, changeUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
