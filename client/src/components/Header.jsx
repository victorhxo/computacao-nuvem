import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Client List</Link></li>
          <li><Link to="/clients/new">Create Client</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
