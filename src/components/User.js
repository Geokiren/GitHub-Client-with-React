import { useState, useEffect, Suspense } from 'react';
import LazyUser from './LazyUser';
import '../styles/User.scss';

const User = ({ user, updateRepo }) => {
  const [ userDetails, setUserDetails] = useState({});
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUserDetails(user.url);
      setUserDetails(userFromServer);
    }
    getUser();
  }, []);


  const fetchUserDetails = async ( url ) => {
    setLoading(true);
    const res = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("geokiren:8a79539b4d07f8d99644ce53881b5229d3712e83").toString('base64')
      },
    });
    const data = await res.json();
    setTimeout(() => {
      setLoading(false);
    }, 5);
    return data;
  };

  return (
    <>

      
        { isLoading ? <LazyUser /> : (<div className='user' onClick={() => updateRepo({username: userDetails.login, name: userDetails.name})}>
            <div className="follow">&#9825;</div>
            <div className="avatar">
                <img src={userDetails.avatar_url} alt="User Avatar" />
            </div>
            <div className="details">
                <div className="name detail-item">{ userDetails.name }</div>
                <div className="login-name detail-item">Username: {userDetails.login}</div>
                <div className="location detail-item">Location: {userDetails.location || 'N/A'}</div>
                <div className="public-repos detail-item">Repos: {userDetails.public_repos}</div>
                <div className="public-gists detail-item">Gists: {userDetails.public_gists}</div>
                <div className="followers detail-item">Followers: {userDetails.followers}</div>
                <div className="following detail-item">Following: {userDetails.following}</div>
            </div>
        </div>)}
      
      
    </>
  )
}

export default User
