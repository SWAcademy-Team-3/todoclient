export default function ToastPopUp({ openClass, handleToast }) {
  return (
    <div className={`${openClass} ToastPopUpContainer`}>
      <a onClick={handleToast}>확인</a>
      <span>조회기간</span>
      <div className="selectBlockDiv">
        <span>1개월</span>
        <span>3개월</span>
        <span>지난달</span>
        <span>직접설정</span>
      </div>
      <span>정렬선택</span>
      <div>
        <span>최신순</span>
        <span>과거순</span>
      </div>
    </div>
  );
}
