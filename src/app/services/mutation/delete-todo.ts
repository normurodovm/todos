"use server"
const url = process.env.APP_URL

import { revalidateTag } from "next/cache"



export const deletTodo  = async (id:number) => {
    try {
        const res = await fetch(`${url}/todos${id}`,{method:"DELETE"})
        const data = await res.json()
        return data;
      } catch (error) {
        const err = (error as Error).message;
        throw new Error(err);
      }finally{
        revalidateTag("todos");
      }
}