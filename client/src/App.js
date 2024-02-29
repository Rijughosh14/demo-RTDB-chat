import './App.css';
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Home from './pages/Home/Home';




function App() {
  return (
    <>
      <Routes>
      <Route index element={<Home/>}/>
      {/* <Route path='/home' element={<Home/>}/> */}
      </Routes>
    </>
  );
}

export default App;
