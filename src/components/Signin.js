import classes from '../styles/form.module.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom'

const Signin = () => {
    const [input,setInput]=useState([{email:'',password:''}]);
    const navigate=useNavigate();
    const changeHandler=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:2000/api/v1/user/login',input,{
                withCredentials:true
            });
            toast.success(response.data.message)
            navigate('/dashboard')
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className={classes.container}>
        <form className={classes.form} onSubmit={submitHandler}>
        <h1>SignIn</h1>
            <div className={classes.itemContainer}>
                <label>Email:</label>
                <input type='text' name='email'
                value={input.email} onChange={changeHandler} 
                />
            </div>
            <div className={classes.itemContainer}>
                <label>Password:</label>
                <input type='password' name='password'
                value={input.password} onChange={changeHandler} 
                />
            </div>
            <div className={classes.itemContainer}>
                <button type='submit'>Sign In</button>
            </div>
            <p>Not have account <Link to='/'>SignUp</Link></p>
        </form>
        </div>
    )
}

export default Signin;