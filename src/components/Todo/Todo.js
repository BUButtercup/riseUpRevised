import React, { useState } from 'react';
import TodoForm from './TodoForm';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import './Todo.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div className='todo-text' key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        {/* <FontAwesomeIcon className='delete-icon' icon={faTrashCan}
          onClick={() => removeTodo(todo.id)}
        />  */}
         <DeleteOutlineIcon className='delete-icon'
          onClick={() => removeTodo(todo.id)}/>
         <EditIcon className='edit-icon'
          onClick={() => setEdit({ id: todo.id, value: todo.text })}/>
        {/* <FontAwesomeIcon className='edit-icon' icon={faPenToSquare}
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          
        /> */}
      </div>
    </div>
  ));
};

export default Todo;