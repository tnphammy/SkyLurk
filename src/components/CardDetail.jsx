import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function CardDetail(props) {
    const {id} = useParams();
    const [post, setPost] = useState({"author":"", "title":"", "caption":"", "img_url":""})

    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .eq("id", id)

            setPost(data[0]);
        }
        fetchPost();
    }, [props])

    return (
        <div className="post-view">
            <img src={post.img_url} className="post-img" />
            <p>🤎 {post.likes}</p>
            <h3>@{post.author}</h3>
            <h2>{post.title}</h2>
            <p>{post.caption}</p>
            <p>{post.created_at}</p>
            <Link to={`/edit/${id}`}><button>Edit</button></Link>
            <button>Delete</button>
        </div>
    )
}

export default CardDetail;