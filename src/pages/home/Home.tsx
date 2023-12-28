import { useMemo, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import {
  setSearchTerm,
  incrementWorkersPage,
} from "store/workersSlice";
import { useGetWorkersQuery } from 'store/workerApiSlice';
import SearchBar from 'components/search-bar/SearchBar';
import WorkerList from 'components/worker-list/WorkerList';
import filterWorkers from 'utils/filterWorkers';
import './Home.scss';

export default function Home() {
  const dispatch = useAppDispatch();
  const workersPage = useAppSelector((state) => state.workers.workersPage);
  const searchTerm = useAppSelector((state) => state.workers.searchTerm);

  const { data, isLoading } = useGetWorkersQuery(workersPage);

  function handleSearch(search: string) {
    dispatch(setSearchTerm(search));
  }

  const filteredWorkers = useMemo(() => {
    if (data && data.results.length) {
      return filterWorkers(data.results, searchTerm)
    }
    return [];
  }, [data, searchTerm]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries, options) => {
        if (entries[0].isIntersecting) {
          dispatch(incrementWorkersPage())
        }
      }, { rootMargin: "100px" });
      if (node) observer.current.observe(node);
    },[dispatch]);

  return (
    <main className="home-page">
      <div className="home-page__controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleSearch(e.target.value) }}
        />
      </div>
      <h1 data-test="home-header">Find your Oompa Loompa</h1>
      <h2 data-test="home-subheader">There are more than 100k</h2>
      <WorkerList
        workers={filteredWorkers}
        isLoading={isLoading}
        ref={lastPostRef}
      />
    </main>
  );
}

