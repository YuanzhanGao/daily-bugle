import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserLogin = (props) => {
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
                } else {
                    console.log(result);
                    // console.log(result[0]['name']);
                    // localStorage.setItem("user_name", JSON.stringify(result[0]['name']));
                    // localStorage.setItem("user_email", JSON.stringify(result[0]['email']));
                    // localStorage.setItem("user_id", JSON.stringify(result[0]['_id']));
                    props.onLogin(result[0]);
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
            <Link to= "/register">Register Your Account</Link>
        
        </div>
        );

};

export default UserLogin;