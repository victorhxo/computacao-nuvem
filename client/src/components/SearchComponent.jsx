import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const SearchComponent = ({ onSearchResults }) => {
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      console.log(`Buscando por ${searchType} com valor ${searchValue}`);
      switch (searchType) {
        case "cpf":
          response = await api.get(`/clients/cpf/${searchValue}`);
          break;
        case "email":
          response = await api.get(`/clients/email/${searchValue}`);
          break;
        case "name":
          response = await api.get(`/clients/name/${searchValue}`);
          break;
        default:
          response = await api.get("/clients");
          break;
      }

      console.log("Resposta da API:", response.data);

      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          toast.info("Nenhum cliente encontrado.");
          onSearchResults([]);
        } else {
          onSearchResults(response.data);
        }
      } else {
        onSearchResults([response.data]);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      if (error.response && error.response.status === 404) {
        toast.info("Nenhum cliente encontrado.");
        onSearchResults([]);
      } else {
        toast.error("Erro ao buscar clientes.");
      }
    }
  };

  const handleClearSearch = async () => {
    try {
      const response = await api.get("/clients");
      const activeClients = response.data.filter((client) => !client.deletedAt);
      onSearchResults(activeClients);
      setSearchType("name");
      setSearchValue("");
    } catch (error) {
      toast.error("Erro ao carregar clientes.");
      console.error("Error fetching clients:", error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="space-y-4 p-4 bg-gray-700 rounded-lg shadow-lg"
    >
      <div className="flex flex-col">
        <label htmlFor="searchType" className="text-gray-300">
          Buscar por
        </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="mt-1 block w-full border-gray-400 bg-gray-600 text-white rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-lg p-3"
        >
          <option value="name">Nome</option>
          <option value="cpf">CPF</option>
          <option value="email">E-mail</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="searchValue" className="text-gray-300">
          Valor
        </label>
        <input
          id="searchValue"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
          className="mt-1 block w-full border-gray-400 bg-gray-600 text-white rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-lg p-3"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Buscar
        </button>
        <button
          type="button"
          className="px-6 py-3 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleClearSearch}
        >
          Limpar Busca
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
