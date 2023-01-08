import "./App.css";
import { Routes, Route } from "react-router-dom";
import UploadFile from "./Components/UploadFile";

function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <header>
        <h1>
          Project
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<UploadFile />} />
      </Routes>
    </div>
  );
}

export default App;
