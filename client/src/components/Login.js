import React, {useState} from "react";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom";

const UserLogin = (props) => {

    // defined the navigate variable
    const navigate = useNavigate();

    // set the account state
    const [Login, setLogin] = useState({
        email:"",
        password: "",
    }
    );

    async function user_login (e) {

        e.preventDefault();

        // User Name, User Email, and Password must be filled
        if (Login.email === "" || Login.password === "") {
            alert("Please enter both your registered email and your password!");
            return;
        }

        const loginfo = {...Login};

        
        // use POST method to encapsulate user name and password inside the body

        await fetch("http://localhost:5000/account/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginfo),
          })
          .then(response => response.json())
          .then(result => {
                if (result.length === 0) {
                    // no user-record given is found
                    alert("No account under the given email is found, or the password is incorrect");
                    return;
                } else {
                    // login the user and set up the global cookie
                    props.onLogin(result[0]);
                    // reset login useState
                    setLogin({email: "", password: ""});
                    // after logging in, redirect the user to the Profile page
                    navigate("/Profile");
                }
            }
            )
          .catch(error => {
                window.alert(error);
                return;
          });

    }

    return (
        <div className = "ui main">
            <br></br>
            <h2>Log In</h2>
            <form className="ui form"
            onSubmit={user_login}
            >

                <div className="field">
                    <label>Email: </label>
                    <input type = "text" 
                    name = "email" 
                    placeholder="Email"
                    value = {Login.value}
                    onChange={(e) => setLogin(
                        prevState => (
                        {...prevState, email: e.target.value}
                    )
                    )}></input>
                </div>

                <div className="field">
                    <label>Password: </label>
                    <input type = "password" 
                    name = "password" 
                    placeholder="Password"
                    value = {Login.value}
                    onChange={(e) => setLogin(
                        prevState => (
                        {...prevState, password: e.target.value}
                    )
                    )}></input>
                </div>

                <button className="ui button blue">Log In</button>
            </form>
            <br></br>
            <Link to = "/register">Register Your Account</Link>
        
        </div>
        );

};

export default UserLogin;