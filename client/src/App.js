import './App.css';
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';





function App() {
  return (
    <>
      <Routes>
      <Route index element={<Index/>}/>
      {/* <Route index path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/> */}
      </Routes>
    </>
  );
}

export default App;
