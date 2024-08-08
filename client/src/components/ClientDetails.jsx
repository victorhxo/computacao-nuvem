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
        toast.error('Erro ao buscar detalhes do cliente.');
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
    return <p>Cliente não encontrado.</p>;
  }

  return (
    <div className="client-details">
      <h2>Detalhes do Cliente</h2>
      <div className="details-container">
        <div className="detail-item">
          <div className="detail-label">Nome</div>
          <div className="detail-value">{client.name}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">CPF</div>
          <div className="detail-value">{client.cpf}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Aniversário</div>
          <div className="detail-value">{client.birthDate}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Email</div>
          <div className="detail-value">{client.email}</div>
        </div>
      </div>
      <Link to="/" className="btn btn-primary">Voltar à lista de clientes</Link>
    </div>
  );
};

export default ClientDetails;
