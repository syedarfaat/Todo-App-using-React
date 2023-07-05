import React, { useEffect, useState } from 'react'
import { ACTIONS } from './App'
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function Todos({todos,dispatch}) {
    const [ntodos,changetodos]=useState(0)
    const [selectedTodos,changeSelectedTodos]=useState([])
    useEffect(()=>{
        changetodos(todos.length)
    },[todos])
    const handleCheckbox=(id)=>{
        if(selectedTodos.includes(id))
        {
            changeSelectedTodos(prevTodos=>prevTodos.filter((todo)=>{
                return todo!==id
            }))
            
        }
        else{
            return changeSelectedTodos((prevTodos)=>{
                return [...prevTodos,id]
            })
        }

    }
    console.log(selectedTodos)
    const handleDelete = (id, event) => {
        event.preventDefault(); // Prevent form submission and page refresh

        dispatch({ type: ACTIONS.DELETE_ONE, payload: { id } });
      };

      const handleDeleteAll = (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        dispatch({ type: ACTIONS.DELETE_TODOS, payload: { selectedTodos } });
        changeSelectedTodos([])
      }


    
  return (
    <div className="d-flex flex-column mt-2 flex-grow-1">
    <ListGroup>
    <Form>
    <Form.Group>
      {todos.map((todo)=>{
       return(
        <ListGroupItem>
        <div className='d-flex flex-row justify-content-between'>
        <Form.Check
            type='checkbox'
            onChange={() => handleCheckbox(todo.id)}
            label={todo.content}  
            checked={selectedTodos.includes(todo.id)}
            >
        </Form.Check>
        <div>
             <button
                 onClick={(event) => handleDelete(todo.id, event)}
                 style={{backgroundColor:'transparent', border:'none',color:'red' }}>x
             </button>
        </div>
        </div>

        </ListGroupItem>
       
  )})}
  </Form.Group>
  </Form>
  <ListGroupItem style={{height:'auto'}} className='d-flex flex-row justify-content-between'>
        <em>{ntodos} items left</em>
        <div> <button style={{backgroundColor:'transparent', border:'none',color:'black', cursor:'pointer'}}
        onClick={(event) => handleDeleteAll(event)}
        >clear completed</button></div>
        
  </ListGroupItem>
  </ListGroup>
  </div>
   
  )
}
