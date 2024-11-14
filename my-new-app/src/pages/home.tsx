import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTableContext } from "../context/tablecontext";
import { TableRow } from "../context/tablecontext";

const Home = () => {
  const { tableData, deleteRow, editRow } = useTableContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);

  const handleDelete = (id: number) => {
    deleteRow(id);
  };

  const handleEdit = (row: TableRow) => {
    setEditingRow(row);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRow(null);
  };

  const handleSave = () => {
    if (editingRow) {
      editRow(editingRow.id, editingRow);
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-gray-800 mb-6">
                Edit or Delete Users
            </h1>
        </section>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
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
                    <tr className="odd:bg-white even:bg-gray-200 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {row.col1}
                        </th>
                        <td className="px-6 py-4">
                            {row.col2}
                        </td>
                        <td className="px-6 py-4">
                            {row.col3}
                        </td>
                        <td className="px-6 py-4">
                            {row.col4}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEdit(row)}>Edit</a>/
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(row.id)}>Delete</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {isModalOpen && editingRow && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full sm:max-w-md">
              <h2 className="text-2xl text-center mb-4">Edit Row</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tab Col 1
                </label>
                <input
                  type="text"
                  value={editingRow.col1}
                  onChange={(e) => handleInputChange(e, "col1")}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tab Col 2
                </label>
                <input
                  type="text"
                  value={editingRow.col2}
                  onChange={(e) => handleInputChange(e, "col2")}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tab Col 3
                </label>
                <input
                  type="text"
                  value={editingRow.col3}
                  onChange={(e) => handleInputChange(e, "col3")}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tab Col 4
                </label>
                <input
                  type="text"
                  value={editingRow.col4}
                  onChange={(e) => handleInputChange(e, "col4")}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
                >
                  Save
                </button>
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
      <Footer />
    </div>
  );
};

export default Home;
