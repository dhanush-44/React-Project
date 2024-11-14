import { useState } from "react";
import Header from "../components/header";
import { useTableContext } from "../context/tablecontext";
import Footer from "../components/footer";
import { TableRow } from "../context/tablecontext";
import { FaUserCircle } from "react-icons/fa";

const Users = ({}) => {
    const { tableData } = useTableContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<TableRow | null>(null);

    const handleViewDetail = (user: TableRow) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null); 
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 md:p-6 lg:p-8 bg-gray-50">
                <section className="container mx-auto">
                    <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-center font-semibold text-gray-800 mb-6">
                        Users List
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {tableData.map(user => (
                            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-center items-center">
                                    <span className="text-5xl text-blue-700">
                                        <FaUserCircle />
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-center text-gray-800">{user.col1}</h2>
                                <div className="mt-4">
                                    <button 
                                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors" 
                                        onClick={() => handleViewDetail(user)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl w-full">
                            <h2 className="text-2xl font-bold text-center mb-4">User Details</h2>
                            <div className="mb-4 flex justify-center items-center h-full">
                                <span className="text-5xl text-blue-700">
                                    <FaUserCircle />
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <p className="text-lg text-gray-800">{selectedUser.col1}</p> 
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <p className="text-lg text-gray-800">{selectedUser.col2}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <p className="text-lg text-gray-800">{selectedUser.col3}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <p className="text-lg text-gray-800">{selectedUser.col4}</p>
                                </div>
                                <div className="flex">
                                    <button
                                        onClick={handleModalClose}
                                        className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Users;
