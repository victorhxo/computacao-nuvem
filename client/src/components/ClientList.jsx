import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import SearchComponent from './SearchComponent';
import '../styles.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  // Função para buscar todos os clientes ativos
  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      const activeClients = response.data.filter(client => !client.deletedAt);
      setClients(activeClients);
    } catch (error) {
      toast.error('Erro ao buscar clientes.');
      console.error('Error fetching clients:', error);
    }
  };

  // UseEffect para carregar clientes ao montar o componente
  useEffect(() => {
    fetchClients();
  }, []);

  // Função para atualizar a lista de clientes com base na busca
  const handleSearchResults = (results) => {
    setClients(results);
  };

  // Função para deletar um cliente
  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(client => client.id !== id));
      toast.success('Cliente deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar cliente. ' + error.message);
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="client-list">
      <h2>Clientes</h2>
      <SearchComponent onSearchResults={handleSearchResults} />
      <ul>
        {clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.id}>
              <Link to={`/clients/${client.id}`} className="client-name">
                {client.name}
              </Link>
              <div className="button-group">
                <button 
                  onClick={() => handleDelete(client.id)} 
                  className="btn btn-danger"
                  title="Excluir"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <Link 
                  to={`/clients/${client.id}`} 
                  className="btn btn-info"
                  title="Ver detalhes"
                >
                  <i className="fas fa-eye"></i>
                </Link>
                <Link 
                  to={`/clients/edit/${client.id}`} 
                  className="btn btn-warning"
                  title="Editar"
                >
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">Nenhum cliente encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default ClientList;
