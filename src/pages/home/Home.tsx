import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import {
  fetchWorkers,
  setSearchTerm,
  setFilteredWorkers,
} from "store/workersSlice";
import SearchBar from 'components/search-bar/SearchBar';
import WorkerList from 'components/worker-list/WorkerList';
import useWorkersInfiniteScroll from 'hooks/useWorkersInfiniteScroll';
import './Home.scss';

export default function Home() {
  const { lastPostRef } = useWorkersInfiniteScroll();

  const dispatch = useAppDispatch();
  const isLoadingWorkers = useAppSelector((state) => state.workers.isLoadingWorkers);
  const filteredWorkers = useAppSelector((state) => state.workers.filteredWorkers);
  const searchTerm = useAppSelector((state) => state.workers.searchTerm);

  function handleSearch(search: string) {
    dispatch(setSearchTerm(search));
    dispatch(setFilteredWorkers());
  }

  useEffect(() => {
    dispatch(fetchWorkers(true));
  }, []);

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
        isLoading={isLoadingWorkers}
        ref={lastPostRef}
      />
    </main>
  );
}
