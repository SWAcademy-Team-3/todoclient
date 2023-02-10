import { useEffect, useState } from "react";
import { useDate } from "../../contexts/dateProvider";

import TextButton from "../../components/TextButton";
import ProgressRate from "../../components/ProgressRate";

const CalendarContents = ({ setSelectedDate }) => {
  const { date } = useDate();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [dayArr, setDayArr] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

  const pressBack = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const pressAdvance = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDaySelect = (val) => {
    setSelectedDate(new Date(`${year}-${month}-${val}`));
  };

  // useEffect(() => {
  //   setDayArr();
  // }, [year, month]);

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <TextButton onClick={pressBack} text="<" />
        <span>{`${year}년 ${month}월`}</span>
        <TextButton onClick={pressAdvance} text=">" />
      </div>
      <div className="CalendarGrid">
        {dayArr.map((val, index) => {
          return (
            <div
              key={index}
              style={{ textAlign: "center" }}
              onClick={() => handleDaySelect(val)}
            >
              <span>{val}</span>
              {val !== "" && <ProgressRate size={25} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarContents;
