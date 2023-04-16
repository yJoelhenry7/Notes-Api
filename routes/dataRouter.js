const data = require('../controllers/notesController');
const router = require('express').Router();

// Routes
router.post('/',data.create);
router.get('/',data.getAll);
router.get('/:id',data.get);
router.put('/:id',data.update);
router.delete('/:id',data.delete);

module.exports = router;