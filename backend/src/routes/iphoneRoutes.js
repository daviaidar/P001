const express = require('express');
const router = express.Router();
const iphoneController = require('../controllers/iphoneController');

router.get('/', iphoneController.getAll);
router.get('/:id', iphoneController.getById);
router.post('/', iphoneController.create);
router.put('/:id', iphoneController.update);
router.delete('/:id', iphoneController.remove);

module.exports = router;
