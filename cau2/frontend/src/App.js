import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Button } from "antd";
import Home from "./pages/Home";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
