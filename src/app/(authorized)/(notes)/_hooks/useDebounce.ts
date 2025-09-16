import { useCallback, useRef } from "react";

function useDebounceCallback(fn: Function, delay: number) {
  let timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}

export default useDebounceCallback;
