import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth/helper"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
}

//DINT UNDERSTAND HISTORY PART!!
const Menu = ({history}) => {
  return(
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style = {currentTab(history,"/")} to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link style = {currentTab(history,"/cart")} to="/cart" className="nav-link">Cart</Link>
            </li>
            
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link style = {currentTab(history,"//user/dashboard")} to="/user/dashboard" className="nav-link">U. Dashboard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style = {currentTab(history,"//admin/dashboard")} to="/admin/dashboard" className="nav-link">A. Dashboard</Link>
                </li>
            )}
            
            
            {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                    <Link style = {currentTab(history,"/signup")} to="/signup" className="nav-link">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link style = {currentTab(history,"/signin")} to="/signin" className="nav-link">Signin</Link>
                </li>
            </Fragment>
            )}
            
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick= { () => {
                        signout( () => {
                            history.push("/")
                        })
                    }}>
                        Signout
                    </span>

                </li>
            )}
        </ul>
    </div>
  );
}

export default withRouter(Menu);