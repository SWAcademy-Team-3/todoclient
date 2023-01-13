import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useState } from "react";

export default function CalendarToggle() {
  const [isSelect, setIsSelect] = useState(false);

  // TODO 사용자가 터치시에 isSelect 변경시킬것
  // TODO isSelect가 true인 상태에서 재터치시 캘린더를 보여주기
  // TODO isSelect가 true인 상태에서 터치 없을 시 false로 변경
  return (
    <div className="CalendarToggle">
      {isSelect ? (
        <CalendarMonthIcon sx={{ fontSize: "24px", padding: "8px" }} />
      ) : (
        <ArrowBackIosNewIcon sx={{ fontSize: "18px" }} />
      )}
    </div>
  );
}
