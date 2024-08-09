import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ClientForm = () => {
  const [client, setClient] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/clients", client);
      toast.success("Cliente criado com sucesso!");
      navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      toast.error("Erro ao criar cliente. \n" + message);
      console.error("Error creating client:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Criar Cliente</h2>
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="mb-4">
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
        Criar Cliente
      </button>
    </form>
  );
};

export default ClientForm;
