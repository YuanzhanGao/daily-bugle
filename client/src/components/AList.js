import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ArticleList = (props) => {

    // defined the navigate variable
    const navigate = useNavigate();

    function redirect_write() {
        navigate("/draft");
    };

        
    // set the articleList state
    const [articleList, setarticleList] = useState([
        {
            title: '',
            upvote: 0,
            downvote: 0,
            published: '',
            category: []

        }
    ]);

    useEffect(()=> {
        const getArticles = async () => {
            if (props.curr_user) {
                const response = await fetch(`http://localhost:5000/articles/${props.curr_user['email']}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                setarticleList(result);
            }
        };
        getArticles();
    }, [props.curr_user]
    );

    if (props.curr_user) {
        return (
            <div className="ui main">
                <br></br>
                <button className="ui button blue" onClick = {redirect_write}>Start Writing!</button>
                <br></br>
                <br></br>
                <div>
                {
                    articleList.map(
                        // Note the difference between () and {} in functional body; either do {return result} or just (result)
                        // See React_js Note for more!
                        item => (
                            <div style={{display: 'flex', justifyContent: 'space-between', borderStyle: 'double', marginBottom: '15px'}}>
                                <Link to = {`/article/${item['_id']}`}
                                style={{color: 'gray', fontSize: '30px', textDecoration: 'None'}}>{item['title']}</Link>
                                <div style={{marginRight: '10px'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <h4 style = {{color:'green'}}>{item['upvote']}</h4>
                                    <h4 style = {{color: 'red'}}>{item['downvote']}</h4>
                                    </div>
                                    <h5>Published on: {item['published']}</h5>
                                </div>
                            </div>
                        )
                    )
                }
                </div>
            </div>
        );
    } else {
        return (
            <h1>You are not logged in. Please log in through <Link to = "/login">here</Link>.</h1>
        );
    }
};

export default ArticleList;