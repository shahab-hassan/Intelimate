import React from 'react'
import { Link } from 'react-router-dom'

import {articles} from "../services/blogsData"

function Blog() {
  const blogArticles = articles.map((article)=>{
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
})

return (
    <div className='blogHomeDiv'>
        <section>
            <div className="blogHomeUpper">
                <div className="headingDiv">
                    <h1 className='heading'>Articles</h1>
                </div>
                <Link to="/blog" className='viewAllBtn'>
                    <span>View All {">>"}</span>
                </Link>
            </div>
            <div className="blogHomeLower">
                {blogArticles}
            </div>
        </section>
    </div>
)
}

export default Blog