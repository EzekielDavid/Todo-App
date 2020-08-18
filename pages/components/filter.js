import React, {useState} from "react";

function Filter(props) {
  const { setFilterSearch } = props;
  const [text, setText] = useState('');
  const handleSubmit = () => {
    setFilterSearch(text)
  }
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true">
         <input type="text" onChange={(e)=>{setText(e.target.value)}}/><span className="visually-hidden" onClick={handleSubmit()}>Search id </span> 
    </button>
  );
}

export default Filter;