import { Router } from 'express';
import blocoController from '../controllers/blocoController';

const router = new Router();

router.get('/', blocoController.index);
router.get('/:id', blocoController.show);
router.post('/', blocoController.store);
router.put('/:id', blocoController.update);
router.delete('/:id', blocoController.delete);

export default router;
