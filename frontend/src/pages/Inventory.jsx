import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Smartphone, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { iphoneService } from '../services/api';
import './Inventory.css';

const Inventory = () => {
  const [iphones, setIphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    modelo: '',
    armazenamento: '',
    cor: '',
    estado: 'Semi-novo',
    saude_bateria: 100,
    data_compra: new Date().toISOString().split('T')[0],
    valor_compra: '',
    status: 'Em estoque',
    observacoes: ''
  });

  useEffect(() => {
    fetchIphones();
  }, []);

  const fetchIphones = async () => {
    try {
      const response = await iphoneService.getAll();
      setIphones(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar iPhones:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await iphoneService.update(editingId, formData);
      } else {
        await iphoneService.create(formData);
      }
      setShowModal(false);
      setEditingId(null);
      resetForm();
      fetchIphones();
    } catch (error) {
      console.error('Erro ao salvar iPhone:', error);
    }
  };

  const handleEdit = (iphone) => {
    setEditingId(iphone.id);
    setFormData({
      modelo: iphone.modelo,
      armazenamento: iphone.armazenamento,
      cor: iphone.cor,
      estado: iphone.estado,
      saude_bateria: iphone.saude_bateria,
      data_compra: iphone.data_compra ? iphone.data_compra.split('T')[0] : '',
      valor_compra: iphone.valor_compra,
      status: iphone.status,
      observacoes: iphone.observacoes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aparelho?')) {
      try {
        await iphoneService.delete(id);
        fetchIphones();
      } catch (error) {
        console.error('Erro ao excluir iPhone:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      modelo: '',
      armazenamento: '',
      cor: '',
      estado: 'Semi-novo',
      saude_bateria: 100,
      data_compra: new Date().toISOString().split('T')[0],
      valor_compra: '',
      status: 'Em estoque',
      observacoes: ''
    });
  };

  const filteredIphones = iphones.filter(iphone => 
    iphone.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iphone.cor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Em estoque': return <span className="badge badge-stock"><CheckCircle size={14}/> Em estoque</span>;
      case 'Vendido': return <span className="badge badge-sold"><Smartphone size={14}/> Vendido</span>;
      case 'Parcelado': return <span className="badge badge-pending"><Clock size={14}/> Parcelado</span>;
      default: return null;
    }
  };

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <div>
          <h1>Estoque de iPhones</h1>
          <p>Gerencie seus aparelhos e acompanhe o status de cada um</p>
        </div>
        <button className="btn btn-primary btn-with-icon" onClick={() => { resetForm(); setEditingId(null); setShowModal(true); }}>
          <Plus size={20} />
          Novo Aparelho
        </button>
      </header>

      <div className="inventory-controls glass-card">
        <div className="search-box">
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Buscar por modelo ou cor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary btn-with-icon">
          <Filter size={20} />
          Filtros
        </button>
      </div>

      <div className="glass-card table-container">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Armazenamento</th>
                <th>Cor</th>
                <th>Saúde</th>
                <th>Compra</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredIphones.length > 0 ? (
                filteredIphones.map((iphone) => (
                  <tr key={iphone.id}>
                    <td className="font-bold">{iphone.modelo}</td>
                    <td>{iphone.armazenamento}</td>
                    <td>{iphone.cor}</td>
                    <td>
                      <div className="battery-health">
                        <div className="battery-bar">
                          <div className="battery-fill" style={{ width: `${iphone.saude_bateria}%`, backgroundColor: iphone.saude_bateria > 85 ? 'var(--accent-green)' : 'var(--accent-red)' }}></div>
                        </div>
                        <span>{iphone.saude_bateria}%</span>
                      </div>
                    </td>
                    <td>{new Date(iphone.data_compra).toLocaleDateString()}</td>
                    <td className="price-cell">R$ {iphone.valor_compra.toLocaleString()}</td>
                    <td>{getStatusBadge(iphone.status)}</td>
                    <td className="actions-cell">
                      <button className="action-btn edit" onClick={() => handleEdit(iphone)} title="Editar"><Edit size={18}/></button>
                      <button className="action-btn delete" onClick={() => handleDelete(iphone.id)} title="Excluir"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-row">Nenhum aparelho encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <h2>{editingId ? 'Editar Aparelho' : 'Cadastrar Novo iPhone'}</h2>
            <form onSubmit={handleSubmit} className="inventory-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Modelo</label>
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleInputChange} required placeholder="Ex: iPhone 13 Pro" />
                </div>
                <div className="form-group">
                  <label>Armazenamento</label>
                  <input type="text" name="armazenamento" value={formData.armazenamento} onChange={handleInputChange} required placeholder="Ex: 128GB" />
                </div>
                <div className="form-group">
                  <label>Cor</label>
                  <input type="text" name="cor" value={formData.cor} onChange={handleInputChange} required placeholder="Ex: Azul Sierra" />
                </div>
                <div className="form-group">
                  <label>Saúde da Bateria (%)</label>
                  <input type="number" name="saude_bateria" value={formData.saude_bateria} onChange={handleInputChange} required min="0" max="100" />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleInputChange}>
                    <option value="Novo">Novo (Lacrado)</option>
                    <option value="Semi-novo">Semi-novo</option>
                    <option value="Usado">Usado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Em estoque">Em estoque</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Parcelado">Parcelado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Data de Compra</label>
                  <input type="date" name="data_compra" value={formData.data_compra} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Valor de Compra (R$)</label>
                  <input type="number" step="0.01" name="valor_compra" value={formData.valor_compra} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Observações</label>
                <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="3"></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Salvar Alterações' : 'Cadastrar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
