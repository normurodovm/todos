"use client";

import { deletTodo } from '@/app/services/mutation/delete-todo';
import React from 'react';

interface DataType {
  title: string;
  description: string;
  id: number;
  onEdit: () => void; // Edit tugmasi bosilganda ishga tushadigan funksiya
}

export const Card: React.FC<DataType> = ({ title, description, id, onEdit }) => {
  const [loading, startTransition] = React.useTransition();

  const deleteItem = () => {
    startTransition(() => {
      deletTodo(id)
        .then(() => {
          console.log(`Item with ID ${id} deleted successfully.`);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    });
  };

  return (
    <div className="w-[400px] h-[300px] border text-center">
      <div className="mt-5">
        <h3 className="text-[20px] font-bold">{title}</h3>
        <p className="text-[13px] font-normal text-blue-500">{description}</p>
        <p className="card-id">ID: {id}</p>
      </div>
      <div className="flex justify-center gap-5">
        <button
          onClick={deleteItem}
          className="h-[60px] px-7 rounded-2xl bg-red-500 hover:bg-red-700 text-white"
        >
          {loading ? "Loading..." : "Delete"}
        </button>
        <button
          onClick={onEdit}
          className="h-[60px] px-7 rounded-2xl bg-green-400 hover:bg-green-700 text-white"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
