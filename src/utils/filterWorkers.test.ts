import filterWorkers from './filterWorkers';
import Worker from 'interfaces/Worker';

describe('filterWorkers', () => {
  const mockWorkers = [
    { first_name: 'John', last_name: 'Doe', profession: 'Developer' },
    { first_name: 'Jane', last_name: 'Doe', profession: 'Designer' },
    { first_name: 'Bob', last_name: 'Smith', profession: 'Manager' },
  ] as Array<Worker>;

  it('should filter workers based on first name', () => {
    const searchTerm = 'John';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([{ first_name: 'John', last_name: 'Doe', profession: 'Developer' }]);
  });

  it('should filter workers based on last name', () => {
    const searchTerm = 'Doe';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([
      { first_name: 'John', last_name: 'Doe', profession: 'Developer' },
      { first_name: 'Jane', last_name: 'Doe', profession: 'Designer' },
    ]);
  });

  it('should filter workers based on profession', () => {
    const searchTerm = 'Manager';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([{ first_name: 'Bob', last_name: 'Smith', profession: 'Manager' }]);
  });

  it('should filter workers based on full name', () => {
    const searchTerm = 'Jane D';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([{ first_name: 'Jane', last_name: 'Doe', profession: 'Designer' }]);
  });

  it('should handle case-insensitive search', () => {
    const searchTerm = 'BOB';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([{ first_name: 'Bob', last_name: 'Smith', profession: 'Manager' }]);
  });

  it('should handle search with multiple spaces', () => {
    const searchTerm = 'Jane   Doe';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([{ first_name: 'Jane', last_name: 'Doe', profession: 'Designer' }]);
  });

  it('should handle empty search term', () => {
    const searchTerm = '';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual(mockWorkers);
  });

  it('should handle no match', () => {
    const searchTerm = 'Nonexistent';
    const result = filterWorkers(mockWorkers, searchTerm);
    expect(result).toEqual([]);
  });
});