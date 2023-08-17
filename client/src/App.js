import "./App.css";
import {useNavigate} from 'react-router-dom'
import Payment from "./Payment";
import Completion from "./Completion";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home=()=>{
const navigate =useNavigate()
  const handleClick=()=>{
    navigate('/payments')
  }
 return <button onClick={handleClick}>Pay</button>
}
function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
