import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const DraftArticle = (props) => {
    // defined the navigate variable
    const navigate = useNavigate();
    

    const [Article, setArticle] = useState({
        title: "",
        content: "",
        author: "",
        genre: "",
        upvote: 0,
        downvote: 0
    });

    function post_article(e) {

    };

    if (props.curr_user) {
        return (
            <div className = "ui main">
                <br></br>
                <h2>Write Your Next Article:</h2>
                <form className="ui form"
                onSubmit={post_article}
                >
                    <div className="field">
                        <label>Title: </label>
                        <input type = "text" 
                        name = "title" 
                        placeholder="Title"
                        value = {Article.value}
                        onChange={(e) => setArticle(
                            prevState => (
                            {...prevState, title: e.target.value}
                        )
                        )}></input>
                    </div>
    
                    <div className="field">
                        <label>Article: </label>
                        <textarea></textarea>
                    </div>
    
                    {/* <div className="field">
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
                    </div> */}
    
                    
                    <button className="ui button green center aligned content">Submit</button>
                </form>
            
            </div>
            );
    } else {
        return(
            <h1>You are not logged in. Please log in through <Link to = "/login">here</Link>.</h1>
        );
    }
};

export default DraftArticle;