const clienteService = require('../services/clienteService');

const getAll = async (req, res) => {
    try {
        const clientes = await clienteService.getAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const result = await clienteService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    create
};
