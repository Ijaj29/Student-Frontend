import './App.css';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import StudentList from './StudentList';
import EditStud from './EditStud';
import Home from './Home';

function App() {
  return (
    <div className="App container-fluid"> 
      <Navbar/>     
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/studentList' element={<StudentList/>}></Route>
        <Route path='/edit/:id' element={<EditStud/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
