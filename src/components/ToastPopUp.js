import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import { useState } from "react";

export default function ToastPopUp({ openClass, handleToast, open }) {
  const [periodValue, setPeriodValue] = useState("1");
  const [sortValue, setSortValue] = useState("lastest");
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(open);
  const [endDate, setEndDate] = useState(new Date());

  const handleChangePeriod = (value) => {
    setPeriodValue(value);
  };

  const handleChangeSort = (value) => {
    setSortValue(value);
  };
  return (
    <div className={`${openClass && "modalBackground"}`}>
      <div className={`${openClass} ToastPopUpContainer`}>
        <a
          onClick={() =>
            handleToast(
              periodValue,
              sortValue,
              isOpen,
              periodValue === "custom" ? { startDate, endDate } : null
            )
          }
        >
          확인
        </a>
        <RadioGroup label="조회 기간">
          <Radio
            name="period"
            value="1"
            checked={periodValue === "1"}
            onChange={handleChangePeriod}
          >
            1개월
          </Radio>
          <Radio
            name="period"
            value="3"
            checked={periodValue === "3"}
            onChange={handleChangePeriod}
          >
            3개월
          </Radio>
          <Radio
            name="period"
            value="-1"
            checked={periodValue === "-1"}
            onChange={handleChangePeriod}
          >
            지난달
          </Radio>
          <Radio
            name="period"
            value="custom"
            checked={periodValue === "custom"}
            onChange={handleChangePeriod}
          >
            직접설정
          </Radio>
          {periodValue === "custom" && (
            <div style={{ marginTop: "12px" }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </RadioGroup>
        <RadioGroup label="정렬 선택">
          <Radio
            name="sort"
            value="lastest"
            checked={sortValue === "lastest"}
            onChange={handleChangeSort}
          >
            최신순
          </Radio>
          <Radio
            name="sort"
            value="oldest"
            checked={sortValue === "oldest"}
            onChange={handleChangeSort}
          >
            오래된 순
          </Radio>
        </RadioGroup>
        <RadioGroup label="종류">
          <Radio
            name="type"
            value={true}
            checked={isOpen}
            onChange={() => setIsOpen(true)}
          >
            읽은 편지
          </Radio>
          <Radio
            name="type"
            value={false}
            checked={!isOpen}
            onChange={() => setIsOpen(false)}
          >
            안 읽은 편지
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
