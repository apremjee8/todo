export default function AddToDo() {
  return (
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
  );
}
