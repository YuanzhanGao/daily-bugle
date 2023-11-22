import React, {useState} from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DraftArticle = (props) => {
    // defined the navigate variable
    const navigate = useNavigate();

    // make select compomnent animated
    const animatedComponents = makeAnimated();

    const [Article, setArticle] = useState({
        title: "",
        content: "",
        author: "",
        category: [],
        upvote: 0,
        downvote: 0,
        published: ""
    });

    // category option
    const options = [
        { value: 'Politics', label: 'Politics' },
        { value: 'Business', label: 'Business' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Entertainment', label: 'Entertainment'}
      ]



    async function post_article(e) {
        e.preventDefault();
        if (Article.title === "") {
            alert("Please have a title!");
            return;
        }

        if (Article.content === "") {
            alert("Please write something down!");
            return;
        }

        if (Article.category.length ===0) {
            alert("Please select a category of your post!");
            return;
        }

        // set the category attribute of Article object to only category values
        let category_value = Article.category.map(
            (item) => item['value']
        );

        const drafted = {...Article};
        drafted['category'] = category_value;
        drafted['author'] = props.curr_user['email'];
        // set published date
        drafted['published'] = new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

        
        await fetch("http://localhost:5000/articles/draft", {
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

        setArticle({ 
            title: "", 
            content: "", 
            author: "", 
            category: [],
            upvote: 0,
            downvote: 0,
            published: ""
        });

        navigate("/Profile");

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
                        <textarea
                        name = "content"
                        placeholder="Start Your Article Here!"
                        value={Article.value}
                        onChange={(e) => setArticle(
                            prevState => (
                            {...prevState, content: e.target.value}
                        )
                        )}></textarea>
                    </div>

                    <Select
                    components={animatedComponents}
                    isMulti
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => setArticle(
                        prevState => (
                        {...prevState, category: e}
                    )
                    )}/>
    
                    <br></br>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="ui button green">Submit</button>
                    </div>
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