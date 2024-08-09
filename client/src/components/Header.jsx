import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md mb-6">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          to="/"
          className="text-3xl font-bold hover:text-gray-400 transition-colors"
        >
          Gestão de Clientes
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-lg hover:text-gray-400 transition-colors"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to="/clients/new"
                className="text-lg hover:text-gray-400 transition-colors"
              >
                Criar Cliente
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
