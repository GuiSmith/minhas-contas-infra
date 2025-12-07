import express from 'express';
import billController from '../controllers/billController.js';

const router = express.Router();

router.get('/:id', billController.select);
router.post('/', billController.create);

export default router;