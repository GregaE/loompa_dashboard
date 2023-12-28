import { useParams } from 'react-router-dom';
import { useGetWorkerQuery } from 'store/workerApiSlice';
import DetailedWorker from 'components/worker/DetailedWorker';

export default function WorkerDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetWorkerQuery(id as string)

  return (
    <main>
      <DetailedWorker worker={data} isLoading={isLoading}/>
    </main>
  );
}