import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

// import slice
import { cartQtyChangeCalculator, cartTotalCostCalculator } from "../../cart_Functions/cart_Functions.js";
import { useGetProductsAllQuery } from '../../redux/api/apiSlice_product.js';
import { useGetUserProfileQuery } from '../../redux/api/apiSlice_user.js';
import { useCreateOrderMutation } from '../../redux/api/apiSlice_order.js';

// import assets
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from './LoaderScreen.jsx';
import { ImEnter, ImBin } from "react-icons/im";

const Cart = () => {
    const { data: products, refetch: refetchProducts, isLoading: isLoadingProducts, error: errorProducts} = useGetProductsAllQuery();
    const { data: user, refetch: refetchUser , isLoading: isLoadingUser, error: errorUser } = useGetUserProfileQuery();
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    console.log('Fetched users:', user);
    console.log('Fetched products:', products);
    console.log('Loading state:', isLoadingUser, isLoadingUser, isLoading);
    console.log('Error state:', errorUser, errorProducts);

    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    
    console.log('Products:', products);

    const navigate = useNavigate();

    // Load cart items from localStorage and fetch products
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(cartItems);
        refetchProducts(); 
    }, [refetchProducts]);

    // Calculate total cost whenever products or cartItems change
    useEffect(() => {
        if (products) {
            const total = cartTotalCostCalculator(cartItems, products);
            setTotalCost(total);
        }
    }, [cartItems, products]);

    const cartQtyChangeHandler = (_id, increment) => {
        cartQtyChangeCalculator(cartItems, setCartItems, _id, increment);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const deleteCartItemHandler = (_id) => {
        const updatedCartItems = cartItems.filter(item => item._id !== _id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const checkoutHandler = async () => {

        // Get cart details
        const cartItems = JSON.parse(localStorage.getItem('cartItems'))

        if (!user || cartItems.length === 0) {
            toast.error('User profile or cart items are missing.');
            return;
        }

        // Create order payload
        const orderData = {
            user_id: user._id,
            time: new Date(),
            total_price: totalCost,
            cartItems: cartItems.map(item => ({
                product_id: item._id,
                cart_qty: item.quantity,
                name: item.name,
                brand: item.brand,
                price: item.price,
            }))
        };

        try {
            const res = await createOrder(orderData).unwrap(); // Ensure you have a createOrder function
            navigate('/shop'); // Adjust the navigation path as necessary
            toast.success('Order has been created successfully.');
            localStorage.removeItem('cartItems');
        } catch (err) {
            toast.error(err.data.message);
        }
    };

    if (isLoadingUser || isLoadingUser) return <div><LoaderScreen /></div>;
    if (errorProducts) return (
            <div>Error loading products data.
                {errorProducts && <div className="error-message">{errorProducts.data?.message || errorProducts.error}</div>}
            </div>
        );

    return (
        <div className="pl-[10rem] container font-serif mr-[4rem] mt-[4rem]">
            <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
            <h1 className="text-2xl font-semibold mb-2">It's Shopping Time</h1>
        
            {errorUser ? (
                <div>
                    <p className='mb-4'>But you need to log in to view your cart!</p>
                    <Link to='/login'>
                        <button className='bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded flex items-center'>
                            <ImEnter className="mr-2" size={20} />
                            Go to Login
                        </button>
                    </Link>
                    
                </div>

            ) : cartItems.length === 0 ? (
                <p>Your Cart is Empty :( </p>
            ) : (
                <div className="flex flex-col space-y-4">
                    {cartItems.map(item => {
                        const product = products?.find(p => p._id === item._id);
                        return (
                            <div key={item._id} className="flex items-center p-4 rounded-lg bg-blue-300 text-gray-800 shadow-lg rounded-md overflow-hidden">
                                {product && (
                                    <>
                                        <img src={product.image} alt={product.name} className="sm:max-w-24 md:max-w-36 object-contain mr-6" />
                                        <div className="flex-1 align-top">
                                            <div className='flex-1 flex space-x-2 mb-2'>
                                                <span className='px-3 py-2 rounded text-xs bg-gray-200'>Brand: {product.brand}</span>
                                                <span className='px-3 py-2 rounded text-xs bg-gray-200'>Stock Qty: {product.stockQty}</span>
                                            </div>
                                            <h2 className='font-semibold mb-2 text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                                {product.name}
                                            </h2>
                                            <span className='text-sm font-bold text-gray-500'>SGD {product.price.toFixed(2)}</span>
                                        </div>

                                        <div className="text-xl font-semibold mr-4">
                                            SGD {(product.price * item.quantity).toFixed(2)}
                                        </div>

                                        <div className="flex items-center justify-center mr-4">
                                            <button onClick={() => cartQtyChangeHandler(item._id, -1)} 
                                                className="bg-gray-300 px-2 py-1 rounded">-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button onClick={() => cartQtyChangeHandler(item._id, 1)} 
                                                className="bg-gray-300 px-2 py-1 rounded">+</button>
                                        </div>
                                        
                                        <button onClick={() => deleteCartItemHandler(item._id)}
                                            className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 font-bold"
                                        >
                                            <ImBin />
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                    <div className="mt-4 text-lg font-bold">
                        Total Cost: ${totalCost.toFixed(2)}
                    </div>
                    <button disabled={isLoadingProducts} onClick={checkoutHandler} className="mt-2 bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                        {isLoadingUser ? 'Checking Out...' : 'Checkout'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;

