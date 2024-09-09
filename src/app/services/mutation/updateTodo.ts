"use server";
const url = process.env.APP_URL;

export const updateTodo = async (id: number, updatedItem: { title: string; description: string }) => {
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    if (!res.ok) {
      throw new Error("Failed to update the item.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    const err = (error as Error).message;
    throw new Error(err);
  }
};
