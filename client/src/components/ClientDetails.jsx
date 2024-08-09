import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao buscar detalhes do cliente.");
        console.error("Error fetching client details:", error);
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
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Cliente</h2>
      <div className="space-y-4">
        <div className="detail-item flex justify-between bg-gray-700 p-4 rounded-lg">
          <div className="detail-label font-medium">Nome:</div>
          <div className="detail-value">{client.name}</div>
        </div>
        <div className="detail-item flex justify-between bg-gray-700 p-4 rounded-lg">
          <div className="detail-label font-medium">CPF:</div>
          <div className="detail-value">{client.cpf}</div>
        </div>
        <div className="detail-item flex justify-between bg-gray-700 p-4 rounded-lg">
          <div className="detail-label font-medium">Aniversário:</div>
          <div className="detail-value">{client.birthDate}</div>
        </div>
        <div className="detail-item flex justify-between bg-gray-700 p-4 rounded-lg">
          <div className="detail-label font-medium">Email:</div>
          <div className="detail-value">{client.email}</div>
        </div>
      </div>
      <Link
        to="/"
        className="w-full block py-2 text-center bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-500 transition-colors mt-4"
      >
        Voltar à lista de clientes
      </Link>
    </div>
  );
};

export default ClientDetails;
