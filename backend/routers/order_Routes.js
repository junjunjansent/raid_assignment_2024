// from Modules
import express from 'express';

// import middleware authenticators
import { 
    check_userAuthority, 
    check_adminRights } from '../middlewares/authenticator.js';

// from Controllers
import { create_order } from '../controllers/order_Controller.js';
import { get_ordersALL } from '../controllers/admin_Controller.js';
// get_order_withID } from '../controllers/admin_Controller.js';

const router = express.Router();

router.route('/').post(check_userAuthority, create_order)
router.route('/allorders').get(check_userAuthority, check_adminRights, get_ordersALL); 

// router.route("/:id").get(check_userAuthority, check_adminRights, get_order_withID)

export default router;