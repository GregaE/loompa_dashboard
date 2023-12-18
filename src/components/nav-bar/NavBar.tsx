import { Link } from 'react-router-dom';
import './NavBar.scss';
import logo from 'assets/img/logo-umpa-loompa.png';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to={{ pathname: '/' }}>
        <img
          src={logo}
          className="nav-bar__logo"
          alt="logo"
          data-test="nav-logo"
        />
      </Link>
      <span className='nav-bar__title'>
        Oompa Loompa's Crew
      </span>
    </nav>
  );
}