import user from '../models/user_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import generate_webToken from '../utils/generate_webToken.js';


// ------ Register User + Get Token
// POST /api/user/
const create_user = asyncHandler(async (req, res) => {
    const {username, password, email} = req.body;

    // Encrypt password if have time
    // make non case sensitive if have time

    // Check missing fields
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('Unable to create account with missing fields.');
    };

    // Check if user exists
    const userExisting = await user.findOne({ 
        $or: [ { email },{ username } ]
    });
    if (userExisting) {
        res.status(400);
        throw new Error('User already exists.');
    };
    
    // Create new user in database. 201 for new resource creation, 401 for invalid user data
    const userNew = new user({username, password, email});
    try {
        await userNew.save();
        generate_webToken(res, userNew._id);
        res.status(201).json({
            _id: userNew._id,
            username: userNew.username,
            email: userNew.email,
            adminRights: userNew.adminRights
        });
    } catch (error) {
        res.status(400);
        throw new Error('Invalid User Data.');
    }
});


// ------ Login User + Get Token
// POST /api/user/login
const user_login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExisting = await user.findOne({ email });

    // console check if passwords actually match
    console.log(email);
    console.log(password);
    console.log(userExisting.password);

    if (userExisting) {
        const check_Password = (password === userExisting.password);
        if (check_Password) {
            generate_webToken(res, userExisting._id);
            res.status(201).json({
                _id: userExisting._id,
                username: userExisting.username,
                email: userExisting.email,
                adminRights: userExisting.adminRights
            });
            return;
            
        } else {
            res.status(401);
            throw new Error('Incorrect Password.');
        }
    };
});


// ------ Logout User & Remove Token
// POST /api/user/logout
const user_logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
    
    res.status(200).json({ message: "Logged out successfully" });
});


// ------ Get user profile
// GET /api/user/profile
const get_userProfile = asyncHandler(async (req, res) => {
    const userCurrent = await user.findById(req.userMiddle._id);
  
    if (userCurrent) {
      res.json({
        _id: userCurrent._id,
        username: userCurrent.username,
        email: userCurrent.email
      });
    } else {
      res.status(404);
      throw new Error('User cannot be found.');
    }
});

export { 
    create_user,
    user_login,
    user_logout,
    get_userProfile
};
