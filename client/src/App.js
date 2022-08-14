import React from 'react'
import {BrowserRouter} from "react-router-dom";
import 'materialize-css'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hooks";

function App() {
    const {token,login,logout,userId}=useAuth()
    const routes = useRoutes(false)
  return (
      <BrowserRouter>
        <div className="container">
            {routes}
        </div>
      </BrowserRouter>
  );
}

export default App;
