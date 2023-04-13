import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginpic from '../assests/Home_image.png'
import axios from 'axios'
    
function Login() {
  const [email,setEmail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
    const loginSubmit= (e) =>{
      e.preventDefault()
      const userData = {
        email, password
      }
      try {
          axios.post('/auth/login', userData)
          .then(log =>{
            if (log.data.success) {
              //console.log(userData)
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
                localStorage.setItem("data", JSON.stringify(log.data.token))
                navigate('/dashboard')
            } else {
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
      } catch (error) {
           console.log(error)
      }

    }
  return (
    <div className='row bgcolor  py-4'>
       <h1 className='text-white text-centre'>Ay! Welcome back to Login Page</h1>
       <div className='col-md-6'>
              <img src={loginpic} width="450px" height="450px" alt=''/>
       </div>
              <div className='col-md-4 py-2 mt-3'>
                 <div className='card p-3 bg-white'>
                       <h2>Login</h2>
                       <form onSubmit={loginSubmit} className='mt-5 mx-4'>
                            <div className='form-group'>
                              <h5>Email Address</h5>
                              <input type="email" 
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                              className='form-control'
                               placeholder='Enter email'
                                required autoFocus
                               />
                            </div>
                            <div className='form-group mt-4'>
                              <h5>Password</h5>
                              <input type="password" 
                              value={password}
                              onChange={(e)=>setpassword(e.target.value)}
                              className='form-control'
                               placeholder='password'
                                required
                               />
                            </div>
                            <div className='text-centre'>
                                <button type='submit' className='mt-5 submit-btn'>Submit</button>
                            </div>
                       </form>
                       <Link className='text-primary text-centre my-3' to='/register'>Not Registered? Click here!</Link>
                 </div>
              </div>
              <ToastContainer/>
    </div>
  )
}

export default Login
