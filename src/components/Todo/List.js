import classes from '../../styles/addtodo.module.css'
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { GrPrevious, GrNext } from "react-icons/gr";

const List = () => {
    const [allPosts, setAllPosts] = useState([])
    const [total, setTotal] = useState()
    const [pagenumber, setPagenumber] = useState(1)
    const [limit, setLimit] = useState(4)
    const token = localStorage.getItem("token")
    const navigate=useNavigate();
    
// https://notes-app-backend-witv.onrender.com

    const usersFun = async () => {
        try {
            const getUsers = await axios.get(`https://notes-app-backend-witv.onrender.com/api/v1/todo/getposts?page=${pagenumber}`, {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                withCredentials: true
            })
            setAllPosts(getUsers.data.todos.reverse())
            setTotal(getUsers.data.total)
            setLimit(getUsers.data.limit)

        }
        catch (error) {
            toast.error(error.response.data.message)
            navigate('/signin')
        }
    }

    useEffect(() => {
        usersFun();
    }, [pagenumber])

    const delHandler = async (id) => {
        try {
            const deluser = await axios.delete(`http://localhost:2000/api/v1/todo/deletepost/${id}`, {
                withCredentials: true
            })
            usersFun();
            toast.success(deluser.data.message)
        }
        catch (error) {
            toast.error(toast.error(error.response.data.message))
        }
    }


    return (
        <>
            <Navbar />
            <div className={classes.addlist}>

                <ul>
                    {allPosts.length === 0 ?
                        <div className={classes.list}>
                            <div className={classes.itemdetails}>
                                <li>No Note found</li>
                            </div>
                        </div>
                        :
                        allPosts.map((post) => (

                            <div className={classes.list} key={post.index}>
                                <div className={classes.itemdetails}>
                                    {/* <li>{!post?post.notes:"No Note Found"}</li> */}
                                    <li>{post.notes}</li>
                                </div>
                                <div className={classes.itemicons}>
                                    <NavLink to={`/update/${post._id}`} style={{ color: 'rgb(152, 152, 221)' }}>
                                        <FaRegEdit />
                                    </NavLink>
                                    <MdOutlineDelete onClick={() => delHandler(post._id)} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div>
            {allPosts.length !== 0 && <div className={classes.navigation}>
                {pagenumber > 1 && <GrPrevious onClick={() => setPagenumber(pagenumber - 1)} style={{ cursor: 'pointer' }} />}
                {pagenumber} of {Math.ceil(total / limit)}
                {pagenumber < (Math.ceil(total / limit)) && <GrNext onClick={() => setPagenumber(pagenumber + 1)} style={{ cursor: 'pointer' }} />}
            </div>}
        </> 
    )
}

export default List;