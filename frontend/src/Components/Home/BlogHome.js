import React from 'react'
import { Link } from 'react-router-dom'

import {articles} from "../../services/blogsData"

function BlogHome() {

    const blogHomeArticles = articles.map((article, index)=>{
        if(index < 3){
            return <Link to="/postDetails" className="post">
                <div className="postContent">
                    <div className="postImgDiv">
                        <img src={article.img} alt="Error" className='postImg' />
                    </div>
                    <h2 className="postTitle">{article.title}</h2>
                    <div className="postLower">
                        <Link to="/postDetails">CONTINUE READING {">>"}</Link>
                        <p className='readTime'>{article.readTime}</p>
                    </div>
                </div>
            </Link>
        }
        return "";
    })

    return (
        <div className='blogHomeDiv'>
            <section>
                <div className="blogHomeUpper">
                    <div className="headingDiv">
                        <h1 className='heading'>Latest Articles</h1>
                    </div>
                    <Link to="/blog" className='viewAllBtn'>
                        <span>View All {">>"}</span>
                    </Link>
                </div>
                <div className="blogHomeLower">
                    {blogHomeArticles}
                </div>
            </section>
        </div>
    )
}

export default BlogHome