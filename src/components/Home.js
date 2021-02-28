import { useState, useEffect } from 'react';
import User from './User'
import '../styles/Home.scss';

const Home = () => {
  const [ users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    }
    getUsers();
  }, []);

  const fetchUsers = async (page = 1) => {
    const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`, {
            headers: {
              'Authorization': 'Basic ' + Buffer.from("geokiren:8a79539b4d07f8d99644ce53881b5229d3712e83").toString('base64')
            },
          });
          const { items } = await res.json();
          return items;
  }

  return (
    <div className='home'>
      <div id="user-list">
        {users.map((user) => (<User key={user.id} user={user} />))}
    </div>
    </div>
  )
}

export default Home
