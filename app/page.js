"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
// import { addNewTodo } from "@/lib/utils";

export default function Todos() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [todos, setTodos] = useState([]); // list of all todos
  const [task, setTask] = useState(""); // individual task to add

  // get current user
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        const userId = user.data.user.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };
    getUser();
  }, [userId]);

  // select all current todos
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await supabase
          .from("todos")
          .select()
          .eq("user_id", userId);
        if (error) throw error;
        setTodos(data);
        console.log("data: ", data);
      } catch {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getData();
    }
  }, [userId]);

  // add new Todo - can probably move to utils file eventually
  const addNewTodo = async (e) => {
    try {
      if (task && userId) {
        e.preventDefault();
        const { data, error } = await supabase
          .from("todos")
          .insert({
            task,
            user_id: userId,
          })
          .select();
        if (todos) {
          setTodos([...data, ...todos]);
        }
        setTask("");
        if (error) throw error;
        console.log("new task:", data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // delete new Todo
  const deleteTodo = async (id) => {
    try {
      const deleteItem = todos.filter((item) => item.id == id);
      const remainingTodos = todos.filter((item) => item.id !== id);
      setTodos(remainingTodos);
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", deleteItem[0].id);
    } catch (error) {
      console.log("error: ", error);
    }

    // console.log(deleteItem[0].id);
  };

  const renderedTodos = todos.map((item) => {
    return (
      <div key={item.id} className='py-3 px-3 flex justify-between'>
        <div>{item.task}</div>
        <button
          className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => deleteTodo(item.id)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div>
      <div>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={addNewTodo}
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='todo'
            >
              Add To Do
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='task'
              type='text'
              placeholder='Do good'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div>{renderedTodos}</div>
    </div>
  );
}
