import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/iphones" element={<Inventory />} />
            <Route path="/clientes" element={<div style={{marginLeft: '300px', padding: '40px'}}><h1>Clientes (Em breve)</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
