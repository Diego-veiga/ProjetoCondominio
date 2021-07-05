import { Router } from 'express';
import moradoresController from '../controllers/moradoresController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/', loginRequired, moradoresController.store);
router.get('/', loginRequired, moradoresController.index);
router.get('/:id', loginRequired, moradoresController.show);
router.get('/:id_apartamento/apartamento', loginRequired, moradoresController.moradorApartamento);
router.put('/:id', loginRequired, moradoresController.update);
router.delete('/:id', loginRequired, moradoresController.delete);

export default router;
