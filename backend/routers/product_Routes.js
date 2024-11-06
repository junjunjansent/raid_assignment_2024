// from Modules
import express from 'express';

// import middleware authenticators
import { 
    check_userAuthority, 
    check_adminRights } from '../middlewares/authenticator.js';

// from Controllers
import { get_productsALL, get_product_withID } from '../controllers/product_Controller.js';
import { create_product, delete_product_withID } from '../controllers/admin_Controller.js';

//user can view product ID and all products 
//admin can create and delete_product

const router = express.Router();

router
    .route('/')
    .post(check_userAuthority, check_adminRights, create_product); 

router.route('/allproducts').get(get_productsALL);

router
    .route("/:id")
    .get(get_product_withID)
    .delete(check_userAuthority, check_adminRights, delete_product_withID);

export default router;