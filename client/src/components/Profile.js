import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import userIMG from "../images/user.jpg";

const Profile = (props) => {

    const [articleNum, setarticleNum] = useState(0);

    // get number of articles
    useEffect(() => 
    {
        const getAN = async () => {
            // fetch article number only if we have a user stored in cookie in the first place
            // otherwise if the user is not logged in it causes an error to come to this page directly
            if (props.curr_user) {
                var AN = 0;
                await fetch(`http://localhost:5000/articles/${props.curr_user['email']}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                }).
                then(
                    response => response.json()
                ).
                then(
                    result => {
                        AN = result.length;
                    }
                )
                .catch(error => {
                        window.alert(error);
                        return;
                });
                setarticleNum(AN);
            }
    };
        getAN();
    },[props.curr_user]);


    if (props.curr_user) {
        return (
        <div className="ui main">
          <br></br>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img style={{width: '150px', height: '150px'}} className="ui avatar image" src={userIMG} alt="user"></img>
          </div>

        <h1 style={{display: 'flex', justifyContent: 'center'}}>Hello, {props.curr_user['name']}!</h1>

        <hr></hr>

        <div style={{display: 'flex'}}>
            <h2 style={{marginRight: '100px', marginLeft: '90px', color: 'gray'}}>Your Articles</h2>
            <h2 style={{marginLeft: '10px', marginLeft: '350px', color: 'gray'}}>Your Comments</h2>
        </div>

        <div style={{display: 'flex'}}>
            <h2 style={{marginRight: '100px', marginLeft: '170px', color: 'gray'}}>
                <Link to="/profile/articles" style={{color: 'gray', textDecoration: 'None'}}>{articleNum}</Link>
            </h2>
            {/* <button className="ui button blue" onClick = {redirect_write}>Start Writing!</button> */}
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