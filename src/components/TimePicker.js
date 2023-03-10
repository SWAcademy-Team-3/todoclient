import { useState } from "react";
import TextButton from "./TextButton";

const hourArray = Array.from({ length: 24 }, (_, i) =>
  `${i}`.length === 1 ? `0${i}` : `${i}`
);
const minutesArray = Array.from({ length: 60 }, (_, i) =>
  `${i}`.length === 1 ? `0${i}` : `${i}`
);

export default function TimePicker({ hour, setHour, minutes, setMinutes }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div>
      <span>제한 시간 설정</span>
      <div className="BorderBox" onClick={() => setOpenDropDown(!openDropDown)}>
        <span>
          {hour} : {minutes}
        </span>
      </div>
      {openDropDown && (
        <div className="DropDownContainer">
          <div className="DropDownScrollDiv">
            <ul className="none-list">
              {hourArray.map((value, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: hour === value && "#e5a8a6",
                    padding: "0 8px",
                  }}
                  onClick={() => setHour(value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="DropDownScrollDiv">
            <ul className="none-list">
              {minutesArray.map((value, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: minutes === value && "#e5a8a6",
                    padding: "0 8px",
                  }}
                  onClick={() => setMinutes(value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <TextButton
            text="OK"
            style={{ marginTop: "10px" }}
            onClick={() => setOpenDropDown(false)}
          />
        </div>
      )}
    </div>
  );
}
