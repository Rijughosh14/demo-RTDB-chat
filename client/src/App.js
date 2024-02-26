import './App.css';
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index';



function App() {
  return (
    <>
      <Routes>
      <Route index element={<Index/>}/>
      </Routes>
    </>
  );
}

export default App;
