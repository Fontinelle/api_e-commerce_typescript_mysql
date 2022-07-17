import { Router } from 'express';

import store from '../../../controllers/store';
import validation from '../../../middleware/validation';
import storeValidations from '../../../validations/storeValidations';

const router = Router();

router.get('/', store.index);
router.get('/:id', storeValidations.show, validation, store.show);
router.post('/', storeValidations.create, validation, store.create);
router.put('/:id', storeValidations.update, validation, store.update);
router.delete('/:id', storeValidations.remove, validation, store.remove);

export default router;
