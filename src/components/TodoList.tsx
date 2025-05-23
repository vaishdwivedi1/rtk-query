import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../services/todoApi";

// TodoList component to display and manage a list of todos
export const TodoList = () => {
  // State to manage input value for new todo
  const [newTodo, setNewTodo] = useState("");

  // RTK Query hook to fetch todos from the API
  const { data: todos, isLoading } = useGetTodosQuery();

  // RTK Mutation hooks for adding, updating, and deleting todos
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // Handle form submission to add a new todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the input is not empty
    if (newTodo.trim()) {
      // Call mutation to add the todo
      await addTodo({ title: newTodo.trim(), completed: false });
      setNewTodo(""); // Clear the input field
    }
  };

  // Toggle the completed status of a todo item
  const handleToggle = async (todo: {
    id: number;
    title: string;
    completed: boolean;
  }) => {
    await updateTodo({ ...todo, completed: !todo.completed });
  };

  // Delete a todo item by ID
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  // Show loading message while data is being fetched
  if (isLoading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>

      {/* Form to add a new todo */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* List of todos */}
      <ul className="space-y-3">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center gap-3">
              {/* Checkbox to toggle completed status */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500"
              />
              {/* Display todo title with line-through if completed */}
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>
            </div>
            {/* Button to delete the todo */}
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
