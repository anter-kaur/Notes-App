import classes from '../styles/form.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as yup from 'yup'; 

const Signup = () => {
    const [input, setInput] = useState({ username: '', email: '', password: '', phone: '' });
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationSchema=yup.object({
            username:yup.string()
                .min(3,"Name must be of at least 3 characters")    
            .required("Name is required"),
            email:yup.string().required("Email is required").email("Invalid email format"),
            password:yup.string().required("Password is required")
                .min(8,"Password must have atleast 8 characters")
                // .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
            ,phone: yup.string()
                .matches(/^[\d()-\s]{10}$/, "Phone Number must be of 10 digits")
                .required("Phone number is requried"),
        })

        try {
            await validationSchema.validate(input,{abortEarly:false})
            const response = await axios.post('https://notes-app-backend-witv.onrender.com/api/v1/user/register', input)
            toast.success(response.data.message)
            navigate('/signin')
        }
        catch (error) {
            error?.inner?.forEach((err)=>{
                toast.error(err.message)
            })
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>SignUp</h1>
                <div className={classes.itemContainer}>
                    <label>Name:</label>
                    <input type='text' name='username'
                        value={input.username} onChange={changeHandler}
                    />
                </div>
                <div className={classes.itemContainer}>
                    <label>Email:</label>
                    <input type='text' name='email'
                        value={input.email} onChange={changeHandler}
                    />
                </div>
                <div className={classes.itemContainer}>
                    <label>Phone no. :</label>
                    <input type='text' name='phone'
                        value={input.phone} onChange={changeHandler}
                    />
                </div>
                <div className={classes.itemContainer}>
                    <label>Password:</label>
                    <input type='password' name='password'
                        value={input.password} onChange={changeHandler}
                    />
                </div>
                <div className={classes.itemContainer}>
                    <button type='submit'>Sign Up</button>
                </div>
                <p>Already have account <Link to='/signin'>Signin</Link></p>
            </form>
        </div>

    )
}


export default Signup;