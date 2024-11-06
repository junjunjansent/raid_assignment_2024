import product from '../models/product_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';


// ------ Get all products
// GET /api/product/
const get_productsALL = asyncHandler(async (req, res) => {
    const productsAll = await product.find({});
    res.json(productsAll);
});


// ------ Get id of specific product
// GET /api/product/:id
const get_product_withID = asyncHandler(async (req, res) => {
    const productSelected = await product.findById(req.params.id);
  
    if (productSelected) {
      res.json(productSelected);
    } else {
      res.status(404);
      throw new Error('Product cannot be found.');
    }
  });


export { 
    get_productsALL,
    get_product_withID,
};