import { useEffect } from 'react';
import { useSelector } from "react-redux";
import User from './User';
import '../styles/Following.scss';

const Following = () => {
  const followees = useSelector(state => state.followees);

  return (
    <div className='followees'>
      {followees.length > 0 ? followees.map((followee) => (<User key={followee.id} user={followee} fetching={false} />)) :
       (<div className='no-followees'>You do not follow anyone yet...</div>)}
    </div>
  )
}

export default Following
