import classes from '../../styles/addtodo.module.css'
import Navbar from '../Navbar';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo=()=>{
    const [notes,setNotes]=useState('')
    const {id}=useParams()
    const navigate=useNavigate();

    useEffect(()=>{
        async function fetchdata(){
            try{
            const response=await axios.get(`https://notes-app-backend-witv.onrender.com/api/v1/todo/getsinglepost/${id}`)
            setNotes(response.data.notes.notes)
            }
            catch(error){
            toast.error(error.response.data.message)
            }
        }
        fetchdata();
    },[])

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
        const response=await axios.patch(`https://notes-app-backend-witv.onrender.com/api/v1/todo/updatepost/${id}`,{notes:notes},
            {withCredentials:true}
        )
        toast.success(response.data.message)
        navigate('/list')
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }


    return(
        <>
        <Navbar />
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>Update Note</h1>
                <div className={classes.itemContainer} style={{width:'40vw'}}>
                <input type='text' name='notes' value={notes} onChange={(e)=>setNotes(e.target.value)} />
                </div>
                <div className={classes.itemContainer}>
                <button type='submit' className={classes.itemContainer}>Update</button>
                </div>
            </form>
            </div>
            
        </>
    )
}

export default UpdateTodo;