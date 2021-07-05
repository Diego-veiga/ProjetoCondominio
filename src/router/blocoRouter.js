import { Router } from 'express';
import blocoController from '../controllers/blocoController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/', loginRequired, blocoController.index);
router.get('/:id', loginRequired, blocoController.show);
router.post('/', loginRequired, blocoController.store);
router.put('/:id', loginRequired, blocoController.update);
router.delete('/:id', loginRequired, blocoController.delete);

export default router;
