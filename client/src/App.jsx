import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./components/ClientList.jsx";
import ClientEdit from "./components/ClientEdit";
import ClientDetail from "./components/ClientDetails.jsx";
import Header from "./components/Header.jsx";
import { ClientsProvider } from "./contexts/ClientsContext";
import "./styles.css";

function App() {
  return (
    <Router>
      <ClientsProvider>
        <div className="App bg-gray-800 min-h-screen text-white">
          <Header />
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/clients/edit/:id" element={<ClientEdit />} />
          </Routes>
        </div>
      </ClientsProvider>
    </Router>
  );
}

export default App;
