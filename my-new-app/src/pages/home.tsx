import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTableContext } from "../context/tablecontext";
import { TableRow } from "../context/tablecontext";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const { tableData, deleteRow, editRow, addRow } = useTableContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleDelete = (id: number) => {
    deleteRow(id);
    toast.success("Successfully Deleted!");
  };

  const handleEdit = (row: TableRow) => {
    setEditingRow(row);
    setIsAddMode(false);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingRow({
      id: Date.now(),
      col1: "",
      col2: "",
      col3: "",
      col4: "",
    });
  
    setIsAddMode(true);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleView = (row: TableRow) => {
    setEditingRow(row);
    setIsAddMode(false);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRow(null);
    setIsViewMode(false);
  };

  const handleSave = () => {
    if (editingRow) {
      if (isAddMode) {
        const newRow: TableRow = {
          id: 999,
          col1: editingRow.col1,
          col2: editingRow.col2,
          col3: editingRow.col3,
          col4: editingRow.col4,
        };
        
        // console.log("Adding row:", newRow);
        addRow(newRow);
        toast.success("Successfully Added!");
      } else {
        // console.log("Editing row:", editingRow);
        editRow(editingRow.id, editingRow);
        toast.success("Successfully Updated!"); 
      }
      handleModalClose();
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    col: keyof TableRow
  ) => {
    if (editingRow) {
      setEditingRow({ ...editingRow, [col]: e.target.value });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-8 bg-gray-50">
        <section className="container mx-auto">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-center font-semibold text-gray-800 mb-6">
            Edit or Delete Users
          </h1>
        </section>

        <div className="relative">
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleAdd}
              className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
          
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr className="odd:bg-white even:bg-gray-200 border-b" key={row.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {row.col1}
                    </th>
                    <td className="px-6 py-4">{row.col2}</td>
                    <td className="px-6 py-4">{row.col3}</td>
                    <td className="px-6 py-4">{row.col4}</td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEdit(row)}>
                        Edit
                      </a>{" "} 
                      /{" "}
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleView(row)}>
                        View
                      </a>{" "} 
                      /{" "}
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(row.id)}>
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl w-full">
              <h2 className="text-2xl font-bold text-center mb-4">
                {isAddMode ? "Add User" : isViewMode ? "View User" : "Edit Row"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingRow?.col1}
                    onChange={(e) => handleInputChange(e, "col1")}
                    disabled={isViewMode}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    value={editingRow?.col2}
                    onChange={(e) => handleInputChange(e, "col2")}
                    disabled={isViewMode}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={editingRow?.col3}
                    onChange={(e) => handleInputChange(e, "col3")}
                    disabled={isViewMode}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    value={editingRow?.col4}
                    onChange={(e) => handleInputChange(e, "col4")}
                    disabled={isViewMode} 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex-start space-x-4 mt-4">
                {!isViewMode && (
                  <button
                    onClick={handleSave}
                    className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
                  >
                    {isAddMode ? "Add" : "Save"}
                  </button>
                )}
                <button
                  onClick={handleModalClose}
                  className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Home;
