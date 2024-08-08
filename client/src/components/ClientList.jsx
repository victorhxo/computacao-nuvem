import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients');
        // Filtra os clientes que não têm o atributo deletedAt
        const activeClients = response.data.filter(client => !client.deletedAt);
        setClients(activeClients);
      } catch (error) {
        toast.error('Error fetching clients.');
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      // Remove o cliente da lista sem atualizar a API
      setClients(clients.filter(client => client.id !== id));
      toast.success('Cliente deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar cliente. ' + error.message);
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="client-list">
      <h2>Client List</h2>
      <Link to="/clients/new" className="btn btn-primary">Create Client</Link>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link to={`/clients/${client.id}`}>{client.name}</Link>
            <button 
              onClick={() => handleDelete(client.id)} 
              className="btn btn-danger"
            >
              Delete
            </button>
            <Link 
              to={`/clients/${client.id}`} 
              className="btn btn-info"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
