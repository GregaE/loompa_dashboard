import { useCallback, useRef } from "react";
import { useAppDispatch } from "./reduxHooks";
import { fetchWorkers } from "store/workersSlice";

export default function useWorkersInfiniteScroll() {
  const dispatch = useAppDispatch();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries, options) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchWorkers());
        }
      }, { rootMargin: "100px" });
      if (node) observer.current.observe(node);
    },
    [dispatch]
  );

  return { lastPostRef };
}