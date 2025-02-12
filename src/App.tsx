import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      <p className="text-red-600">Service Discovery Start</p>
    </>
  );
}

export default App;
