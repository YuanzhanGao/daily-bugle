import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AccountRegister = () => {

    // defined the navigate variable
    const navigate = useNavigate();

    // define the default state variable
    // this stores the value of the input fields as 
    // an external variable to be processed later

    // set the account state
    const [ac, setAC] = useState({
        name: "",
        email:"",
        password: "",
        confirm_password: ""
    }
    );

    // a useState to decide whether to display user password
    const [showPassword, setShowPassword] = useState(false);

    // a function that checks for duplicate email (we do not allow for duplicate email)
    async function account_duplicate_check(e, email) {
        var has_dup;

        e.preventDefault();

        await fetch(`http://localhost:5000/account/check/duplicate/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(response => response.json())
          .then(result => {
            if (result.length === 0) {
                has_dup =  false; // meaning does not existing duplicate email; safe to register
            } else {
                has_dup = true; // meaning there exists duplicate email; promote the user to register with a new email
            }
          })
          .catch(error => {
                window.alert(error);
                return;
          });

        return has_dup;
    }


    // a function that does the registration of the account
    async function register_account(e) {
        e.preventDefault();

        // User Name, User Email, and Password must be filled
        if (ac.name === "" || ac.email === "" || ac.password === "" || ac.confirm_password === "") {
            alert("Please fill all information!");
            return;
        }

        // if password and confirm_password do not match, let the use redo
        if (ac.password !== ac.confirm_password) {
            alert("Please re-confirm your password");
            return;
        }

        // check whether there exists existing account with the same email
        const existing_account = await account_duplicate_check(e, ac.email);
        if (existing_account) {
            alert("An account has been registered with the email, please try a new email!");
            return;
        }

        const newUser = {...ac};

        await fetch("http://localhost:5000/account/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }).catch(error => {
                window.alert(error);
                return;
          });

        setAC({ name: "", email: "", password: "", confirm_password: ""});
        navigate("/login");
        

    }


    return (
        <div className = "ui main">
            <h2>Register New Account</h2>
            <form className="ui form"
            onSubmit={register_account}
            >
                <div className="field">
                    <label>Name: </label>
                    <input type = "text" 
                    name = "name" 
                    placeholder="Name" 
                    value = {ac.value} 
                    onChange={(e) => setAC(
                        prevState => (
                        {name: e.target.value}
                    )
                    )}></input>
                </div>

                <div className="field">
                    <label>Email: </label>
                    <input type = "text" 
                    name = "email" 
                    placeholder="Email"
                    value = {ac.value}
                    onChange={(e) => setAC(
                        prevState => (
                        {...prevState, email: e.target.value}
                    )
                    )}></input>
                </div>

                <div className="field">
                    <label>Password: </label>
                    <input type = {showPassword ? "text": "password"}
                    name = "password" 
                    placeholder="Password"
                    value = {ac.value}
                    onChange={(e) => setAC(
                        prevState => (
                        {...prevState, password: e.target.value}
                    )
                    )}></input>
                    {/* Toggle to allow users to show passwords or not */}
                    <label htmlFor="check"> Show Password</label>
                    <input
                        id="check"
                        type="checkbox"
                        value={showPassword}
                        onChange={() =>
                            setShowPassword((prev) => !prev)
                        }
                    />
                </div>

                <div className="field">
                    <label>Confirm Password: </label>
                    <input type = {showPassword ? "text" : "password"}
                    name = "confirm_password"
                    placeholder="Confirm Your Password"
                    value = {ac.value}
                    onChange={(e) => setAC(
                        prevState => (
                        {...prevState, confirm_password: e.target.value}
                    )
                    )}>
                    </input>
                </div>

                <button className="ui button blue">Register Account</button>
            </form>
            <br></br>
            <Link to = "/login">Log in Your Account</Link>
        </div>
        );
};

export default AccountRegister;