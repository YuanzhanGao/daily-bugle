import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Article = (props) => {
    // get the id of the article to access its content
    let { articleID } = useParams();

    // set the article state
    const [article, setarticle] = useState([
        {
            title: "",
            content: "",
            author: "",
            category: [],
            upvote: 0,
            downvote: 0,
            published: ""
        }
    ]);

    // set the conmment state
    const [Comment, setComment] = useState(
        {
            under: "", // the 'under' attribute store the article under which the comment is added
            content: "",
            author: "",
            upvote: 0,
            downvote: 0,
            published: ""
        }
    );

    // A list of all comments posted under this article
    const [CommentList, setCommentList] = useState([
        {
            content: "",
            author: "",
            upvote: 0,
            downvote: 0,
            published: ""
        }
    ])

    // set up a state to store the author's user name fetched from user's email
    const [authorName, setauthorName] = useState('');

    // upon loading (only if curr_user is in props). get the article and all its comments
    useEffect(()=> {
        const getArticle = async () => {
            if (props.curr_user) {
                // get the article info
                const response = await 
                fetch(`http://localhost:5000/articles/article/${articleID}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                setarticle(result);

                // get author name from their email
                const authorName = await 
                fetch(`http://localhost:5000/articles/article/author/${result[0]['author']}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });
                const authorName_json = await authorName.json();
                setauthorName(authorName_json[0]['name']);
            }
        };

        const getComments = async () => {
            if (props.curr_user) {
                const response = await 
                fetch(`http://localhost:5000/comments/${articleID}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                setCommentList(result);

            }
        };

        getArticle();
        getComments();
    }, [props.curr_user]
    );

    // function for posting comment
    async function post_comment(e) {
        e.preventDefault();

        if (Comment.content === "") {
            alert("You cannot post empty comment!");
            return;
        }

        const drafted = {...Comment};

        drafted['under'] = articleID;
        drafted['author'] = props.curr_user['email'];
        drafted['published'] = new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

        await fetch("http://localhost:5000/comments/draft", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(drafted),
          })
          .catch(error => {
                window.alert(error);
                return;
          });

        setComment({ 
            under: "",
            content: "", 
            author: "", 
            upvote: 0,
            downvote: 0,
            published: ""
        });

        alert("Your Comment is added! This page will refresh to show all updated comments!");
        window.location.reload();
    }


    if (props.curr_user) {
        return (
            <div className="ui main">
                <br></br>
                <p style={{fontSize: '40px', textAlign:"center", textTransform: 'uppercase',
                            fontFamily: 'serif'}}>{article[0]['title']}</p>
                <div style={{textAlign: 'center', color: 'gray', fontSize: '20px',
                            fontFamily: 'serif'}}>Author: {authorName} ({article[0]['author']})</div>
                <IconButton><ThumbUpOffAltIcon>2</ThumbUpOffAltIcon></IconButton>

                {/* Content of the article goes down here */}
                <hr></hr>
                <h2 style={{marginBottom: '50px', fontFamily: 'serif'}}>
                    {article[0]['content']}
                </h2>

                <hr></hr>

                {/* Comment Section */}
                <div>
                    <h2 style = {{fontWeight: 'bold'}}>Comments</h2>
                    <form className="ui form"
                    onSubmit={post_comment}
                    >
                    <div className="field">
                        <textarea
                        name = "content"
                        placeholder="Write your comment here!"
                        value={Comment.value}
                        onChange={(e) => setComment(
                            prevState => (
                            {...prevState, content: e.target.value}
                        )
                        )}></textarea>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="ui button green">Submit</button>
                    </div>
                </form>
                <hr></hr>
                {/* Display all Comment of the article */}
                {
                CommentList.map(
                    item => (
                        <div style={{marginBottom: '15px'}}>
                            <h5>{item['author']}</h5>
                            <h5>{item['content']}</h5>
                            <h5>Published on: {item['published']}</h5>
                            
                        <hr></hr>
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

export default Article;