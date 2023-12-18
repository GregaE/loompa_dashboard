import axios, { AxiosResponse } from 'axios';
import GetWorkersReturn from "../interfaces/GetWorkersReturn";
import DetailedWorker from "../interfaces/DetailedWorker";
import buildUrl from '../utils/buildUrl';

const baseUrl = "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas"

export async function getWorkers(page?: number): Promise<AxiosResponse<GetWorkersReturn>> {
  const url = buildUrl(
    [baseUrl],
    { page: page ?? 1 },
  );

  const response: AxiosResponse<GetWorkersReturn> = await axios.get(
    url,
  );

  return response;
}

export async function getWorker(workerId: string): Promise<AxiosResponse<DetailedWorker>> {
  const url = buildUrl([baseUrl, workerId]);

  const response: AxiosResponse<DetailedWorker> = await axios.get(
    url,
  );

  return response;
}