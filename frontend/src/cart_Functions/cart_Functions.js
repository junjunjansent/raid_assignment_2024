// Quantity Changers of any items
// (local storage database, State function, data parameter, number)
export const cartQtyChangeCalculator = (cartItems, setCartItems, id, increment) => {
  const updatedCart = cartItems.map(item => {
      if (item._id === id) {
          return { ...item, quantity: Math.max(item.quantity + increment, 1) };
      }
      return item;
  });
  setCartItems(updatedCart);
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
};

// Calculation of Total Costs
// (local storage database, mongoDB database)
export const cartTotalCostCalculator = (cartItems, products) => {
  return cartItems.reduce((sum, item) => {
      const product = products?.find(p => p._id === item._id);
      return sum + (product ? product.price * item.quantity : 0);
  }, 0);
};