import { createContext, useCallback, useContext, useState } from "react";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());

  const changeDate = useCallback((value) => {
    setDate(new Date(value));
  });

  const DateToStringFormat = (date) => {
    const year = date.getFullYear();
    const month =
      `${date.getMonth() + 1}`.length === 1
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const day =
      `${date.getDate()}`.length === 1
        ? `0${date.getDate()}`
        : `${date.getDate()}`;
  
    return [year, month, day].join('-');}

  return (
    <DateContext.Provider value={{ date, changeDate, DateToStringFormat }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
