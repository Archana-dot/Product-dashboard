import React, { useState } from 'react';
import '../../assets/css/home.css'
import Product from './Product';
import Dashboard from './Dashboard';
import Logout from "./Logout";
import { BrowserRouter, Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';


function Home() {

    const [isOpen, setIsOpen] = useState(false);
    const [dash , setDash] = useState(true);
    
    function popUp() {
        setIsOpen(!isOpen)
    }
    function dasha(){
        return(
            <div>
                <Dashboard/>
            </div>
        )
    }
    
    if (localStorage.getItem("token") !== "true") {
        return <Redirect to="/" />;
    }
    else {
        return (
            <BrowserRouter>
                <div className="homepage">
                    <div className="header">
                        <span className="header-left">
                            <Link to="/Home" className="btn">Dashboard</Link> 
                            <Link to="/Home/Product" className="btn">Product</Link> 
                        </span>
                        <span className="header-right">
                            <button id="logout" onClick={popUp}>Logout</button></span>
                        {isOpen && <Logout open = {isOpen} handleClose={popUp} />}
                    </div>
                    
                </div>
                <Switch>
                    <Route path="/Home/Product" exact>
                        <Product />
                    </Route>
                    <Route path="/Home" exact>
                        <Dashboard />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Home;
