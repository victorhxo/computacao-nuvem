import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientForm from './components/ClientForm.jsx';
import ClientList from './components/ClientList.jsx';
import ClientDetail from './components/ClientDetails.jsx';
import Header from './components/Header.jsx';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
