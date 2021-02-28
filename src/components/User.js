import { useState, useEffect } from 'react';
import '../styles/User.scss';

const User = ({ user }) => {
  const [ userDetails, setUserDetails] = useState({});
  let isLoading = false;

  useEffect(() => {
    isLoading = true;
    const getUser = async () => {
      const userFromServer = await fetchUserDetails(user.url);
      setUserDetails(userFromServer);
    }
    getUser();
    isLoading = false;
  }, []);


  const fetchUserDetails = async ( url ) => {
    const res = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from("geokiren:8a79539b4d07f8d99644ce53881b5229d3712e83").toString('base64')
      },
    });
    const data = await res.json();
    return data;
  };

  return (
    <div className='user'>
        { !isLoading && <div className="following-user">&#10084;</div> }
        { !isLoading &&  <div className="follow">&#9825;</div> }
        { !isLoading &&  <div className="avatar">
            <img src={userDetails.avatar_url} alt="User Avatar" />
        </div> }
        { !isLoading &&  <div className="details">
            <div className="name detail-item">{ userDetails.name }</div>
            <div className="login-name detail-item">Username: {userDetails.login}</div>
            <div className="location detail-item">Location: {userDetails.location || 'N/A'}</div>
            <div className="public-repos detail-item">Repos: {userDetails.public_repos}</div>
            <div className="public-gists detail-item">Gists: {userDetails.public_gists}</div>
            <div className="followers detail-item">Followers: {userDetails.followers}</div>
            <div className="following detail-item">Following: {userDetails.following}</div>
        </div> }
    </div>
  )
}

export default User
