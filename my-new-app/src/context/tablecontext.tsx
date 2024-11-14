import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TableRow {
  id: number;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

interface TableContextType {
  tableData: TableRow[];
  deleteRow: (id: number) => void;
  editRow: (id: number, updatedRow: TableRow) => void;
  addRow: (newRow: TableRow) => void; 
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tableData, setTableData] = useState<TableRow[]>([
    { id: 1, col1: "Kiran", col2: "kiran@example.com", col3: "Admin", col4: "7865765435" },
    { id: 2, col1: "Dheeraj", col2: "dheeraj@example.com", col3: "Moderator", col4: "9878675463" },
    { id: 3, col1: "Sundar", col2: "sundar@example.com", col3: "User", col4: "6789768754" },
    { id: 4, col1: "Deepak", col2: "deepak@example.com", col3: "User", col4: "8967456754" },
    { id: 5, col1: "Pradeep", col2: "prdeep@example.com", col3: "User", col4: "8756784569" },
    { id: 6, col1: "Dhanush", col2: "dhanush@example.com", col3: "Admin", col4: "7687686567" },
    { id: 7, col1: "Chinmay", col2: "chinmay@example.com", col3: "Moderator", col4: "7865765435" },
    { id: 8, col1: "Karthik", col2: "karthik@example.com", col3: "User", col4: "9878675463" },
  ]);

  const deleteRow = (id: number) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
  };

  const editRow = (id: number, updatedRow: TableRow) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...updatedRow } : row))
    );
  };

  // const addRow = (newRow: TableRow) => {
  //   setTableData((prev) => [...prev, newRow]);
  // };

  const addRow = (newRow: TableRow) => {
    const newId = tableData.length > 0 ? Math.max(...tableData.map((row) => row.id)) + 1 : 1;
    const rowWithId: TableRow = { ...newRow, id: newId };
    setTableData((prev) => [...prev, rowWithId]);
  };
  
  

  return (
    <TableContext.Provider value={{ tableData, deleteRow, editRow, addRow }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
