import { Router } from 'express';
import apartamentoController from '../controllers/apartamentoController';

const router = new Router();

router.get('/:id', apartamentoController.show);
router.get('/', apartamentoController.index);
router.post('/', apartamentoController.store);
router.put('/:id', apartamentoController.update);
router.delete('/:id', apartamentoController.delete);

export default router;
