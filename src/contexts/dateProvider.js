import { createContext, useCallback, useContext, useState } from "react";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());

  const changeDate = useCallback((value) => {
    setDate(new Date(value));
  });

  return (
    <DateContext.Provider value={{ date, changeDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
