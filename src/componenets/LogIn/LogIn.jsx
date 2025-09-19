import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'

import { login as authLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function LogIn() {

    const {register,handleSubmit} = useForm()
    const [error,setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    

    const loginTo = async(data)=>{
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    
    }
  return (
    <div className='flex  items-center flex-col justify-center w-full'>
        <div className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form className='mt-8 flex flex-col' onSubmit={handleSubmit(loginTo)}>
            <div className="space-y-5 flex flex-col">
                <input type="email" 
                className='p-3 rounded-xl shadow-lg border border-3'
                placeholder='Enter your Email'
                {...register("email",{
                    require:true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <input type="password" 
                className='p-3 rounded-xl shadow-lg border border-3'
                placeholder='Enter your Password'
                {...register("password",{
                    require:true,
                   
                })}
                />
                <button type="submit" 
                className="w-1/2 mx-auto  text-white font-bold rounded-2xl hover:bg-green-500 p-2 bg-blue-500">
                            Log In
                </button>
                
            </div>
        </form>
        </div>

    </div>
  )
}

export default LogIn