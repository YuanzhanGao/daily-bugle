import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const CommentList = (props) => {

    // set the commentList state
    const [commentList, setcommentList] = useState([
        {
            under: '',
            content: '',
            upvote: 0,
            downvote: 0,
            published: ''
        }
    ]);

    // a list that keeps the titles of articles each comment belongs to
    const [titleList, settitleList] = useState([
        {
            title: ''
        },
    ]
    );


    useEffect(()=> {
        const getComments = async () => {
            if (props.curr_user) {
                const response = await fetch(`http://localhost:5000/comments/author/${props.curr_user['email']}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                setcommentList(result);
            }
        };
        getComments();
    }, [props.curr_user]
    );

    // get titles of articles each comment belongs to 
    // useEffect(()=> {
    //     const getArticleFromComment = async () => {
    //         if (props.curr_user) {
    //             console.log('Running getArticleFromComment...');
    //             var articleList = [];
    //             for (let i = 0; i < commentList.length; i++) {
    //                 articleList.push({title: ""});
    //             }

    //             for (let i = 0; i < commentList.length; i++) {
    //                 const response = await fetch(`http://localhost:5000/comments/article/${commentList[i]['under']}`, {
    //                     method: "GET",
    //                     headers: {
    //                     "Content-Type": "application/json",
    //                     },
    //                 });

    //                 const result = await response.json();

    //                 console.log(result);

    //                 if {result === undefined} {
    //                     articleList.push(result[0]);
    //                 } 

    //             }

    //             console.log(articleList);
    //             settitleList(articleList);
    //         }
    //     };
    //     getArticleFromComment();
    // }, [commentList]
    // );

    if (props.curr_user) {
        return (
            <div className="ui main">
            <div>
                <br></br>
                {
                    commentList.map(
                        (item, index) => (
                            <div style={{display: 'flex', justifyContent: 'space-between', borderStyle: 'double', marginBottom: '15px'}}>
                                <div>
                                    <p style={{fontSize: '20px'}}>{item['content']}</p>
                                    {/* Published Under: {titleList[index]['title']} */}
                                </div>

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

export default CommentList;