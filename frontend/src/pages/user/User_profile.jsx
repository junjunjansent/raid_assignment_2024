// import modules
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from '../general/LoaderScreen.jsx';

// import slices
import { useGetUserProfileQuery } from '../../redux/api/apiSlice_user.js';

const User_profile = () => {
    const { data: user, refetch, isLoading, error } = useGetUserProfileQuery();

    console.log('Fetched users:', user);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);

    // const [data_username, setUsername] = useState("");
    // const [data_email, setEmail] = useState("");
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    // Function to fetch a random quote
    const fetchQuote = async () => {
        try {
            const responseQuote = await axios.get('https://dummyjson.com/quotes/random/');
            setQuote(responseQuote.data.quote);
            setAuthor(responseQuote.data.author);
        } catch (err) {
            console.error("Error fetching quote:", err);
        }
    };

    // Run effect when user data changes
    useEffect(() => {
        if (user) {        
            fetchQuote(); 
        }
    }, [user]); 

    return (
        <section className='pl-[10rem] flex flex-wrap font-serif'>
            <div className='mr-[4rem] mt-[5rem]'>
                <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
                
                <h1 className='text-2xl font-semibold mb-4'>Profile Information</h1>

                {isLoading ? (
                    <LoaderScreen />
                ) : error ? (
                    <div className="text-red-500">Error loading user profile.</div>
                ) : (

                    <div className='container w-[40rem]'>

                        <div className="grid grid-cols-[0.5fr_2fr] gap-[2rem] my-[2rem] items-center">
                            <div className='block my-[1rem] text-sm font-large text-white'>Random Quote:</div>
                            <div className='italic text-gray-300'>"{quote}"  <br /> ---  {author}</div>
                        </div>

                        <div className="grid grid-cols-[0.5fr_2fr] gap-[2rem] my-[2rem] items-center">
                            <div className='block text-sm font-large text-white'>Username:</div>
                            <div className='font-semibold text-gray-300'>{user ? user.username : 'N/A'}</div>
                        </div>

                        <div className="grid grid-cols-[0.5fr_2fr] gap-[2rem] my-[2rem] items-center">
                            <div className='block text-sm font-large text-white'>Email Address:</div>
                            <div className='font-semibold text-gray-300'>{user ? user.email : 'N/A'}</div>
                        </div>

                        <Link to='/user_orders' className='bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                            My Orders
                        </Link>
                        

                    </div>
                )}
            </div>
            
        </section>
    );
};

export default User_profile;