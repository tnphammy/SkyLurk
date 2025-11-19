import { useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../client'

function Card(props) {
    const id = props.id;
    const [count, setCount] = useState(props.likes)

    const updateCount = async(event) => {
        setCount(prev => prev + 1)

        await supabase
        .from('Posts')
        .update({likes: count + 1})
        .eq("id", id)

    }

    return (
        <div className="post-card">
            <div>
                <img src={props.img_url} className="post-img"/>
            </div>
            <div className="post-text">
                <button className="like-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateCount(); }}>🤎 {count}</button>
                <h3>@{props.author}</h3>
                <h2>{props.title}</h2>
                <p>{props.created_at}</p>
            </div>   
        </div>
    )
}

export default Card;