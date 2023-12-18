import './SearchBar.scss';
import search from 'assets/img/ic_search.png';

interface SearchBarComponentProps {
  searchTerm: string,
  onSearchChange(searchText?: React.ChangeEvent<HTMLInputElement>): void
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
} : SearchBarComponentProps) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search"
        data-testid="search-input"
      />
      <span className="search-bar__icon">
        <img src={search} alt="" />
      </span>
    </div>
  )
}
