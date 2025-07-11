import React, { useEffect, useReducer, useState } from "react";
import styles from "../Styles/dashboard.module.css";
import { db} from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
const AdminDashboard = () => {
  const [editingBlog, setEditingBlog] = useState({
    title: "",
    author: "",
    description: "",
    content:""
    })
  const initialState = {
    title: "",
    author: "",
    description: "",
    content:"",
  }
  const [blogs, setBlog] = useState([]);
  const fetchBlog = async () => {
    let dbRef = collection(db, "blogs");
    const snap = await getDocs(dbRef);
    const blogList = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlog(blogList);
  };
  useEffect(() => {
      fetchBlog();
    },[])
  
  const handleBlogAdd = async () => {

    try{
      await addDoc(collection(db, "blogs"), {
        title: state.title,
        author: state.author,
        description: state.description,
        content: state.content,
        createdAt: new Date(),
      });
      alert("blog added")
      dispatch({ type: 'RESET' })
      await fetchBlog();

    } catch (err) {
      console.log(err.message)
    }
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleBlogEdit =async () => {
    try {
      const docRef = doc(db, "blogs", id)
      const { id, ...updatedBlog }= editingBlog;
      await updateDoc(docRef, updatedBlog);
      alert("Blog Updated successfully")
      await fetchBlog()
    } catch (err) {
      console.log(err.message)
    }
  }
  const deleteBlog = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
    if (!confirm) return
    try {
      const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef)
      console.log("Blog deleted")
      await fetchBlog()
    } catch (err) {
      console.log(err.message)
    }
  }
  
  return (
    <div className={styles.dashMain}>
      <div className={styles.dashHead}>
        <h2>Admin Dashboard</h2>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Blog
        </button>
      </div>
      <div>
        <table className={styles.blogList}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, key) => (
              <tr>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <button data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => setEditingBlog(blog)} className={styles.edit}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={()=> deleteBlog(blog.id)} className={styles.delete}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* add blog modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add the blog
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <input value={state.title} onChange={(e) => dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the title" />
              <input value={state.author} onChange={(e) => dispatch({ type: "SET_FIELD", field: "author", value: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the author" />
              <input value={state.description} onChange={(e) => dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the description" />
              <textarea value={state.content} onChange={(e) => dispatch({ type: "SET_FIELD", field: "content", value: e.target.value })} placeholder="Enter the blog content" style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleBlogAdd} type="button" style={{ background: "rgb(38, 115, 58)" }} className="btn btn-primary">
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* edit blog modal */}

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit the blog
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              (
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <input value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the title" />
                <input value={editingBlog.author} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the author" />
                <input value={editingBlog.description} onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })} style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} type="text" placeholder="Enter the description" />
                <textarea value={editingBlog.content} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} placeholder="Enter the blog content" style={{ border: "1px solid black", padding: "10px", borderRadius: "5px" }} />
              </div>
              )
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button onClick={handleBlogEdit} type="button" style={{ background: "rgb(38, 115, 58)" }} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default AdminDashboard;
