import express from 'express';
import Controllers from '../controllers/cajaControllers.js';

const router = express.Router();

router.post('/caja', Controllers.buscarLibro);
router.post('/caja/remove', Controllers.removeFromCart);
router.post('/caja/checkout', Controllers.checkout);

export default router;
