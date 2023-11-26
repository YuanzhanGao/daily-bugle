import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { IconButton } from "@mui/material";
import userIMG from "../images/user.jpg";

const Article = (props) => {
    // get the id of the article to access its content
    let { articleID } = useParams();

    // defined the navigate variable
    const navigate = useNavigate();

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

    // get a list of all ads information from the database
    const [Ad, setAd] = useState(
        {
            bcolor: "white",
            adtitle: "",
            clicks:0
        }
    );

    useEffect(()=> {
        const getAds = async () => {
            if (props.curr_user) {
                const response = await fetch ("http://localhost:5000/ads/getall", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                // get a random element from the ad list
                // Get a random index within the array length
                let randomIndex = Math.floor(Math.random() * result.length);

                setAd(result[randomIndex]);
            }
        };

        getAds();
    }, [props.curr_user]
    );
    

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

                // set content of the article state
                setarticle(result);

                // set content of the upvote state
                setUpvote(result[0]['upvote']);

                // set content of the downvote state
                setDownvote(result[0]['downvote']);


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

    // functions to count upvote/downbote number and check whether upvoted/downvoted
    const [UpvoteCount, setUpvote] = useState(0);
    const [DownvoteCount, setDownvote] = useState(0);
    const [Upvoted, setUpvoted] = useState(false);
    const [Downvoted, setDownvoted] = useState(false);

    // functions that update Upvote, DownVote Number and status
    async function handleUpvote (e) {
        e.preventDefault();
        // Basic Logic:
        // When clicking Upvote button, 
        // 1) If Already Upvoted, set upvote to false, decrease upvote by 1;
        // 2) If Not upvoted,
        //      a) If Downvoted, cancel downvote, decrease downvote by 1,
        //          set upvote to true, increase upvote count by 1
        //      b) If not Downvoted, set upvote to true, increase upvote by 1

        if (Upvoted === true) {
            setUpvoted(false);
            setUpvote(UpvoteCount-1);
        } else {
            if (Downvoted === true) {
                setDownvoted(false);
                setDownvote(DownvoteCount-1);
                setUpvoted(true);
                setUpvote(UpvoteCount+1);
            } else {
                setUpvoted(true);
                setUpvote(UpvoteCount+1);
            }
        }
    };

    // functions that update Upvote, DownVote Number and status
    async function handleDownvote (e) {
        e.preventDefault();

        if (Downvoted === true) {
            setDownvoted(false);
            setDownvote(DownvoteCount-1);
        } else {
            if (Upvoted === true) {
                setUpvoted(false);
                setUpvote(UpvoteCount-1);
                setDownvoted(true);
                setDownvote(DownvoteCount+1);
            } else {
                setDownvoted(true);
                setDownvote(DownvoteCount+1);
            }
        }

    };

    // useEffect is used to update upvotes/downvotes
    useEffect(() => {
            const updateUDvote = async() => {
                if (UpvoteCount !== 0 && DownvoteCount !== 0) {
                    const drafted = {
                        id: articleID,
                        upvote: UpvoteCount,
                        downvote: DownvoteCount
                    };
                    const result = await fetch("http://localhost:5000/articles/article/updownvote/update", {
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify(drafted),
                    });
                }
            }
        updateUDvote();
    }, [Upvoted, Downvoted]);


    const adRecord = async () => {
        const response = await fetch("http://localhost:5000/ads/clickupdate", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(Ad),
        });
        
        navigate("/spiderman");
    };
    // JAX render ---------------------------------------------------------------------------------

    if (props.curr_user) {
        return (
            <div className="ui main">
                <br></br>
                <p style={{fontSize: '40px', textAlign:"center", textTransform: 'uppercase',
                            fontFamily: 'serif'}}>{article[0]['title']}</p>
                <div style={{
                fontSize: '20px', 
                fontFamily: 'serif', 
                display: 'flex', 
                justifyContent: 'center'
                }}>
                Relevant Topics:{
                    article[0]['category'].map(
                        item => <div style={{fontFamily: 'serif'}}>{item}</div>
                    )
                }
                </div>
                <div style={{textAlign: 'center', color: 'gray', fontSize: '20px',
                            fontFamily: 'serif'}}>Author: {authorName} ({article[0]['author']})</div>

                <div style={{textAlign: 'center'}}>
                <IconButton onClick={handleUpvote}>
                    <ThumbUpOffAltIcon style={{color: 'green'}}></ThumbUpOffAltIcon>{UpvoteCount}
                </IconButton>

                <IconButton onClick={handleDownvote}>
                    <ThumbDownOffAltIcon style={{color: 'red'}}></ThumbDownOffAltIcon>{DownvoteCount}
                </IconButton>
                </div>

                {/* Content of the article goes down here */}
                <hr></hr>
                <h2 style={{marginBottom: '50px', fontFamily: 'serif'}}>
                    {article[0]['content']}
                </h2>

                <hr></hr>

                {/* Ad section */}
                <div style={{backgroundColor: Ad['bcolor'], height: '100px', cursor: 'pointer'}} 
                onClick={adRecord}>
                    <p style={{fontFamily: 'Fantasy', fontSize: '50px', textAlign: 'center'}}>{Ad['adtitle']}</p>
                </div>
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
                            <img style={{width: '50px', height: '50px'}} className="ui avatar image" src={userIMG} alt="user"></img>
                            <h5 style={{color: 'gray'}}>{item['author']} said on {item['published']}: </h5>
                            <h5>{item['content']}</h5>
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