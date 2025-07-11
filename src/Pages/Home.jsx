import React, { useEffect, useState } from "react";
import styles from "../Styles/home.module.css";
import { BlogCard } from "../Components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [blogs, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog =async () => {
      let dbRef = collection(db, 'blogs')
      const snap = await getDocs(dbRef)
      const blogList = snap.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      setBlog(blogList);
    }
    fetchBlog();
  },[])

  return (
    <div className={styles.homeMain}>
      {blogs.map((blog, key) => (
        <BlogCard key={key} blog={blog} />
      ))}
    </div>
  );
};

export default Home;
