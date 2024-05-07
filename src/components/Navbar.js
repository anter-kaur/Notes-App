import classes from '../styles/navbar.module.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate=useNavigate()
    const logoutHandler=async ()=>{
        try{
            const response=await axios.get('https://notes-app-backend-witv.onrender.com/api/v1/user/logout',{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                withCredentials:true
            })
            localStorage.clear()
            toast.success(response.data.message)
            navigate('/signin')
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
    return (
        <nav>
            <div className={classes.nav_part}>
                <h1>NotesApp.</h1>
            </div>
            <div className={classes.nav_part}>
                <ul>

                    <NavLink style={({ isActive }) =>isActive? {color: 'white',background: 'rgb(152, 152, 221)', fontWeight:'bold'}: { color: 'rgb(152, 152, 221)', background: 'white', fontWeight:'bold' }} to='/dashboard'>
                        <li>
                            Home
                        </li>
                    </NavLink>
                    <NavLink style={({ isActive }) =>isActive? {color: 'white',background: 'rgb(152, 152, 221)',fontWeight:'bold'}: { color: 'rgb(152, 152, 221)', background: 'white', fontWeight:'bold' }} to='/list'>
                        <li>
                            Notes
                        </li>
                    </NavLink>
                    <NavLink style={({ isActive }) =>isActive? {color: 'white',background: 'rgb(152, 152, 221)', fontWeight:'bold'}: { color: 'rgb(152, 152, 221)', background: 'white', fontWeight:'bold' }} to='/todo'>
                        <li>
                            Add a Note
                        </li>
                    </NavLink>
                    <button style={{ color: 'rgb(152, 152, 221)', background: 'white', fontWeight:'bold', border:'none',fontSize:'16px' }} onClick={logoutHandler}>
                        <li >
                            Logout
                        </li>
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar