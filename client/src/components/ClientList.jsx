import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import SearchComponent from "./SearchComponent";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  // Função para buscar todos os clientes ativos
  const fetchClients = async () => {
    try {
      const response = await api.get("/clients");
      const activeClients = response.data.filter((client) => !client.deletedAt);
      setClients(activeClients);
    } catch (error) {
      toast.error("Erro ao buscar clientes.");
      console.error("Error fetching clients:", error);
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
      setClients(clients.filter((client) => client.id !== id));
      toast.success("Cliente deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar cliente. " + error.message);
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <SearchComponent onSearchResults={handleSearchResults} />
      <ul className="space-y-4 mt-4">
        {clients.length > 0 ? (
          clients.map((client) => (
            <li
              key={client.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-md shadow-md"
            >
              <Link
                to={`/clients/${client.id}`}
                className="text-lg font-medium text-white hover:underline"
              >
                {client.name}
              </Link>
              <div className="button-group flex space-x-2">
                <Link
                  to={`/clients/${client.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Ver detalhes"
                >
                  <i className="fas fa-eye"></i>
                </Link>
                <Link
                  to={`/clients/edit/${client.id}`}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  title="Editar"
                >
                  <i className="fas fa-edit"></i>
                </Link>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="Excluir"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400">Nenhum cliente encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default ClientList;
