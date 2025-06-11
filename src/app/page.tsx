import AddTodoModal from "@/ui/organisms/AddTodoModal";
import TodoCard from "@/ui/organisms/TodoCard";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export default async function Home() {

  const todos = await prisma.todo.findMany();

  return (
    <div className="py-10 px-30 bg-gradient-to-br from-green-100 to-purple-100 min-h-screen w-full flex items-stretch text-gray-800">
      <div className="flex flex-col bg-white p-10 shadow-md rounded-2xl w-full">

        <h1 className="text-3xl font-semibold mb-6">Study Todo App</h1>

        <p className=" text-xl font-medium mb-4">{`Today's Tasks`}</p>

        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            time={todo.time}
          />
        ))}

        <AddTodoModal />
      </div>
    </div>
  );
}
