import { useCallback, useEffect } from "react";

const useSlideBack = (event, startX, handler) => {
  //좌표를 받습니다.
  const handleTouchMove = useCallback(
    ({ targetTouches }) => {
      //좌표의 증가값이 300이상이면
      if (targetTouches[0].screenX >= startX + 300) {
        handler();
      }
    },
    [handler]
  );
  useEffect(() => {
    window.addEventListener(event, handleTouchMove);

    return () => {
      window.removeEventListener(event, handleTouchMove);
    };
  }, [event, handleTouchMove, startX]);
};

export default useSlideBack;
