import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import { Upload } from "./components/Upload/Upload";
import { Items } from "./components/Items/Item";

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path="/" component={Upload} />
          <Route exact path="/items" component={Items} />
        </Router>
    </div>
  );
}

export default App;
