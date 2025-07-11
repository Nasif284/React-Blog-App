import React, { useEffect, useState } from 'react'
import styles from '../Styles/blog.module.css'
import { useParams } from 'react-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const getBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
          setBlog(docSnap.data())
      } catch (err) {
        console.log(err.message)
      }}
   getBlog()
  }, [id])
  if (!blog) return <p>Loading...</p>;
  return (
    <div className={styles.blogMain}>
      <h1>{blog.title}</h1>
      <h4>{blog.author}</h4>
      <p style={{fontWeight:"bold"}}>{blog.description}</p>
      <p>{blog.content}</p>
      <div>
        
      </div>
    </div>
    
  )
}

export default Blog