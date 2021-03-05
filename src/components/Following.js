import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import User from './User';
import CustomSelect from './CustomSelect';
import '../styles/Following.scss';

const Following = () => {
  const followees = useSelector(state => state.followees);
  const [orderBy, setOrderBy] = useState('followers');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [isLastPage, updateIsLastPage] = useState(false);

  useEffect(() => {
    filterFollowees();
    updateIsLastPage(old => page >= Math.ceil(followees.length / pageSize));
  }, [orderBy, order, page, pageSize])

  const filterFollowees = () => {
    return paginate(followees.filter(isValid).sort(compareValues(orderBy, order)), pageSize, page);
  }
  
  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  const isValid = (user) => {
    const searchUsername = user.login.toUpperCase().indexOf(search.toUpperCase());
    const searchName = user.name.toUpperCase().indexOf(search.toUpperCase());
    return searchName > -1 ? searchName > -1 : searchUsername > -1 ? searchUsername > -1 : false;
  }

  const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return ( (order === 'desc') && (comparison * -1) || comparison );
    };
  }

  const changeOrderBy = (value) => {
    const newValue = value === 'Public Repos' ? 'public_repos' : 'followers';
    setOrderBy(old => newValue);
  }

  const changeOrder = (value) => {
    const newValue = value === 'Ascending' ? 'asc' : 'desc';
    setOrder(old => newValue);
  }

  const changePageSize = (value) => {
    setPage(old => 1);
    setPageSize(old => value);
  }

  const changeSearch = (e) => {
    setSearch(old => e.target.value);
  }

  const previousPage = () => {
    if(page > 1) {
      setPage(old => old - 1);
    }
  }

  const nextPage = () => {
    if(page < Math.ceil(followees.length / pageSize)) {
      setPage(old => old + 1);
    }
  }
  

  return (
    <div id='following'>
      <div id="filters">
        <CustomSelect options={['Followers', 'Public Repos']} def={'Followers'}  func={changeOrderBy} />
        <CustomSelect options={['Ascending', 'Descending']} def={'Descending'} func={changeOrder} />
        <CustomSelect options={[2, 5, 10]} def={10} func={changePageSize} /> 
        <input className="input-filter" placeholder="Search" onChange={changeSearch} />
      </div>
      <div className='followees'>
        {followees.length > 0 ? filterFollowees().map((followee) => (<User key={followee.id} user={followee} fetching={false} />)) :
        (<div className='no-followees'>You do not follow anyone yet...</div>)}
      </div>
      <div id="pagination-container">
        <button id="previous"  className={`pagination ${page <= 1 ? 'disabled' : ''}`} onClick={previousPage}>Previous</button>
        <div id="page">{ page }</div>
        <button id="next"  className={`pagination ${isLastPage ? 'disabled' : ''}`} onClick={nextPage}>Next</button>
      </div>
    </div>
    
  )
}

export default Following
