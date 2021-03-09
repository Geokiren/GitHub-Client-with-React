import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from '../actions';
import LazyUser from './LazyUser';
import '../styles/User.scss';

const User = ({ user, updateRepo, fetching }) => {
  const [ userDetails, setUserDetails] = useState({});
  const [ isLoading, setLoading ] = useState(false);
  
  const followees = useSelector(state => state.followees);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUserDetails(user.url);
      setSelected(userFromServer);
      setUserDetails(userFromServer);
    }
    if(fetching) {
      getUser();
    } else {
      setUserDetails(user);
    }
  }, []);

  const fetchUserDetails = async ( url ) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.REACT_APP_GITHUB_USERNAME}:${process.env.REACT_APP_GITHUB_KEY}`).toString('base64')
        },
      });
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
      }, 5);
      return data;
  } catch (err) {
    console.log(err.message)
  }
  };

  const followUser = (e) => {
    e.stopPropagation();
    setUserDetails({ ...userDetails, selected: true });
    dispatch(follow(userDetails));
  }

  const unfollowuser = (e) => {
    e.stopPropagation();
    const index = findUserIndex(userDetails.id, followees);
    setUserDetails({ ...userDetails, selected: false });
    dispatch(unfollow(userDetails, index));
  }

  const findUserIndex = (id, list) => {
    return list.findIndex(user => user.id === id);
  }

  const setSelected = (user) => {
    const index = findUserIndex(user.id, followees);
    if(index > -1) {
      user.selected = true;
    } else {
      user.selected = false;
    }
  }

  return (
    <>

      
        { isLoading ? <LazyUser /> : (<div className='user' onClick={() => updateRepo({username: userDetails.login, name: userDetails.name})}>
            {userDetails.selected ?
             (<div className="following-user" onClick={unfollowuser}>&#10084;</div>) :
              (<div className="follow" onClick={followUser}>&#9825;</div>)}
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
