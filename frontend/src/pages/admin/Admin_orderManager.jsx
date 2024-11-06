
import { toast } from 'react-toastify'; 
import { useEffect } from 'react';
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from '../general/LoaderScreen.jsx';

import { useGetOrdersAllQuery } from '../../redux/api/apiSlice_order'; 

const Admin_orderManager = () => {
    const { data: orders, refetch, isLoading, error } = useGetOrdersAllQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <LoaderScreen />;
    }

    if (error) {
        toast.error('Error loading orders.');
        return <div>Error loading orders.</div>;
    };

    return (
        <div className="pl-[10rem] container font-serif mr-[4rem] mt-[4rem]">
        <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
        <h1 className="text-2xl font-semibold mb-4">ORDER MANAGEMENT</h1>
            <h1>All Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div>
                    <h2>Orders JSON</h2>
                    <pre>{JSON.stringify(orders, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Admin_orderManager;