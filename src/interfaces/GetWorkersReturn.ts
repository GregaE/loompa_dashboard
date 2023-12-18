import Worker from './Worker';

export default interface GetWorkersReturn {
  current: number,
  results: Array<Worker>,
  total: number,
}