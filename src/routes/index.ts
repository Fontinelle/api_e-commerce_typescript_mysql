import { Router } from 'express';
import v1 from './api/v1';

const router = Router();

router.use('/api/v1', v1);

router.get('/', (req, res) => res.send({ ok: true }));

export default router;
