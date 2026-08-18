import express from 'express';
import { createManager, getManager } from '../controllers/managerControllers.js';

const router = express.Router();

router.get('/:cognitoId',getManager);
router.post('/',createManager);
// router.put('/:cognitoId',updateManager);

export default router;