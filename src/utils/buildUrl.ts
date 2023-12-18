import KeyValuePair from '../types/KeyValuePair';

function buildQuery(queryParams?: KeyValuePair<string | number | boolean>): string {
  if (!queryParams) return '';
  return Object
    .keys(queryParams)
    .reduce((query, paramKey, index) => `${query}${index > 0 ? '&' : ''}${paramKey}=${queryParams[paramKey]}`, '?');
}

function buildUrl<T extends string | number | boolean> (
  pathSegments: Array<string>,
  queryParams?: KeyValuePair<T>,
): string {
  return `${pathSegments.join('/')}${buildQuery(queryParams)}`;
}

export default buildUrl;
