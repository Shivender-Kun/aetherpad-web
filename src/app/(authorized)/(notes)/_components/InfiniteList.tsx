import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useEffect, useRef } from "react";

type Props<T> = {
  /** Callback; runs when intersecting */
  cb: () => T;
};

const InfiniteList = <T,>({ cb }: Props<T>) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cb();
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [cb]);

  return (
    <div className="flex items-center justify-center px-4 py-2">
      <LoadingSpinner ref={loaderRef} />
    </div>
  );
};

export default InfiniteList;
