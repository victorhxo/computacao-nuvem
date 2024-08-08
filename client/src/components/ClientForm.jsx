import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../styles.css';

const ClientForm = () => {
  const [client, setClient] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', client);
      toast.success('Cliente criado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao criar cliente. ' + error);
      console.error('Error creating client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h2>Create Client</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          value={client.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
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
        <label htmlFor="birthDate">Birth Date:</label>
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
        <label htmlFor="email">Email:</label>
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
      <button type="submit">Create Client</button>
    </form>
  );
};

export default ClientForm;
