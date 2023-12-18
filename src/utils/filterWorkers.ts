import Worker from 'interfaces/Worker';

export default function filterWorkers(workers: Array<Worker>, searchTerm: string) {
  const searchTermRegex = new RegExp(searchTerm.trim().replace(/\s+/g, '.*'), 'i');

  const filteredItems = workers.filter(worker => {
    return (
      searchTermRegex.test(worker.first_name) ||
      searchTermRegex.test(worker.last_name) ||
      searchTermRegex.test(worker.profession) ||
      searchTermRegex.test(`${worker.first_name} ${worker.last_name}`)
    );
  });

  return filteredItems;
}