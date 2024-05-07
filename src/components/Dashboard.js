import classes from '../styles/form.module.css'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Dashboard = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState('')

    useEffect(()=>{
        async function datafun(){
            try{
            const response=await axios.get('https://notes-app-backend-umber.vercel.app/api/v1/user/dashboard',{
                withCredentials:true
            })
            setUser(response?.data?.user?.username)
        }
        catch(error){
            toast.error(error.response)
            navigate('/signin')
        }
        }
        datafun()
    },[])

    const submitHandler=(e)=>{
        e.preventDefault();
        navigate('/todo')
    } 
    return (
        <>
        <Navbar />
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>{user}, Welcome to Notes App</h1>
                <div className={classes.itemContainer}>
                    <button type='submit'>Add a Note</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Dashboard;