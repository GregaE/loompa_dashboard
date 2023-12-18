import Worker from './Worker';

export default interface DetailedWorker extends Worker {
  description: string;
  quota: string;
}