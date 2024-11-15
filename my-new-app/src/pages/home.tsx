import { useState, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTableContext } from "../context/tablecontext";
import { TableRow } from "../context/tablecontext";
import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

const Home = () => {
  const { tableData, deleteRow, editRow, addRow } = useTableContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

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
      id: 999,
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

  const onSubmit = (data: any) => {
    if (editingRow) {
      if (isAddMode) {
        const newRow: TableRow = {
          id: Date.now(),
          col1: data.name,
          col2: data.email,
          col3: data.role,
          col4: data.mobile,
        };
        addRow(newRow);
        toast.success("Successfully Added!");
      } else {
        editRow(editingRow.id, data);
        toast.success("Successfully Updated!");
      }
      handleModalClose();
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
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Mobile Number</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
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

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={editingRow?.col1}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={isViewMode}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.name && <p className="text-red-500 text-sm">This field is required</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={editingRow?.col2}
                      rules={{
                        required: true,
                        pattern:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={isViewMode}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-sm">Enter the Valid Email Address</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <Controller
                      name="role"
                      control={control}
                      defaultValue={editingRow?.col3}
                      render={({ field }) => (
                        <select
                          {...field}
                          disabled={isViewMode}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="" disabled>Select a role</option>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                          <option value="Moderator">Moderator</option>
                        </select>
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <Controller
                      name="mobile"
                      control={control}
                      defaultValue={editingRow?.col4}
                      rules={{
                        required: true,
                        pattern: /^\d{10}$/
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={isViewMode}
                          className="w-full p-2 border rounded-md"
                        />
                      )}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">Enter The Valid Mobile Number</p>}
                  </div>
                </div>

                <div className="flex-start space-x-4 mt-4">
                  {!isViewMode && (
                    <button
                      type="submit"
                      ref={saveButtonRef}
                      className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 px-4 rounded"
                    >
                      {isAddMode ? "Save" : "Update"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white hover:bg-gray-700 py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
