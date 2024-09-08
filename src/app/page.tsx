import { getData } from "./services/query/get-todo";
import { Card } from "@/components/todo-card";

interface dataType {
  title:string;
  description:string;
  id:number;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="p-2 flex flex-wrap justify-center">
      {data.map((todo) => (
        <Card key={todo.id} {...todo} />
      ))}
    </main>
  );
}
