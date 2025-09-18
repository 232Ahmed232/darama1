import React, {useState} from 'react'
import authService from '../../appwrite/auth'

import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    // const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const InputClass = 'p-3 rounded-xl shadow-lg border border-3'
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                // navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    {/* <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link> */}
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 flex flex-col gap-3'>
                        <input
                        
                        placeholder="Enter your full name"
                        className={`${InputClass}`}
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <input
                        
                        placeholder="Enter your email"
                        type="email"
                        className={`${InputClass}`}
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <input
                        
                        type="password"
                        className={`${InputClass}`}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <button type="submit" 
                        className="w-1/2 mx-auto  text-white font-bold rounded-2xl hover:bg-green-500 p-2 bg-blue-500">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup