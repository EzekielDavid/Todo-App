import React, { useState, useEffect } from "react";
import Todo from "./components/todo";
import Form from "./components/form";
import FilterButton from "./components/filter"; 
import { List } from "@material-ui/core"

const url = `https://my-json-server.typicode.com/wsh-startup/mock-api/tasks`;

export default function Home(props) { 
  const [tasks, setTasks] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  let taskList = [];
  
  if(tasks.length == 0){
    fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      // jsonData is parsed json object received from url 
      setTasks(jsonData);
    })
    .catch((error) => { 
      console.error(error)
    });
  }

  
  if(filterSearch.length > 0){
    let filteredData = tasks.find(item => item.id == filterSearch); 
    taskList.push(
      <Todo
        id={filteredData.id}
        name={filteredData.title}
        completed={filteredData.completed}
        key={filteredData.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  } else{
     taskList = tasks.map(task => (
        <Todo
          id={task.id}
          name={task.title}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )); 
  }
  
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => { 
      if (id === task.id) { 
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    if(tasks){ 
      const [lastItem] = tasks.slice(-1) 
      const lastID = lastItem.id++; 
      const newTask = { id: lastID , title: name, completed: false }; 
      setTasks([...tasks, newTask]); 
    }
  }
  
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, title: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton setFilterSearch={setFilterSearch} />
      </div>
      <h2 id="list-heading">Task List</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <List >
        {taskList}
        </List>
      </ul>
    </div>
  );
}
