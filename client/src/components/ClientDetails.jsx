import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles.css';

const ClientDetails = () => {
  const { id } = useParams(); // Captura o ID do cliente da URL
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching client details.');
        console.error('Error fetching client details:', error);
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!client) {
    return <p>Client não encontrado.</p>;
  }

  return (
    <div className="client-details">
      <h2>Cliente</h2>
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <p id="name">{client.name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <p id="cpf">{client.cpf}</p>
      </div>
      <div className="form-group">
        <label htmlFor="birthDate">Aniversário:</label>
        <p id="birthDate">{client.birthDate}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <p id="email">{client.email}</p>
      </div>
      <Link to="/" className="btn btn-primary">Voltar a lista de clientes</Link>
    </div>
  );
};

export default ClientDetails;
