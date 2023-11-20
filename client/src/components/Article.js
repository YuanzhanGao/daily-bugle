import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const Article = () => {
    let { articleID } = useParams();

    return (
        <div className="ui main">
            <h1>Hello World</h1>
            <h2>{articleID}</h2>
        </div>
    );
};

export default Article;