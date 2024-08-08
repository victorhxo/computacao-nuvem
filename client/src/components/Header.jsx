import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">Gestão de Clientes</h1>
        <nav className="header-nav">
          <ul>
            <li><Link to="/">Clientes</Link></li>
            <li><Link to="/clients/new">Criar Cliente</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
