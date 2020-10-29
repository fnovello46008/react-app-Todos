import React, { useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

//Local Storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storedTodos) setTodos(storedTodos)

  },[])

  useEffect(()=>
  {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  //End Local Storage

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo=>todo.id === id)

    todo.complete = !todo.complete

    setTodos(newTodos)

  }

  //Add todo to list
  function handleAddTodo(e){

    const name = todoNameRef.current.value
    if(name === '') return
    console.log(name)

    setTodos(prevTodos=> {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })

    //Clear after todo is entered
    todoNameRef.current.value = null
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete )
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos = { todos } toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add Todo </button>
      <button onClick={clearTodos}> Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>

  )
}

export default App;
