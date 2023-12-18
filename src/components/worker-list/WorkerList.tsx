import { forwardRef } from 'react';
import WorkerModel from 'interfaces/Worker';
import Worker from 'components/worker/Worker';
import Skeleton from 'components/skeleton/Skeleton';
import './WorkerList.scss';

interface WorkerListProps {
  workers: WorkerModel[];
  isLoading?: boolean;
}

const WorkerList = forwardRef<HTMLDivElement, WorkerListProps>((props, ref) => {
  return (
    <div className='worker-list'>
      {
        props.workers.map((worker: WorkerModel, index) => {
          if (props.workers.length === index + 1) {
            return <Worker ref={ref} key={worker.id} worker={worker} />;
          }
          return <Worker key={worker.id} worker={worker} />;
        })
      }
      {
        props.isLoading && (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              show={true}
              width={100}
              height={22}
            />
          ))
        )
      }
    </div>
  );
});

export default WorkerList;
