import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  },[])

  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
    console.log(todos);

    saveToLS();
  }
  
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos);

    saveToLS();

  }

  const handleDelete = (e,id) => {
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos);

    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS();
  }
  
  
 

  return (
    <>
    
    <Navbar/>
    <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <div className="addTodo">
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className="w-1/2 my-5"/>
        <button onClick={handleAdd} disabled={todo.length<3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-3 py-1 font-bold text-white rounded-md mx-6">Save</button>
      </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item=>{

        
         return  <div key={item.id} className="todo flex w-full my-3 justify-between">
          <div className="flex gap-5">
          <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons">
              <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2">Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-2">Delete</button>
            </div>
          </div>
            })}
        </div>
    </div>
    </>
  )
}

export default App
