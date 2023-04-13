import React, {useEffect, useState}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [name, setName] = useState(null)
  const navigate = useNavigate()
     const updateSubmit= () =>{

     }
     const loadData = async() =>{
      try {
         const token = await JSON.parse(localStorage.getItem('data'))
         const res = await axios.get('/auth/userdata', {
          headers:{
              Authorization: `Bearer ${token}`
          }
         })
         if(res.data.success){
          setName(res.data.data)
         }else{
          navigate('/')
         }
        
      } catch (error) {
        console.log(error);
      }
     }
     useEffect( ()=>{
      loadData()
     }, [])
  return (
    <div className='container'>
        <div className='bg-success p-5'>
               <h1 className='text-white text-center'>Dashboard</h1>
        </div>
        <div className='mt-5 p-3'>
            <button className='btn m-3 btn-danger float-end'>Logout</button>
             <br />

             <h2 className='mt-5'>{name?.user}</h2>
             <h2>{name?.email}</h2>
        </div>

        <div className='mt-4'>
          <div className='col-md-5 mx-auto mt-3 p-5'>
             <div className='card p-3 bg-white'>
                 <h2 className='pt-2 px-4 text-center'>Update Details</h2>
                 <form className='mt-5 mx-4' onSubmit={updateSubmit}>
                    <div className='form-group'>
                       <h5>Name</h5>
                       <input type='text' className='form-control' readOnly/>
                    </div>
                    <div className='form-group mt-4'>
                       <h5>Email</h5>
                       <input type='text' className='form-control' readOnly/>
                    </div>
                    <div className='form-group mt-4'>
                       <h5>Current Password</h5>
                       <input type='password' className='form-control'
                        placeholder='Enter Current Password'
                       />
                    </div>
                    <div className='form-group mt-4'>
                       <h5>New Password</h5>
                       <input type='password' className='form-control'
                        placeholder='Enter New Password'
                       />
                    </div>
                    <div className='form-group mt-4'>
                       <h5>Confirm New Password</h5>
                       <input type='password' className='form-control'
                        placeholder='Enter Confirm New Password'
                       />
                    </div>
                    <div className='text-center'>
                      <button type='submit' className='submit-btn mt-5'>Submit</button>
                    </div>
                 </form>
             </div>
          </div>

        </div>
    </div>
  )
}

export default Dashboard
