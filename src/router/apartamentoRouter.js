import { Router } from 'express';
import apartamentoController from '../controllers/apartamentoController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/:id', loginRequired, apartamentoController.show);
router.get('/', loginRequired, apartamentoController.index);
router.post('/', loginRequired, apartamentoController.store);
router.put('/:id', loginRequired, apartamentoController.update);
router.delete('/:id', loginRequired, apartamentoController.delete);

export default router;
