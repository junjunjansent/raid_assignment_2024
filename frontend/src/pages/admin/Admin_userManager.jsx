// import modules
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import logo from '../../assets/groceraid_logo.png';
import LoaderScreen from '../general/LoaderScreen.jsx';

// import slices
import { useGetUsersAllQuery, useDeleteUserMutation } from '../../redux/api/apiSlice_user.js';

// import icons
import { ImBin, ImUserCheck, ImCross } from "react-icons/im";


function Admin_userManager() {
    const { data: users, refetch, isLoading, error } = useGetUsersAllQuery();
    const [deleteUser] = useDeleteUserMutation();
    
    console.log('Fetched users for Troubleshooting:', users);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure")) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (

        <div className="pl-[10rem] container font-serif mr-[4rem] mt-[4rem]">
            <img className='h-16 md:h-20 lg:h-24 w-auto mb-2' src={logo} alt='logo'/>
            <h1 className="text-2xl font-semibold mb-4">USER MANAGEMENT</h1>

            {isLoading ? (
                <LoaderScreen />
            ) : (
            <div className="flex flex-col md:flex-row">

                {/* <AdminMenu /> */}
                <table className="w-full md:w-4/5 mx-0">
                    <thead className='text-white'>
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">NAME</th>
                            <th className="px-4 py-2 text-left">EMAIL</th>
                            <th className="px-4 py-2 text-left">ADMIN</th>
                            <th className="px-4 py-2">DELETE?</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-300'>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-4 py-2">{user._id}</td>
                                <td className="px-4 py-2">{user.username}</td>
                                <td className="px-4 py-2">
                                    <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-center">
                                        {user.adminRights ? (
                                            <ImUserCheck style={{ color: "lightgreen" }} />
                                        ) : (
                                            <ImCross style={{ color: "darkred" }} />
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    {!user.adminRights && (
                                        <div className="flex justify-center">
                                            <button onClick={() => deleteHandler(user._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                            >
                                                <ImBin />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

        </div>
    );
}

export default Admin_userManager;