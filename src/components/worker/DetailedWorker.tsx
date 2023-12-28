import DOMPurify from 'dompurify';
import WorkerSummary from './WorkerSummary';
import DetailedWorkerModel from 'interfaces/DetailedWorker';
import Skeleton from 'components/skeleton/Skeleton';
import './DetailedWorker.scss';

interface WorkerProps {
  worker?: DetailedWorkerModel,
  isLoading?: boolean,
}

export default function Worker({ worker, isLoading }: WorkerProps) {
  return (
    <div className="detailed-worker">
      <div className="detailed-worker__image">
        { isLoading || !worker ? <Skeleton
            width={100}
            fullHeight
          /> : <img src={worker.image} alt="worker profile" /> 
        }    
      </div>
      <div className="detailed-worker__details">
        { isLoading || !worker ? <Skeleton
            width={60}
            height={4}
          /> : <WorkerSummary
            first_name={worker.first_name}
            last_name={worker.last_name}
            gender={worker.gender}
            profession={worker.profession}
          />
        }
        { isLoading || !worker ? <Skeleton
            width={100}
            height={9}
          /> : <p
            className="detailed-worker__description"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(worker.description) }}
          />
        } 
      </div>
    </div>
  );
}