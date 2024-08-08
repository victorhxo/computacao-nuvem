import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles.css';

const SearchComponent = ({ onSearchResults }) => {
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      console.log(`Buscando por ${searchType} com valor ${searchValue}`);
      switch (searchType) {
        case 'cpf':
          response = await api.get(`/clients/cpf/${searchValue}`);
          break;
        case 'email':
          response = await api.get(`/clients/email/${searchValue}`);
          break;
        case 'name':
          response = await api.get(`/clients/name/${searchValue}`);
          break;
        default:
          response = await api.get('/clients');
          break;
      }

      console.log('Resposta da API:', response.data);

      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          toast.info('Nenhum cliente encontrado.');
          onSearchResults([]); 
        } else {
          onSearchResults(response.data);
        }
      } else {
        onSearchResults([response.data]); 
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      if (error.response && error.response.status === 404) {
        toast.info('Nenhum cliente encontrado.');
        onSearchResults([]); 
      } else {
        toast.error('Erro ao buscar clientes.');
      }
    }
  };

  const handleClearSearch = async () => { 
    try {
      const response = await api.get('/clients');
      const activeClients = response.data.filter(client => !client.deletedAt);
      onSearchResults(activeClients); 
      setSearchType('name');  
      setSearchValue(''); 
    } catch (error) {
      toast.error('Erro ao carregar clientes.');
      console.error('Error fetching clients:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <div className="form-group">
        <label htmlFor="searchType">Buscar por</label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Nome</option>
          <option value="cpf">CPF</option>
          <option value="email">E-mail</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="searchValue">Valor</label>
        <input
          id="searchValue"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <button type="submit" className="btn btn-primary">Buscar</button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={handleClearSearch}
          id='clear-search'
        >
          Limpar Busca
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
