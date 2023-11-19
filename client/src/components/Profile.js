import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userIMG from "../images/user.jpg";

const Profile = (props) => {

    // defined the navigate variable
    const navigate = useNavigate();

    // get all articles written by the user
    async function get_top5_articles () {

    };

    function redirect_write() {
        navigate("/draft");
    };


    if (props.curr_user) {
        return (
        <div>
          <br></br>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img style={{width: '150px', height: '150px'}} className="ui avatar image" src={userIMG} alt="user"></img>
          </div>

        <h2 style={{display: 'flex', justifyContent: 'center'}}>Hello, {props.curr_user['name']}!</h2>

        <hr></hr>

        <div style={{display: 'flex'}}>
            <h5 style={{marginRight: '10px'}}>Your Top Articles:</h5>
            <button className="ui button blue" onClick = {redirect_write}>Start Writing!</button>
        </div>

        </div>
          
        );
    } else {
        return (
            <h1>You are not logged in. Please log in through <Link to = "/login">here</Link>.</h1>
        )
    
    }

};

export default Profile;