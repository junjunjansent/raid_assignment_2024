import asyncHandler from '../middlewares/asyncHandler.js';
import user from '../models/user_Model.js';
import product from '../models/product_Model.js';
import order from '../models/order_Model.js';


// ------ USER: Get all users
// GET /api/user/
const get_usersAll = asyncHandler(async (req, res) => {
  const usersAll = await user.find({});
  res.json(usersAll);
});

// ------ USER: Get id of specific user 
// GET /api/user/:id
const get_user_withID = asyncHandler(async (req, res) => {
  const userSelected = await user.findById(req.params.id).select('-password');

  if (userSelected) {
    res.json(userSelected);
  } else {
    res.status(404);
    throw new Error('User cannot be found.');
  }
});

// ------ USER: Delete specific users
// DELETE /api/user/:id
const delete_user_withID = asyncHandler(async (req, res) => {
  const userSelected = await user.findById(req.params.id);

  if (userSelected) {
    if (userSelected.adminRights) {
      res.status(400);
      throw new Error('Admin cannot delete another admin');
    }
    await user.deleteOne({ _id: userSelected._id });
    res.json({ message: `Admin has removed user: ${userSelected.username}.`});
  } else {
    res.status(404);
    throw new Error('User cannot be found.');
  }
});




// ------ PRODUCT: Add Product
// POST /api/product/
const create_product = asyncHandler(async (req, res) => {
  const {name, image, brand, description, price, stockQty} = req.body;

  // Check missing fields
  if (!name || !image|| !brand|| !description|| !price|| !stockQty) {
      res.status(400);
      throw new Error('All fields required for product creation!');
  };

  // Check if user exists
  const productExisting = await product.findOne({ name, brand });
  if (productExisting) {
      res.status(400);
      throw new Error('Product (Name & Brand) already exists.');
  };
  
  const productNew = new product(req.body);
  try {
      await productNew.save();
      res.status(201).json(productNew);
  } catch (error) {
      res.status(400);
      throw new Error('Invalid Product Data.');
  }
});


// ------ PRODUCT: Delete specific product
// DELETE /api/product/:id
const delete_product_withID = asyncHandler(async (req, res) => {
  try {
    const productSelected = await product.findById(req.params.id);
    console.log(productSelected);
    if (!productSelected) {
      return res.status(404).json({ error: 'Product cannot be found.' });
    }
    await product.deleteOne({ _id: productSelected._id });
    res.json({ message: `${productSelected.name} has been deleted.`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to delete the product.' });
  }
});


// ------ ORDER: Get all orders
// GET /api/order/allorders
const get_ordersALL = asyncHandler(async (req, res) => {
  const ordersAll = await order.find({});
  res.json(ordersAll);
});


export { 
  get_usersAll,
  get_user_withID,
  delete_user_withID,
  create_product,
  delete_product_withID,
  get_ordersALL
};