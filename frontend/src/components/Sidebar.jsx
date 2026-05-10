import React from 'react';
import { LayoutDashboard, Smartphone, Users, DollarSign, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar glass-card">
      <div className="logo">
        <Smartphone size={32} color="#00a2ff" />
        <span>iDropLab</span>
      </div>
      <nav>
        <a href="/" className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="/iphones" className="nav-item">
          <Smartphone size={20} />
          <span>Estoque</span>
        </a>
        <a href="/clientes" className="nav-item">
          <Users size={20} />
          <span>Clientes</span>
        </a>
        <a href="/financeiro" className="nav-item">
          <DollarSign size={20} />
          <span>Financeiro</span>
        </a>
      </nav>
      <div className="sidebar-footer">
        <a href="/config" className="nav-item">
          <Settings size={20} />
          <span>Configurações</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
