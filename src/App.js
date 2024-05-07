import './App.css';
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard';
import AddTodo from './components/Todo/AddTodo';
import List from './components/Todo/List'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateTodo from './components/Todo/UpdateTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
    <ToastContainer position='bottom-right' />
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todo' element={<AddTodo />} />
        <Route path='/list' element={<List />} />
        <Route path='/update/:id' element={<UpdateTodo />} />
        
      </Routes>
    </BrowserRouter>
  );
} 

export default App;
