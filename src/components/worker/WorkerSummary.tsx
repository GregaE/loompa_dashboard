
import { Gender } from "types/Gender";
import './WorkerSummary.scss';

interface WorkerSummaryProps {
  first_name: string,
  last_name: string;
  gender: Gender;
  profession: string;
}

export default function WorkerSummary({
  first_name,
  last_name,
  gender,
  profession,
}: WorkerSummaryProps) {
  return (
    <div className="worker-summary">
      <span className="worker-summary__name">
        { first_name } { last_name }
      </span>
      <span className="worker-summary__gender">
        { gender === 'F' ? 'Woman' : 'Man' }
      </span>
      <span className="worker-summary__profession">
        { profession }
      </span>
    </div>
  );
}
