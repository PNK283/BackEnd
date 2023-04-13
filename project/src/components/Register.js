import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'
import axios from 'axios'

function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const registerSubmit= async(data) =>{
        if(data.password === data.cpassword){
               const userData = {
                user: data.user,
                email: data.email,
                password: data.password
               }
            //    console.log(userData);
               await axios.post('auth/register', userData)
               .then(log => {
                if(log.data.success){
                    toast.success(log.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                else{
                    toast.error(log.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
               })
               .catch(error =>{
                toast.error(error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
               })
        }
        else{
            toast.error("Password doesn't match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

    }
  return (
    <div className='row bgcolor p-4'>
        <h2 className='text-centre text-white pb-1'>Ay! Register here</h2>
         <div className='col-md-5 mx-auto mt-3 py-5 px-5'>
            <div className='card p-3 bg-white'> 
                 <h2 className='pt-2 px-4'>Register</h2>
                 <form className='mt-5 mx-4' onSubmit={handleSubmit(registerSubmit)}>
                    <div className='form-group'>
                        <h5>Name</h5>
                        <input
                            type='text'
                            className='form-control mt-2'
                            placeholder='Enter Name'
                            required autoFocus {...register("user", {required:true, 
                            minLength:6})}/>
                            { errors.user && <p className='text-danger mt-1'>Name should be of 
                            atleast 6 characters</p> }
                        
                    </div>
                    <div className='form-group mt-2'>
                    <h5>Email address</h5>
                        <input
                            type='email'
                            className='form-control mt-2'
                            placeholder='Enter email'
                            required {...register("email",
                            {
                                required:true,
                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                            })}/>
                            {errors.email && <p className='text-danger mt-1'>Please check and enter correct email</p>}
                    </div>
                    <div className='form-group m-2'>
                    <h5>Password</h5>
                        <input
                            type='password'
                            className='form-control mt-2'
                            placeholder='Enter Password'
                            required {...register("password",
                            {
                                required:true,
                                pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })}/>
                            {errors.password && <div>
                            <p className='text-danger'>Password should be of length 6-15</p>
                            <p className='text-danger'>Should Contain atleast one Uppercase, lowercase, number and 
                            special character</p>
                            </div>}
                    </div>
                    <div className='form-group mt-2'>
                    <h5>Confirm Password</h5>
                    <input
                            type='password'
                            className='form-control mt-2'
                            placeholder='Enter Confirm Password'
                            required {...register("cpassword",
                            {
                                required:true,
                                pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                            })}/>
                            {errors.password && <div>
                            <p className='text-danger'>Password should be of length 6-15</p>
                            <p className='text-danger'>Should Contain atleast one Uppercase, lowercase, number and 
                            special character</p>
                            </div>}
                    </div>
                    <div className='text-centre'>
                    <button type='submit' className='submit-btn mt-5'>Submit</button>
                   </div>
                 </form>
                 <Link className='text-primary text-centre my-3' to='/'>Already Registered? Click here to login!</Link>
            </div>
         </div>
         <ToastContainer/>
    </div>
  )
}

export default Register
