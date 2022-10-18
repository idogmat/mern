import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
export const AuthPage =()=>{
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const message=useMessage()
    const {loading,error,request,clearError} = useHttp()
    const [form,setForm]= useState({
        email:'',
        password:''
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})

    }
    const registerHandler = async ()=>{

        try{
            const data = await request('api/auth/register','POST',{...form})
            console.log(data)

        }catch(e){
            console.log(e)
        }
    }
    const loginHandler = async ()=>{

        try{
            const data = await request('api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>AuthCard</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div className="row">
                            <div className="input-field">
                                <input  id="email"
                                        name="email"
                                        type="email"
                                        className="validate white-text"
                                        onChange={changeHandler}/>
                                    <label htmlFor="email" className="white-text">Email</label>
                            </div>
                            <div className="input-field">
                                <input  id="password"
                                        name="password"
                                        type="password"
                                        className="validate white-text"
                                        onChange={changeHandler}/>
                                    <label htmlFor="password" className="white-text">Password</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className='btn yellow darken-4'
                                onClick={loginHandler}
                                disabled={loading}
                            >Login</button>
                            <button
                                className='btn gray darken-4'
                                onClick={registerHandler}
                                disabled={loading}
                            >Registration</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}