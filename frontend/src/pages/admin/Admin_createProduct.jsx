// import modules
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../../assets/groceraid_logo.png';

// import slices
import { 
    useCreateProductMutation,
    useUploadImageMutation } from '../../redux/api/apiSlice_product';

const Admin_createProduct = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQty, setStockQty] = useState(0);

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [uploadImage] = useUploadImageMutation();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const uploadImageHandler = async (input) => {
        const formData = new FormData();
        formData.append('image', input.target.files[0]);
    
        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    const submitHandler = async (input) => {
        input.preventDefault();
        try {
            const res = await createProduct({ name, image, brand, description, price, stockQty }).unwrap();
            navigate('/admin/product_manager');
            toast.success(`${name} has been created.`);
        } catch (err) {
            toast.error(err.data.message);
        }
    };

    // const submitHandler = async (input) => {
    //     input.preventDefault();
    
    //     try {
    //       const productData = new FormData();
    //       productData.append('image', image);
    //       productData.append('name', name);
    //       productData.append('description', description);
    //       productData.append('price', price);
    //       productData.append('category', category);
    //       productData.append('quantity', quantity);
    //       productData.append('brand', brand);
    //       productData.append('countInStock', stock);
    
    //       const { data } = await createProduct(productData);
    
    //       if (data.error) {
    //         toast.error('Product create failed. Try Again.');
    //       } else {
    //         toast.success(`${data.name} is created`);
    //         navigate('/');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       toast.error('Product create failed. Try Again.');
    //     }
    //   };

    return (
        <section className='mr-[4rem] mt-[5rem] pl-[10rem] flex flex-wrap font-serif'>
            <div>
                <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
                <h1 className='text-2xl font-semibold mb-2'>CREATE PRODUCT</h1>

                <form onSubmit={submitHandler} className='container flex flex-col space-y-4 sm:w-[20rem] lg:w-[40rem]'>

                    {/* <!-- First Row --> */}
                    <div className='flex space-x-2'>
                        <div className='flex-1'>
                            <label htmlFor='name' className='block text-sm font-medium text-white'>
                                    Name
                            </label> 
                            <input type='text' className='p-2 border rounded w-full mt-1'
                                placeholder='Product Name' 
                                value={name} onChange={(input) => setName(input.target.value)}
                                />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor='brand' className='block text-sm font-medium text-white'>
                                    Brand
                            </label> 
                            <input type='text' className='p-2 border rounded w-full mt-1'
                                placeholder='Product Brand' 
                                value={brand} onChange={(input) => setBrand(input.target.value)}
                                />
                        </div>
                    </div>

                    {/* <!-- Second Row --> */}
                    <div className='flex space-x-2'>
                        <div className='flex-1'>
                            {imageUrl && (
                                <div className='text-center mt-3'>
                                    <img src={imageUrl} alt='product' className='block mx-auto max-h-[200px]' />
                                </div>
                            )}
                            <div className='mt-2'>
                                <label className='border text-white text-center items-center px-4 py-2 block w-full rounded-lg cursor-pointer font-bold '>
                                    {image ? image.name : 'Upload Image'}
                                    <input type='file' name='image'
                                    accept='image/*'
                                    onChange={uploadImageHandler} className={!image ? 'hidden' : 'text-white'}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label htmlFor='price' className='block text-sm font-medium text-white'>
                                        Price
                                </label> 
                                <input type='text' className='p-2 border rounded w-full mt-1'
                                    placeholder='Input Price' 
                                    value={price} onChange={(input) => setPrice(input.target.value)}
                                    />
                            </div>
                            <div>
                                <label htmlFor='stockQty' className='block text-sm font-medium text-white'>
                                        Stock Quantity
                                </label> 
                                <input type='text' className='p-2 border rounded w-full mt-1'
                                    placeholder='Input Stock Quantity' 
                                    value={stockQty} onChange={(input) => setStockQty(input.target.value)}
                                    />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Third Row --> */}
                    <div className='flex-1'>
                        <label htmlFor='description' className='block text-sm font-medium text-white'>
                            Description
                        </label> 
                        <textarea type='text' className='p-2 border rounded w-full h-32 mt-1 align-text-top text-wrap'
                            placeholder='Input Stock Quantity' 
                            value={description} onChange={(input) => setDescription(input.target.value)}
                        />
                    </div>

                    {/* <!-- Submit Button --> */}
                    <div>
                        <button disabled={isLoading} type='submit'
                            className='bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                        >
                                {isLoading ? 'Lessa Create...' : 'Create Item'}
                        </button>
                    </div>
                    
                </form>
            </div>
        </section>
    );
};

export default Admin_createProduct;