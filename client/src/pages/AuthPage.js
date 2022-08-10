import React from "react";
export const AuthPage =()=>{
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>AuthCard</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>

                        </div>
                    </div>
                    <div className="card-action ">
                        <button className='btn yellow darken-4'>Login</button>
                        <button className='btn gray darken-4'>Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}