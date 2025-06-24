

const express = require('express');
const router = express.Router();
const tarefasController = require('../controladores/controladorTarefas');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, tarefasController.listarTarefasDoUsuario);
router.post('/', authMiddleware, tarefasController.criarNovaTarefa);
router.put('/:id', authMiddleware, tarefasController.atualizarTarefa);
router.delete('/:id', authMiddleware, tarefasController.excluirTarefa);

module.exports = router;