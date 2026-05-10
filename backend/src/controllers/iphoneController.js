const iphoneService = require('../services/iphoneService');

const getAll = async (req, res) => {
    try {
        const iphones = await iphoneService.getAll();
        res.json(iphones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const iphone = await iphoneService.getById(req.params.id);
        if (!iphone) return res.status(404).json({ message: 'iPhone não encontrado' });
        res.json(iphone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const result = await iphoneService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const result = await iphoneService.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const result = await iphoneService.delete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
