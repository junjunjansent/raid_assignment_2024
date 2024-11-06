import order from '../models/order_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';


// ------ Add Order
// POST /api/order/
const create_order = asyncHandler(async (req, res) => {
    try {
        const orderNew = new order(req.body);
        await orderNew.save();
        res.status(201).json(orderNew);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid Order Data.');
    }
});
  



// ------ Get id of specific order (for admin)
// GET /api/order/:id


export { 
    create_order
    // get_order_withID,
};