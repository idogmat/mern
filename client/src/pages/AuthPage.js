import React,{useState} from "react";
import {useHttp} from "../hooks/http.hook";
export const AuthPage =()=>{
    const {loading,error,request} = useHttp()
    const [form,setForm]= useState({
        email:'',
        password:''
    })
    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    const registerHandler = async ()=>{
        console.log(form)
        try{
            const data = await request('api/auth/register','POST',{...form})
            console.log(data)
        }catch(e){

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
                                        type="text"
                                        className="validate white-text"
                                        onChange={changeHandler}/>
                                    <label htmlFor="email" className="white-text">Email</label>
                            </div>
                            <div className="input-field">
                                <input  id="password"
                                        name="password"
                                        type="text"
                                        className="validate white-text"
                                        onChange={changeHandler}/>
                                    <label htmlFor="password" className="white-text">Password</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className='btn yellow darken-4'
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