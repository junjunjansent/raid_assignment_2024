// import modules
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

// import assets
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from './LoaderScreen.jsx';

// import slices
import { useLoginMutation } from '../../redux/api/apiSlice_user.js';
import { setCredentials } from '../../redux/features/auth_slice.js';

const Public_login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    // extract data from redux store
    const { userInfo } = useSelector((state) => state.login);        // 'select' portion of state to be reduced

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    // redirects the user to the specified page whenever userInfo changes
    useEffect(() => {
        if (userInfo) {navigate(redirect)}
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (input) => {
        input.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success(`Successfully logged in.`);
        } catch (err) {
            toast.error(err.data.message);
        }
    };

    if (isLoading) return <div><LoaderScreen /></div>;

    return (
        <section className='mr-[4rem] mt-[5rem] pl-[10rem] flex flex-wrap font-serif'>
            <div>
                <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
                
                
                <h1 className='text-2xl font-semibold mb-4'>Finally... we were like, when would you come log in?</h1>

                <form onSubmit={submitHandler} className='container sm:w-[20rem] lg:w-[40rem]'>
                    <div className='my-[2rem]'>
                    <label htmlFor='email' className='block text-sm font-medium text-white'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='mt-1 p-2 border rounded w-full'
                        placeholder='Enter email'
                        value={email}
                        onChange={(input) => setEmail(input.target.value)}
                    />
                    </div>

                    <div className='mb-4'>
                    <label htmlFor='password' className='block text-sm font-medium text-white'>
                        Password
                    </label>

                    <input
                        type='password'
                        id='password'
                        className='mt-1 p-2 border rounded w-full'
                        placeholder='Enter password'
                        value={password}
                        onChange={(input) => setPassword(input.target.value)}
                    />
                    </div>

                    <button disabled={isLoading} type='submit'
                        className='bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                    >
                        {isLoading ? 'Logging In...' : 'Log In'}
                    </button>

                </form>

            </div>
            
        </section>
    );
};

export default Public_login;