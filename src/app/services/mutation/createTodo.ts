"use server";
const url = process.env.APP_URL;

import { revalidateTag } from "next/cache";

export const createTodo = async (newItem: { title: string; description: string }) => {
  try {
    const res = await fetch(`${url}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (!res.ok) {
      throw new Error("Failed to create the item.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    const err = (error as Error).message;
    throw new Error(err);
  } finally {
    revalidateTag("todos");
  }
};
