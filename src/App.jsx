import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import EB1 from "./pages/EB1";
import EB2 from "./pages/EB2";
import EB3 from "./pages/EB3";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EB3 />} />
        <Route path="/EB1" element={<EB1 />} />
        <Route path="/EB2" element={<EB2 />} />
        <Route path="/EB3" element={<EB3 />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
