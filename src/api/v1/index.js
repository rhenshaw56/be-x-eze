import { Router } from 'express';
import Ctrl from './controller';

const router = new Router();

router.route('/search').get(Ctrl.search);
router.route('/populate').post(Ctrl.populate);


export default router;
