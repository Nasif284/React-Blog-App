import React from 'react'
import styles from "../Styles/home.module.css";
import { Link } from 'react-router';
const BlogCard = ({blog}) => {
  return (
    <div className={styles.blogCard}>
      <div>
        <h4>{blog.title}</h4>
        <p>{blog.description}</p>
        <div className={styles.cardFooter}>
          <p>
            <i className="ri-pencil-line"></i>
            {blog.author}
          </p>
          <Link to={`blog/${blog.id}`}>
            <button>Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard