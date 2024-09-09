"use client";

import { getData } from "./services/query/get-todo";
import { createTodo } from "./services/mutation/createTodo";
import { updateTodo } from "./services/mutation/updateTodo";
import { Card } from "@/components/todo-card";
import React, { useState, useEffect } from "react";

// Todo interfeysi
interface Todo {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // Todos list
  const [title, setTitle] = useState<string>(""); // Title uchun state
  const [description, setDescription] = useState<string>(""); // Description uchun state
  const [loading, setLoading] = useState<boolean>(false); // Yuklanish holati
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null); // Tahrirlanayotgan todo ID'si

  // Ma'lumotlarni yuklash uchun effekt
  useEffect(() => {
    async function fetchTodos() {
      const data = await getData();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  // Tahrirlash rejimi boshlanishi
  const startEdit = (todo: Todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodoId(todo.id);
  };

  // Yangi todo yaratish yoki tahrirlangan todo ni saqlash
  const handleSave = async () => {
    if (!title || !description) {
      alert("Please fill in both title and description");
      return;
    }
    setLoading(true);

    try {
      if (editingTodoId) {
        // Tahrirlangan todo ni saqlash
        const updatedTodo = { title, description };
        await updateTodo(editingTodoId, updatedTodo);
        setTodos((prev) =>
          prev.map((todo) => (todo.id === editingTodoId ? { ...todo, ...updatedTodo } : todo))
        );
        setEditingTodoId(null); // Tahrirlash holatini tugatish
      } else {
        // Yangi todo yaratish
        const newTodo = { title, description };
        const createdTodo = await createTodo(newTodo);
        setTodos((prev) => [...prev, createdTodo]);
      }

      setTitle(""); // Inputlarni tozalash
      setDescription("");
    } catch (error) {
      console.error("Error saving todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-2 flex flex-col items-center">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mb-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : editingTodoId ? "Update" : "Create"}
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            {...todo}
            onEdit={() => startEdit(todo)}
          />
        ))}
      </div>
    </main>
  );
}
