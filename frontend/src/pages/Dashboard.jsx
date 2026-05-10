import React from 'react';
import { DollarSign, Smartphone, TrendingUp, Clock, Package, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 2000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="glass-card stat-card">
    <div className="stat-icon" style={{ backgroundColor: `${color}20`, color: color }}>
      <Icon size={24} />
    </div>
    <div className="stat-content">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
      {trend && <p className="stat-trend" style={{ color: trend.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>{trend} este mês</p>}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Operacional</h1>
        <p>Visão geral da iDropLab</p>
      </header>

      <div className="stats-grid">
        <StatCard title="Vendas do Mês" value="R$ 12.450,00" icon={DollarSign} color="#00a2ff" trend="+12.5%" />
        <StatCard title="Lucro Realizado" value="R$ 4.200,00" icon={TrendingUp} color="#00ff88" trend="+8.2%" />
        <StatCard title="Aparelhos Vendidos" value="18" icon={Smartphone} color="#a855f7" />
        <StatCard title="Tempo Médio Giro" value="12 dias" icon={Clock} color="#f59e0b" />
      </div>

      <div className="dashboard-grid">
        <div className="glass-card chart-container">
          <h3>Faturamento Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#a0a0a0" />
              <YAxis stroke="#a0a0a0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1d23', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="vendas" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00a2ff' : '#00ff88'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card inventory-summary">
          <h3>Resumo de Estoque</h3>
          <div className="summary-item">
            <Package size={20} color="var(--accent-blue)" />
            <span>Total em Estoque</span>
            <strong>24 un.</strong>
          </div>
          <div className="summary-item">
            <DollarSign size={20} color="var(--accent-green)" />
            <span>Valor em Estoque</span>
            <strong>R$ 45.900,00</strong>
          </div>
          <div className="summary-item">
            <AlertCircle size={20} color="var(--accent-red)" />
            <span>Pendentes Recebimento</span>
            <strong>R$ 8.200,00</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
