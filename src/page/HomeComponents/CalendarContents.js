import { useEffect, useState } from "react";
import { useDate } from "../../contexts/dateProvider";

import TextButton from "../../components/TextButton";
import ProgressRate from "../../components/ProgressRate";
import { axios_get } from "../../api/api";
import { useUser } from "../../contexts/userProvider";

const dayNameArr = ["SUN", "MON", "TUE", "WED", "TUR", "FRI", "SAT"];

const CalendarContents = ({ selectedDate, setSelectedDate }) => {
  const { user } = useUser();
  const { date } = useDate();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [dayArr, setDayArr] = useState([]);

  const [hasDay, setHasDay] = useState([]);
  const [getRate, setGetRate] = useState([]);

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

  const calcDay = () => {
    let emptyDayLength = new Date(year, month - 1, 1).getDay();
    let monthDay = new Date(year, month, 0).getDate();
    const emptyDayArray = Array.from({ length: emptyDayLength }, () => "");
    const nowDayArray = Array.from({ length: monthDay }, (_, i) => i + 1);
    setDayArr(() => [...emptyDayArray, ...nowDayArray]);
  };

  const getRateData = async () => {
    const response = await axios_get("calendar", {
      searchYearMonth: `${year}-${month}`,
      memberId: user.memberId,
    });
    const dateArr = [];
    const rateArr = [];
    response.map((val) => {
      dateArr.push(val.date[2]);
      rateArr.push(val.successRate);
    });
    setHasDay(dateArr);
    setGetRate(rateArr);
  };

  useEffect(() => {
    getRateData();
    calcDay();
  }, [month]);

  return (
    <>
      <div style={{ display: "inline-flex", marginBottom: "8px" }}>
        <TextButton onClick={pressBack} text="<" />
        <span>{`${year}년 ${month}월`}</span>
        <TextButton onClick={pressAdvance} text=">" />
      </div>
      <div className="CalendarGridDay">
        {dayNameArr.map((val, idx) => (
          <span key={idx} style={{ textAlign: "center" }}>
            {val}
          </span>
        ))}
      </div>
      <div className="CalendarGrid">
        {dayArr.map((val, index) => {
          return (
            <div
              key={index}
              style={{
                textAlign: "center",
                borderRadius: "50%",
                margin: "auto 0",
              }}
              onClick={() => handleDaySelect(val)}
            >
              {val !== "" &&
                (hasDay.includes(parseInt(val)) ? (
                  <ProgressRate
                    rate={getRate[hasDay.indexOf(parseInt(val))]}
                    size={38}
                    innerContent={val}
                    background={
                      `${selectedDate.getFullYear()}-${
                        selectedDate.getMonth() + 1
                      }-${selectedDate.getDate()}` === `${year}-${month}-${val}`
                    }
                  />
                ) : (
                  <span
                    style={{
                      borderRadius: "50%",
                      background:
                        `${selectedDate.getFullYear()}-${
                          selectedDate.getMonth() + 1
                        }-${selectedDate.getDate()}` ===
                        `${year}-${month}-${val}`
                          ? "#e5a8a6"
                          : "white",
                    }}
                  >
                    {val}
                  </span>
                ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarContents;
