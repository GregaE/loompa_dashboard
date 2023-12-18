import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import WorkerSummary from './WorkerSummary';
import WorkerModel from 'interfaces/Worker';
import Skeleton from 'components/skeleton/Skeleton';
import './Worker.scss';

interface WorkerProps {
  worker: WorkerModel,
  isLoading?: boolean,
}

const Worker = forwardRef<HTMLDivElement, WorkerProps>((
  { worker, isLoading },
  ref,
) => {
  return (
    <Link to={{ pathname: `/${worker.id}` }}>
      <div className="worker" ref={ref}>
        <img
          src={worker.image}
          className="worker__image"
          alt="worker profile"
          loading="lazy"
        />
        <WorkerSummary
          first_name={worker.first_name}
          last_name={worker.last_name}
          gender={worker.gender}
          profession={worker.profession}
        />
      </div>
    </Link>
  );
});

export default Worker;
