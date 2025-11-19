import Card from '../elements/Card.jsx'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import { useState, useEffect } from 'react'

function ViewPosts(props) {
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState("Latest")
    const [query, setQuery] = useState("");

    useEffect(()=> {
        fetchPosts()
    }, [sortType, query]);

    function handleQuery(event) {
        setQuery(event.target.value)
    }

    const fetchPosts = async() => {
        try {
            let q = supabase.from('Posts').select('*');

            // searching keywords (if needed)
            if (query && query.trim() !== "") {
                q = q.ilike('title', `%${query.trim()}%`);
            }
    
            // sorting
            if (sortType === "Latest") {
                q.order("created_at", {ascending: false})
            }
            else if (sortType ==="Most Popular") {
                q.order("likes", {ascending: false})
            }
    
            const { data, error } = await q;
            if (error) {
              console.error('Supabase fetch error:', error);
              setPosts([]);
              return;
            }
            setPosts(data ?? []);
        }
        catch (err) {
        console.error('Unexpected fetch error:', err);
        setPosts([]);
      }
    }

    const handleSubmitQuery = async(event) => {
        event.preventDefault();
        fetchPosts()

    }

    return (
        <div className="whole-page">
            <div className="feed-functions">
                <div className="sort-container">
                    <label htmlFor="sort-by">Sort by: </label>
                    <select
                    id="sort-by"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}>
                        <option>Latest</option>
                        <option>Most Popular</option>
                    </select>
                </div>
                <div className="search-bar">
                    <input
                    type="text"
                    placeholder="Search titles..."
                    value={query}
                    onChange={handleQuery}
                    />
                    <button type="submit" onClick={handleSubmitQuery}>Search</button>
                </div>
            </div>
            <div className="feed-posts">
            {posts && posts.length > 0 ? (
                [...posts].map((post, index) => (
                    <Link to={`/view/${post.id}`} key={post.id}>
                        <Card 
                        id = {post.id}
                        key = {post.id}
                        author = {post.author}
                        created_at = {post.created_at}
                        title = {post.title}
                        img_url = {post.img_url}
                        likes = {post.likes} />
                    </Link>
                ))
            )
            : "No posts yet."}

            </div>
        </div>
      )
}

  
export default ViewPosts;