import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [posts, setPosts] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = () => {
    window.location.href = 'http://localhost:5003/auth/login';
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5003/posts/user-posts?accessToken=${accessToken}`
      );
      setPosts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Instagram Post Manager</h1>
      {!accessToken ? (
        <button onClick={handleLogin}>Connect Instagram</button>
      ) : (
        <button onClick={fetchPosts}>Fetch Posts</button>
      )}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <img src={post.media_url} alt={post.caption} width="200" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
