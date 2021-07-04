import { Router } from 'express';
import moradoresController from '../controllers/moradoresController';

const router = new Router();

router.post('/', moradoresController.store);
router.get('/', moradoresController.index);
router.get('/:id', moradoresController.show);
router.get('/:id_apartamento/apartamento', moradoresController.moradorApartamento);
router.put('/:id', moradoresController.update);
router.delete('/:id', moradoresController.delete);

export default router;
