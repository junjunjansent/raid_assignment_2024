// import modules
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

// import iconss
import {
    ImHome,
    ImSpoonKnife,
    ImEnter,
    ImUserPlus,
    ImCart,
    ImCool2
} from "react-icons/im";

// import from src
import "./Nav.css";
import logo from '../../assets/groceraid_logo.png';
import { useLogoutMutation } from "../../redux/api/apiSlice_user.js";
import { logout } from "../../redux/features/auth_slice.js";


const Nav = () => {
    const { userInfo } = useSelector((state) => state.login);
//  const { cartItems } = useSelector((state) => state.cart);

    const [dropdownClose, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownClose);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            
            dispatch(logout());
            navigate("/login");
            toast.success(`Successfully logged out.`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"} 
            xl:flex lg:flex md:hidden sm:hidden
            flex-col justify-between p-4 text-white font-serif bg-teal-950 w-[5%] hover:w-[15%] h-[100vh] fixed `}
            id="nav-container"
        >
            {/* ------ Nav Bar Top 3 Icons */}
            <div className="flex flex-col justify-center space-y-4">
                <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2" >
                    <ImHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem] "> HOME   
                    </span>{" "}
                </Link>

                <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
                    <ImSpoonKnife className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>

                <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
                    <ImCart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                    

                    {/* <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div> */}
                </Link>
            </div>

            {/* ------ Nav Bar User Info if Logged In */}
            <div className="relative">
                
                {/* ------ Nav Bar User Info if Logged In: Drop Down Bar */}
                <button onClick={toggleDropdown}
                    className="flex items-center transition-transform transform hover:translate-x-2 text-gray-800"
                >
                    {/* Check if userinfo exists */}
                    {userInfo ? (
                        <span className="text-white text-xs">
                            <ImCool2 className="my-2 mt-[3rem]" size={20} />
                            {userInfo.username}</span>
                    ) : (
                        <></>
                    )}
                </button>
                
                {/* ------ Nav Bar User Info if Logged In: Admin Features */}
                {dropdownClose && userInfo && (
                    <ul
                        className={`absolute left-0 mt-2 ml-1 space-y-0 bg-teal-400 text-gray-600 
                        ${!userInfo.adminRights ? "-top-20" : "-top-60"} `}
                    >
                    
                        {userInfo.adminRights && (<>
                            <li>
                                <Link to="/admin/user_manager" className="block px-4 py-2 hover:bg-gray-100">
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/product_manager" className="block px-4 py-2 hover:bg-gray-100" >
                                    Manage Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/order_manager" className="block px-4 py-2 hover:bg-gray-100" >
                                    Manage Orders
                                </Link>
                            </li>

                        </>)}

                        {/* ------ Nav Bar User Info if Logged In: User Features */}
                        {!userInfo.adminRights && (<>
                            <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                    Profile
                                </Link>
                            </li>
                        </>)}

                        <li>
                            <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}

            </div>

            {/* ------ Nav Bar Bottom 2 Icons */}
            {!userInfo && (
                <div className="flex flex-col justify-center space-y-4">
                        <Link to="/login" className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                            <ImEnter className="mr-2 mt-[4px]" size={26} />
                            <span className="hidden nav-item-name">LOGIN</span>
                        </Link>
                    
                        <Link to="/register" className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                            <ImUserPlus size={26} />
                            <span className="hidden nav-item-name">REGISTER</span>
                        </Link>
                    
                </div>
            )}

        </div>
    );
};

export default Nav;