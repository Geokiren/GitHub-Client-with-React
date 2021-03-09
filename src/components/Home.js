import React, { useState, useEffect } from 'react';
import User from './User';
import Observer from './Observer';
import '../styles/Home.scss';
import UserRepos from './UserRepos';
import Error from './Error';

const Home = () => {
  const [ users, setUsers] = useState(() => []);
  const [ page, setPage ] = useState(() => 1);
  const [ renderObserver, setRenderObserver ] = useState(() => false);
  const [ repo, setRepo ] = useState({});
  const [ showRepo, setShowRepo ] = useState(false);
  const [ error, setError ] = useState('');

  useEffect(() => {
    if(!error) {
      const getUsers = async (page) => {
        setRenderObserver(false);
        const usersFromServer = await fetchUsers(page);
        const newUsersArray = usersFromServer && [...users, ...usersFromServer];
        setUsers(newUsersArray);
        setTimeout(() => {
          setRenderObserver(true);
        }, 500);  
      }
      getUsers(page);
    }
  }, [page]);

  const fetchUsers = async (page = 1) => {
    try {
    const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.REACT_APP_GITHUB_USERNAME}:${process.env.REACT_APP_GITHUB_KEY}`).toString('base64')
      },
    });
    const { items } = await res.json();

    return items;
  } catch(err) {
    setError(old => err.message);
  }
  }

  const handleObserver = () => {
    setPage(prevPage => prevPage + 1);
  }

  const updateRepo = (repo) => {
    setRenderObserver(false);
    setShowRepo(true);
    const updatedRepo = {
      username: repo.username,
      name: repo.name
    }
    setRepo(repo => updatedRepo);
  }

  const closeRepos = () => {
    setTimeout(() => {
      setRenderObserver(true);
    }, 500); 
    setShowRepo(false);
  }
  

  return (
    <div className='home'>
      {!error ? (
        <div id="user-list">
        {users.map((user) => (!showRepo && <User key={user.id} user={user} updateRepo={updateRepo} fetching={true} />))}
      </div>
      ) : <Error error={error} type={'users'} />}
      
      { renderObserver && (<Observer onChange={handleObserver} />)}
      { showRepo  && <UserRepos repo={repo} closeRepos={closeRepos} /> }
    </div>
  )
}

export default Home
