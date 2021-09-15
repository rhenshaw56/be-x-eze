import { Router } from 'express';
import co from 'co';
import ApiHandler from './handler';

function toGenerator(fn) {
  return function wrapGenerator(req, res, next) {
    co(fn(req, res, next)).catch(next);
  };
}

const router = new Router();

router.route('/search').get(toGenerator(ApiHandler.search));
router.route('/populate').post(toGenerator(ApiHandler.populate));


export default router;
