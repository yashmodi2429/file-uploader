import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Upload.css';

export function Upload() {
  const [files, setFiles] = useState(null);

  function onChangeHandler(event) {
    console.log(event.target.files[0]);
    setFiles(event.target.files[0]);
  }

  function onClickHandler() {
    const data = new FormData();
    data.append("file", files);
    axios.post("http://localhost:8000/api/upload", data).then((res) => {
      console.log(res.statusText);
    });
  }
  return (
    <div>
      <header>
        <div>
        <h2>Upload CSV file</h2>
        <span><Link to='/items'>View List</Link></span>
        </div>
        <div>
          <input type="file" name="file" onChange={onChangeHandler} />
          <button type="button" onClick={onClickHandler}>
            Upload
          </button>
        </div>
      </header>
    </div>
  );
}
