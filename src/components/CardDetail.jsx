import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function CardDetail() {
    const {id} = useParams();
    const [post, setPost] = useState({
        "author":"", 
        "title":"", 
        "caption":"", 
        "img_url":"", 
        "comments":[]})
    const [commenter, setCommenter] = useState("");
    const [comment, setComment] = useState("");


    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .eq("id", id)

            setPost({
                ...data[0],
                comments: data[0].comments || []
              });
        }
        fetchPost();
    }, [id])


    const handleSubmitComment = async(event) => {
        event.preventDefault();

        if (!(commenter.trim()) || !(comment.trim())) {
            return; /* empty fields */ 
        }
        const newComment = {user: commenter, text: comment}
        const updatedComments = [...(post.comments || []), newComment];

        const { data, error } = await supabase
        .from('Posts')
        .update({comments: updatedComments})
        .eq("id", id)
        .select();

        if (error) {
            console.error("Failed to add comment:", error);
            return;
          }

        /* failing here */
        setPost({
        ...data[0],
        comments: data[0].comments || []
        });
        setComment("")
        setCommenter("")

    }

    return (
        <div className="post-view">
            <div className="pure-post">
                {post.img_url && <img src={post.img_url} className="post-img" />}
                <h2>🤎 {post.likes}</h2>
                <h3>@{post.author}</h3>
                <h2>{post.title}</h2>
                <p>{post.caption}</p>
                <p>{post.created_at}</p>
                <Link to={`/edit/${id}`}><button>Edit</button></Link>
            </div>
            <div className="comment-section">
                <h2>Post a comment!</h2>
                <div>
                    <form>
                        <h3>Pseudonym</h3>
                        <input
                        type="text"
                        placeholder="Type an anonymous username"
                        value={commenter}
                        onChange={(e) => setCommenter(e.target.value)}/>
                        <h3>Comment</h3>
                        <input
                        type="text"
                        placeholder="Say something..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}/>
                        <button type="submit" onClick={handleSubmitComment}>Comment</button>
                    </form>
                </div>
                <h3>Comments</h3>
                <div className="comment-list">
                    {post.comments && post.comments.length > 0 ?
                    post.comments.map((c, i) => (
                        <div key={i} className="whole-cmt">
                            <h3>@{c.user}:  </h3>
                            <p> {c.text}</p>
                        </div>
                    ))
                    : <p>No comments yet.</p>}
                </div>
            </div>

        </div>
    )
}

export default CardDetail;