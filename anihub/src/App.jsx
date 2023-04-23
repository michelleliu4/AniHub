import { useState, useEffect, React } from 'react';
import { useRoutes, Link } from 'react-router-dom'
import { supabase } from './client'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Details from './pages/Details'
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: true })

      setPosts(data);
    }
    fetchPosts();
  }, []);

  const filterList = (search) => {
    let filtered = [];
    if (posts.length != 1) {
      filtered = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredPosts(filtered);
  };

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setSearchInput(searchInput);
    filterList(searchInput);
  };

  
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts}/>
    },
    {
      path: "/details/:id/edit",
      element: <EditPost data={posts} />
    },
    {
      path: "/new",
      element: <CreatePost />
    },
    {
      path: "/details/:id",
      element: <Details data={posts} />
    }
  ]);

  return ( 
    <div className="App">
      <div className="header">
        <div className="title">AniList</div>
        <div className="search-container">
          <input className="input-box" onChange={handleSearchInput} type="text" placeholder="Search"/>
        </div>
        <div className="links">
          <Link to="/"><button className="headerBtn">Home</button></Link>
          <Link to="/new"><button className="headerBtn">New Post</button></Link>
        </div>
      </div>
      {element}
    </div>
  );
}

export default App;
