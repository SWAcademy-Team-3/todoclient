import useTimeout from "./useTimeout";
import { useEffect } from "react";

const useDebounce = (fn, ms, deps) => {
  const [run, clear] = useTimeout(fn, ms);

  useEffect(run, deps);

  return clear;
};

export default useDebounce;
