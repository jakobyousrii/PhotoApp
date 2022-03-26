import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LikedImages from './pages/LikedImages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/liked" element={<LikedImages/>}/> 
      </Routes>
    </div>
  );
}

export default App;
