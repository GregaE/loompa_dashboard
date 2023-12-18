import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWorker } from 'store/workersSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import DetailedWorker from 'components/worker/DetailedWorker';

export default function WorkerDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const worker = useAppSelector((state) => state.workers.currentWorker);
  const isLoading = useAppSelector((state) => state.workers.isLoadingCurrentWorker);

  useEffect(() => {
    if (id) dispatch(fetchWorker(id));
  }, [id]);

  return (
    <main>
      { <DetailedWorker worker={worker} isLoading={isLoading}/> }
    </main>
  );
}