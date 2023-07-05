// Import required modules
import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./App.css";
import Todos from "./Todos";

// Define actions as constants
export const ACTIONS = {
  ADD_TODO: "add-item",
  DELETE_TODOS: "delete-todos",
  DELETE_ONE: "delete-one",
};

// Reducer function to manage state updates based on dispatched actions
function reducer(todos, { payload, type }) {
  switch (type) {
    case ACTIONS.ADD_TODO:
      // Add a new todo item to the existing todos array
      return [
        ...todos,
        { content: payload.newTodo, id: payload.id }
      ];
    case ACTIONS.DELETE_ONE:
      // Remove a single todo item based on its ID
      return todos.filter((todo) => todo.id !== payload.id);
    case ACTIONS.DELETE_TODOS:
      // Remove multiple todo items based on the list of selected IDs
      return todos.filter((todo) => !payload.selectedTodos.includes(todo.id));
    default:
      return todos; // Return the unchanged todos if the action type is not recognized
  }
}



function App() {
  // State variables using useState hook
  const [inputValue, setInputValue] = useState('');
  const [todos, dispatch] = useReducer(reducer, []);

  //The following are two useEffect hooks used to store the todos in order to persist 
  //through renders
  useEffect(()=>{
    //This useEffect will fetech the Previously added todos from the local storage 
    //and add run the dispatch function to add those todos to the current todos list
    const storedtodos=JSON.parse(localStorage.getItem('todos'))
    storedtodos.map(stodo=>{
      dispatch({ type: ACTIONS.ADD_TODO, payload: { newTodo: stodo.content, id:stodo.id } });
    })
  },[])


  useEffect(()=>{
    //A simple useEffect to make changes to the todos in local storage using the API,
    // everytime there is a change.
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  // Function to handle form submission
  const handleSubmit = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { newTodo: inputValue, id:Date.now() } });
  };

  return (
    <div className="App">
      <Container style={{ width: '500px' }} className="d-flex justify-content-center mt-5 flex-column">
        <h1 className="align-self-center text-danger">Todos</h1>
        <Form>
          <Form.Group className="align-self-center mt-5">
            <Form.Control
              type="text"
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
              required
              placeholder="What needs to be done?"
            />
          </Form.Group>
          <Button onClick={handleSubmit} className="bg-secondary mt-2">
            Submit
          </Button>
        </Form>
        <div>
          {/* Pass the todos and dispatch function to Todos component */}
          <Todos todos={todos} dispatch={dispatch} />
        </div>
      </Container>
    </div>
  );
}

export default App;
