import { ReactDOM, useReducer, useState } from "react";
import React from "react";
import {Button, Container, Form} from 'react-bootstrap'
import './App.css'
import Todos from "./Todos";

export const ACTIONS={
  ADD_TODO:'add-item',
  DELETE_TODOS:'delete-todos',
  DELETE_ONE:'delete-one'
}
function reducer(todos,{payload,type})
  {
    switch(type)
    {
      case ACTIONS.ADD_TODO:
        return(
          [...todos,
           {content: payload.newTodo,
            id:Date.now()
          }]
        )
        case ACTIONS.DELETE_ONE:
          return(todos.filter(todo=>(todo.id!==payload.id)))
        

        case ACTIONS.DELETE_TODOS:
          return(todos.filter(todo=>!payload.selectedTodos.includes(todo.id)))
    }    
    }
  
function App() {
  const [inputValue,setInputValue]=useState('')
  const [todos,dispatch]=useReducer(reducer,[])
  
  return (
    
    <div className="App">
    <Container style={{width:'500px' }} className="d-flex justify-content-center mt-5 flex-column">
      <h1 className="align-self-center text-danger">Todos</h1>
         <Form>
         <Form.Group className="align-self-center mt-5">
         <Form.Control type="text" onChange={(event)=>setInputValue(event.target.value)} value={inputValue} required placeholder="What needs to be done?"/>
         
         </Form.Group>
         <Button onClick={()=>dispatch({type:ACTIONS.ADD_TODO, payload:{newTodo:inputValue}})} className="bg-secondary mt-2">Submit</Button>
         </Form>
         <div>
          <Todos todos={todos} dispatch={dispatch} />
      </div>
         </Container>
      
    </div>
  );
}

export default App;
