import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles.css';

const ClientEdit = () => {
  const [client, setClient] = useState({ name: '', cpf: '', birthDate: '', email: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error('Erro ao buscar o cliente:', error);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/clients/${id}`, client);
      toast.success('Cliente atualizado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao atualizar o cliente!');
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="client-form-container">
      <form onSubmit={handleSubmit} className="client-form">
        <h2>Editar Cliente</h2>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            placeholder="Nome"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={client.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Data de aniversário</label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={client.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Editar</button>
        <Link to="/" className="btn btn-primary" id='btn-back-client-list'>Voltar à lista de clientes</Link>
      </form>
    </div>
  );
};

export default ClientEdit;
