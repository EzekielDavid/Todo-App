import React, { useState } from "react"; 
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'; 
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel 
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save 
        </button>
      </div>
    </form>
  );

  const viewTemplate = (  
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <EventNoteIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary= {props.name}
    />
    <ListItemSecondaryAction>
      <IconButton edge="end" aria-label="delete" onClick={() => setEditing(true)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={() => props.deleteTask(props.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}