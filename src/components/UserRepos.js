import { useState, useEffect } from 'react';
import Repo from './Repo';
import Error from './Error';
import Pagination from './Pagination';
import '../styles/UserRepos.scss';
 
const UserRepos = ({ repo, closeRepos }) => {
  const [ page, setPage ] = useState(1);
  const [ repos, setRepos ] = useState(() => []);
  const [ error, setError ] = useState('');

  useEffect(() => {
    if(!error) {
    const getRepos = async () => {
      const updatedRepos = await fetchRepos();
      setRepos(repos => updatedRepos);
    }
    getRepos();
  }
  }, [page])

  const fetchRepos = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${repo.username}/repos?sort=updated&type=owner&direction=desc&page=${page}&per_page=10`, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.REACT_APP_GITHUB_USERNAME}:${process.env.REACT_APP_GITHUB_KEY}`).toString('base64')
        }
      });
      const data = await res.json();
      return data;
  } catch(err) {
      setError(old => err.message);
  }
  }

  const previousPage = () => {
    if(page > 1) {
      setPage(old => old - 1);
    }
  }

  const nextPage = () => {
    setPage(old => old + 1);
  }

  return (
    <div id="repos-outer">
        <div id="repos">
          <div id="close" onClick={closeRepos}>&#10006;</div>
          <h1 id="title">{ repo.name }'s Repos</h1>
          { !error ? (
            <>
            
            <div id="repos-container">
                <div className="repos-list">
                  {repos.length > 0 && repos.map((rep) => (<Repo repo={rep} key={rep.id} />))}
                </div>
            </div>
            <Pagination page={page} nextPage={nextPage} previousPage={previousPage} />
            </>
          ) : <Error error={error} type={'repos'} /> }
          
        </div>
    </div>
  )
}

export default UserRepos
