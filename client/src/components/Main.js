import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Main = () => {

    // set up a state to store politics articles
    const [Politics, setPolitics] = useState([]);

    // set up a state to store business articles
    const [Business, setBusiness] = useState([]);

    // set up a state to store sports articles
    const [Sports, setSports] = useState([]);

    // set up a state to store entertainment articles
    const [Entertainment, setEntertainment] = useState([]);

    // get all politics articles
    useEffect(
        () => {
            const getPolitics = async () => {
                const response = await fetch("http://localhost:5000/articles/get/politics", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
        
                // select randomly 3 politics articles
                if (result.length <= 3) {
                    setPolitics(result);
                } else { 
                    const politics_articles = getRandomSubarray(result, 3);
                    setPolitics(politics_articles);
                }
            };

            const getBusiness = async () => {
                const response = await fetch("http://localhost:5000/articles/get/business", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
        
                // select randomly 3 business articles
                if (result.length <= 3) {
                    setBusiness(result);
                } else { 
                    const business_articles = getRandomSubarray(result, 3);
                    setBusiness(business_articles);
                }
            };

            const getSports = async () => {
                const response = await fetch("http://localhost:5000/articles/get/sports", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
        
                // select randomly 3 business articles
                if (result.length <= 3) {
                    setSports(result);
                } else { 
                    const sports_articles = getRandomSubarray(result, 3);
                    setSports(sports_articles);
                }
            };

            const getEntertain = async () => {
                const response = await fetch("http://localhost:5000/articles/get/entertain", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
        
                // select randomly 3 business articles
                if (result.length <= 3) {
                    setEntertainment(result);
                } else { 
                    const entertain_articles = getRandomSubarray(result, 3);
                    setEntertainment(entertain_articles);
                }
            };

            getPolitics();
            getBusiness();
            getSports();
            getEntertain();

        }, []
    );

    const mapArticles = (topics) => {
        if (topics.length > 0) {
            return topics.map(
                item => (
                    <Link to = {`/article/${item['_id']}`}
                    style={{textDecoration: 'none', color: 'black'}}>
                    <div>
                        <p style={{fontSize: '25px', fontFamily: 'serif', 
                        fontWeight: 'bold', textOverflow: 'ellipsis'}}>{item['title']}</p>
                        {item['published']}
                        <hr></hr>
                    </div>
                    </Link>
                )
            )
        } else {
            return (
                <p style={{fontFamily: 'serif', fontSize: '25px'}}>No Articles published yet!</p>
            )
        }
    };

    return (
        <div>
            <div style={{width: '100%', height: '15%'}}>
                <p style={{fontFamily: 'fantasy', textAlign: 'center', fontSize: '65px'}}>Daily Bugle</p>
                <p style={{fontFamily: 'serif', textAlign: 'center', fontSize: '25px'}}>
                    America's Most Trusted Newspaper since 2023
                </p>
            </div>
            <hr></hr>

            {/* Divs all holds all columns */}
            <div style={{height: '85%', width: '100%'}}>
                <div className="inner">
                    <p style={{fontSize: '40px', fontFamily: "serif", textAlign: 'center'}}>Politics</p>
                    <hr></hr>
                    {
                        mapArticles(Politics)
                    }
                </div>

                <div className="inner">
                    <p style={{fontSize: '40px', fontFamily: "serif", textAlign: 'center'}}>Business</p>
                    <hr></hr>
                    {
                        mapArticles(Business)
                    }
                </div>

                <div className="inner">
                    <p style={{fontSize: '40px', fontFamily: "serif", textAlign: 'center'}}>Sports</p>
                    <hr></hr>
                    {
                        mapArticles(Sports)
                    }
                </div>


                <div className="inner">
                    <p style={{fontSize: '40px', fontFamily: "serif", textAlign: 'center'}}>Entertainment</p>
                    <hr></hr>
                    {
                        mapArticles(Entertainment)
                    }
                </div>
            </div>
        </div>
    );

    // utility function to get random subarrays
    function getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }
};

export default Main;