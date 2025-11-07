import { useState } from "react";

export const Todo = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTask([...task, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    const updatedTasks = [...task]; 
    updatedTasks.splice(index, 1);  
    setTask(updatedTasks);          
  };

  return (
    <>
      <div className="ml-10 mt-9 p-6">
        <h1 className="text-xl font-bold mb-4">Today's Tasks</h1>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter something..."
            className="h-8 w-64 border rounded-md px-2"
          />
          <button
            type="button"
            onClick={addTask}
            className="border h-8 px-4 rounded bg-stone-200 hover:bg-stone-300 cursor-pointer"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {task.length === 0 ? (
            <p className="text-gray-500">No tasks yet.</p>
          ) : (
            task.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded p-2 bg-stone-50"
              >
                <span>{item}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
