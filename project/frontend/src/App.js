import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";


 

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
       
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
         

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
