import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ClientEdit = () => {
  const [client, setClient] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error("Erro ao buscar o cliente:", error);
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
      toast.success("Cliente atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao atualizar o cliente!");
      console.error("Error updating client:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome:
          </label>
          <input
            id="name"
            name="name"
            placeholder="Nome"
            value={client.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf" className="block text-sm font-medium mb-1">
            CPF:
          </label>
          <input
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={client.cpf}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate" className="block text-sm font-medium mb-1">
            Data de aniversário:
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={client.birthDate}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={client.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full block py-2 text-center bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors"
        >
          Editar
        </button>
        <Link
          to="/"
          className="w-full block py-2 text-center bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors mt-4"
        >
          Voltar à lista de clientes
        </Link>
      </form>
    </div>
  );
};

export default ClientEdit;
