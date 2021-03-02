import React, { useState, useEffect } from 'react';
import User from './User';
import LazyUser from './LazyUser';
import Observer from './Observer';
import '../styles/Home.scss';
import UserRepos from './UserRepos';
// const User = React.lazy(() => import('./User'));
// // const Observer = React.lazy(() => import('./Observer'));

const Home = () => {
  const [ users, setUsers] = useState(() => []);
  const [ page, setPage ] = useState(() => 1);
  const [ renderObserver, setRenderObserver ] = useState(() => false);
  const [ repo, setRepo ] = useState({});
  const [ showRepo, setShowRepo ] = useState(false);

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const fetchUsers = async (page = 1) => {
    const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("geokiren:8a79539b4d07f8d99644ce53881b5229d3712e83").toString('base64')
      },
    });
    const { items } = await res.json();
    return items;
  }

  const getUsers = async (page) => {
    setRenderObserver(false);
    const usersFromServer = await fetchUsers(page);
    const newUsersArray = [...users, ...usersFromServer];
    setUsers(newUsersArray);
    setTimeout(() => {
      setRenderObserver(true);
    }, 300);
    
  }
  
  const handleObserver = () => {
    setPage(prevPage => prevPage + 1);
  }

  const updateRepo = (repo) => {
    setShowRepo(true);
    const updatedRepo = {
      username: repo.username,
      name: repo.name
    }
    setRepo(repo => updatedRepo);
  }

  const closeRepos = () => {
    setShowRepo(false);
  }
  

  return (
    <div className='home'>
      <div id="user-list">
        {users.map((user) => (!showRepo &&<User key={user.id} user={user} updateRepo={updateRepo} />))}
      </div>
      { renderObserver && (<Observer onChange={handleObserver} />)}
      { showRepo  && <UserRepos repo={repo} closeRepos={closeRepos} /> }
    </div>
  )
}

export default Home