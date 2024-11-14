import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useLoading } from '../context/loadingcontext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { setLoadingState } = useLoading();

    const navigateWithDelay = (to: string) => {
        setLoadingState(true);
        setTimeout(() => {
            setLoadingState(false); 
            navigate(to); 
        }, 2000); 
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <nav className="flex items-center justify-between bg-indigo-200 py-4 px-4 lg:px-10 shadow border-solid border-t-2 border-blue-700">
            <div className="flex items-center justify-between w-full">

                <div className="flex items-center flex-shrink-0 text-gray-800">
                    <img src="/blue.png" alt="Logo" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
                </div>

                <div className="lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <span className="sr-only">Show Navigation</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 5h18M3 12h18M3 19h18"
                            />
                        </svg>
                    </button>
                </div>

                <div className="relative w-full lg:w-80 hidden lg:block mx-5">
                    <label className="mb-2 text-sm font-medium text-gray-400 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search....." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </div>

                <div className="hidden lg:flex absolute right-20 space-x-8 mx-8">
                    <button
                        onClick={() => navigateWithDelay('/dashboard')}
                        className="font-medium text-gray-800 hover:text-blue-700"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => navigateWithDelay('/home')}
                        className="font-medium text-gray-800 hover:text-blue-700"
                    >
                        Edit Users
                    </button>
                    <button
                        onClick={() => navigateWithDelay('/users')} 
                        className="font-medium text-gray-800 hover:text-blue-700"
                    >
                        Users List
                    </button>
                    <button
                        onClick={() => navigateWithDelay('/')}
                        className="font-medium text-gray-800 hover:text-blue-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="hidden lg:inline relative ml-auto">
                    <button onClick={toggleMenu} className="text-4xl text-blue-700 hover:text-gray-700 mt-0 lg:mt-0">
                        <FaUserCircle />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300 z-10">
                            <ul className="py-2 text-gray-700">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-700 hover:text-white">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="#"
                                    className="block px-4 py-2 text-sm hover:bg-blue-700 hover:text-white"
                                    onClick={toggleModal}
                                    >
                                        Change Password
                                    </a>
                                </li>
                            </ul>
                        </div>  
                    )}
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 shadow-md">
                    <div className="p-4 flex justify-between items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 text-3xl font-semibold"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-5">
                        <ul className="space-y-4">
                            <li><Link to="/dashboard" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2">Dashboard</Link></li>
                            <li><Link to="/home" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2">Edit Users</Link></li>
                            <li><Link to="/users" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2">User List</Link></li>
                            <li><Link to="#" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2">Profile</Link></li>
                            <li><a href="#" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2" onClick={toggleModal}>Change Password</a></li>
                            <li><Link to="/" className="text-lg text-gray-700 hover:bg-blue-700 hover:text-white block p-2">Logout</Link></li>
                        </ul>
                    </div>
                </div> 
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
                    <div className="bg-indigo-100 p-8 rounded-lg shadow-lg max-w-2xl w-full">
                        <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Change Password</h2>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">Old Password</label>
                                    <input
                                        type="password"
                                        id="old-password"
                                        placeholder="Enter old password"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        placeholder="Enter new password"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            onClick={toggleModal}
                            className="w-full text-black text-3xl mt-2"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
