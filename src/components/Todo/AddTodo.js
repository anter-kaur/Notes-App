import classes from '../../styles/addtodo.module.css'
import Navbar from '../Navbar';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo=()=>{
    const [notes,setNotes]=useState('')

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
        const response=await axios.post('https://notes-app-backend-witv.onrender.com/api/v1/todo/addpost',{notes:notes},
            {withCredentials:true}
        )
        // console.log(response.data.message)
        toast.success(response.data.message)
        console.log(response)
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
                <h1>Add a Note</h1>
                <div className={classes.itemContainer} style={{width:'40vw'}}>
                <input type='text' name='notes' value={notes} onChange={(e)=>setNotes(e.target.value)} />
                </div>
                <div className={classes.itemContainer}>
                <button type='submit' className={classes.itemContainer}>Add</button>
                </div>
            </form>
            </div>
            
        </>
    )
}

export default AddTodo;