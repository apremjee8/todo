"use client";

import { useDebugValue, useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value); // this is where we will add this to a list
    setValue("");
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='my-10'>
        <h1 className='text-3xl'>To Do</h1>
      </div>
      <div>
        <form className='flex space-x-3' onSubmit={handleSubmit}>
          <div>
            <input
              className='shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline text-slate-700'
              type='text'
              value={value}
              onChange={handleChange}
              placeholder='Add something to do'
            />
          </div>
          <div>
            <button className='shadow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
