// import modules
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../../assets/groceraid_logo.png';

// import slices
import { useCreateUserMutation } from '../../redux/api/apiSlice_user.js';
import { setCredentials } from '../../redux/features/auth_slice.js';

const Public_register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createUser, { isLoading }] = useCreateUserMutation();

    // extract data from redux store
    const { userInfo } = useSelector((state) => state.login);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const submitHandler = async (input) => {
        input.preventDefault();

        if (password !== confirmPassword) {
        toast.error('Passwords DO NOT match :(');
        } else {

            try {
                const res = await createUser({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success(`${username} has been registered.`);
            } catch (err) {
                toast.error(err.data.message);
            }
        }
    };

  return (
    <section className='mr-[4rem] mt-[5rem] pl-[10rem] flex flex-wrap font-serif'>
        <div>
            <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
            
            <h1 className='text-2xl font-semibold mb-4'>Register... cuz imma cool website, not lyk other websites.</h1>

            <form onSubmit={submitHandler} className='container sm:w-[20rem] lg:w-[40rem]'>
                <div className='my-[2rem]'>
                    <label htmlFor='name' className='block text-sm font-medium text-white'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='mt-1 p-2 border rounded w-full'
                        placeholder='Enter name'
                        value={username}
                        onChange={(input) => setUsername(input.target.value)}
                    />
                </div>

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

                <div className='my-[2rem]'>
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

                <div className='my-[2rem]'>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        className='mt-1 p-2 border rounded w-full'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(input) => setConfirmPassword(input.target.value)}
                    />
                </div>

                <button disabled={isLoading} type='submit'
                    className='bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

            </form>
        </div>
        </section>
    );
};

export default Public_register;