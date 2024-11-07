// import modules
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// import slices
import { useGetProductsAllQuery } from '../../redux/api/apiSlice_product.js';

// import assets
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from './LoaderScreen.jsx';
import { ImCart } from "react-icons/im";

const Shop = () => {
    const { data: products, refetch, isLoading, error } = useGetProductsAllQuery();
    
    console.log('Fetched products:', products);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);

    console.log('Fetched products for Troubleshooting:', products); // Log the fetched products

    const addToCart = (product) => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemExists = storedCartItems.find(item => item._id === product._id);
    
        if (cartItemExists) {
            cartItemExists.quantity += 1; // Increment quantity if already in cart
        } else {
            storedCartItems.push({
                _id: product._id,
                quantity: 1,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image
            });
        }
    
        localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
        alert(`${product.name} added to cart! :)`);
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (

        <div className="pl-[10rem] container font-serif mr-[4rem] mt-[4rem]">
            <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
            <h1 className="text-2xl font-semibold mb-2">It's Shopping Time</h1>

            {isLoading ? (
                <LoaderScreen />
            ) : (
            <>
            <div className='flex items-center mb-4'>
                <h2 className="text-xl font mr-[4rem]">Total No. of Products: {products.length} </h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
                {products.map((product) => (
                    <div key={product._id}
                        className='mt-4 mr-4 w-72 min-h-[10rem] bg-blue-300 text-gray-800 shadow-lg rounded-md overflow-hidden'>
                        <img src={product.image} className='object-contain justify-center' alt={product.name} />
                        <div className='p-5 flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex-1 flex space-x-2'>
                                    <span className='px-3 py-2 rounded text-xs bg-gray-200'>{product.brand}</span>
                                    <span className='px-3 py-2 rounded text-xs bg-gray-200'>Stock Qty: {product.stockQty}</span>
                                </div>
                                <button onClick={() => addToCart(product)}
                                    className="px-3 py-2 rounded bg-emerald-500 hover:bg-emerald-600 font-bold"
                                >
                                    <ImCart />
                                </button>

                            </div>
                            <h2 className='font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                {product.name}
                            </h2>
                            <div>
                                <span className='text-xl font-bold' step='0.01'>SGD {product.price.toFixed(2)}</span>
                            </div>
                            <div>
                                <span className='justify-between text-sm opacity-70'>{product.description}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            </>)}
        </div>
    );
};

export default Shop;