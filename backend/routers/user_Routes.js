// from Modules
import express from 'express';

// import middleware authenticators
import {
    check_userAuthority,
    check_adminRights } from '../middlewares/authenticator.js';


// from Controllers
import { 
    create_user,
    user_login, 
    user_logout,
    get_userProfile } from '../controllers/user_Controller.js';
import { 
    get_usersAll,
    get_user_withID,
    delete_user_withID } from '../controllers/admin_Controller.js';


const router = express.Router();

router
    .route('/')
    .post(create_user)

// login or logout
router.post('/login', user_login);
router.post('/logout', user_logout);

// user Profile
// no patch request yet
router
    .route('/profile')
    .get(check_userAuthority, get_userProfile);

// admin Profile
// no patch request yet
router.route('/allprofiles').get(check_userAuthority, check_adminRights, get_usersAll);
router
    .route("/:id")
    .get(check_userAuthority, check_adminRights, get_user_withID)
    .delete(check_userAuthority, check_adminRights, delete_user_withID);


export default router;