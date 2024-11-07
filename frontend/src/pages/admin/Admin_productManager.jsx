// import modules
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// import assets
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from '../general/LoaderScreen.jsx';

// import slices
import { 
    useGetProductsAllQuery,
    useDeleteProductMutation } from '../../redux/api/apiSlice_product.js';

// import icons
import { ImBin } from "react-icons/im";


const Admin_productManager = () => {
    const { data: products, refetch, isLoading, error } = useGetProductsAllQuery();

    const [deleteProduct] = useDeleteProductMutation();
    
    console.log('Fetched products for Troubleshooting:', products); // Log the fetched products

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure")) {
            try {
                await deleteProduct(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (

        <div className="pl-[10rem] container font-serif mr-[4rem] mt-[4rem]">
            <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
            <h1 className="text-2xl font-semibold mb-2">PRODUCT MANAGEMENT</h1>

            {isLoading ? (
                <LoaderScreen />
            ) : (
            <>
            <div className='flex items-center mb-4'>
                <h2 className="text-xl font mr-[4rem]">Total No. of Products: {products.length} </h2>
                <Link to='/admin/create_product' className='bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded cursor-pointer'>
                    Add Products
                </Link>
            </div>
            
            <div className="flex flex-wrap gap-4">
                {products.map((product) => (
                    <div key={product._id}
                        className='mt-4 mr-4 w-72 min-h-[10rem] bg-emerald-400 text-gray-800 shadow-lg rounded-md overflow-hidden'>
                        <img src={product.image} className='object-contain justify-center' alt={product.name} />
                        <div className='p-5 flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex-1 flex space-x-2'>
                                    <span className='px-3 py-2 rounded text-xs bg-gray-200'>{product.brand}</span>
                                    <span className='px-3 py-2 rounded text-xs bg-gray-200'>Stock Qty: {product.stockQty}</span>
                                </div>
                                <button onClick={() => deleteHandler(product._id)}
                                    className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 font-bold"
                                >
                                    <ImBin />
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

export default Admin_productManager;