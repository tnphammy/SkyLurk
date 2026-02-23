import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { supabase } from '../client'

function Card(props) {
    const id = props.id;
    const [count, setCount] = useState(props.likes)
    const [post, setPost] = useState({"username":"", "title":"", "caption":"", "img_url":""})
    //const [canEdit, setCanEdit] = useState(false);


    // Load current post data (so the user doesn't have to rewrite)
    useEffect(() => {
        const fetchPost = async() => {
            const { data } = await supabase
            .from('Posts')
            .select('*')
            .eq("id", id)

            setPost(data);
            console.log(data)
        }
        fetchPost();
    }, [props])

    const updateCount = async(event) => {
        event.preventDefault();
        event.stopPropagation();

        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("You need to log in to like a post!");
            return;
        }

        // Check if the user has already liked the post
        if (post.liked_by.includes(user.id)) {
            alert("You have already liked this post!");
            return;
        }
        else {
            console.log("NOT YET")
        }

        // Update the likes count and add the user to the liked_by array
        const updatedLikes = post.likes + 1;
        const updatedLikedBy = [...post.liked_by, user.id];

        const { error: updateError } = await supabase
            .from('Posts')
            .update({ likes: updatedLikes, liked_by: updatedLikedBy })
            .eq('id', id);

        if (updateError) {
            console.error("Error updating likes:", updateError);
            return;
        }

        // Update the local state
        setCount(updatedLikes);
    }

    return (
        <div className="post-card">
            <div className="post-text">
                <img src={props.img_url} className="post-img" />
                <h2>@{ props.username}</h2>
                <h2>{props.title}</h2>
                <p>{props.created_at}</p>
            </div>
            <button className="like-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateCount(e); }}>🤎 {count}</button>   
        </div>
    )
}

export default Card;