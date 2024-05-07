import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Validation=({input})=>{
    if(input.username.length<=3){
        console.log('username error')
        return toast.error('dalksjdls')
    }


    }

export default Validation;



// Validation(input)---------------------------------
        // if (input.username.length <= 3) {
        //     console.log('Name must have minimum 3 characters')
        //     toast.error('Name must have minimum 3 characters')
        //     setIsError(true)
        //     // return;
        // }
        // if (input.email.length <= 8) {
        //     toast.error('Email must have minimum 8 characters')
        //     // return;
        //     setIsError(true)
        // }
        // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        // if (!emailRegex.test(input.email)) {
        //     // setErrors((prevError) => ({
        //     //     ...prevError,
        //     //     email: "Enter valid Email address"
        //         toast.error("Enter valid Email address")
        //         setIsError(true)
        //     // }))
        // }
        // if (input.password.length <= 8) {
        //     toast.error('Password must have minimum 8 characters')
        //     setIsError(true)
        // }
        // if (input.phone.length < 10) {
        //     toast.error('Phone number must be of 10 digits')
        //     setIsError(true)
        // }
        // else {
        //     const phoneregex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
        //     if (!phoneregex.test(input.phone)) {
        //         // setErrors((prevErr) => ({
        //         //     ...prevErr,
        //         //     phone: 'Enter numbers only'
        //         toast.error('Enter numbers only')
        //         setIsError(true)
        //         // }))
        //     }
        // }

        // if(isError){
        //     return;
        // }