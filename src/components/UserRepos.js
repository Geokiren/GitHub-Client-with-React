import { useState, useEffect } from 'react';
import Repo from './Repo';
import '../styles/UserRepos.scss';
 
const UserRepos = ({ repo, closeRepos }) => {
  const [ page, setPage ] = useState(1);
  const [ repos, setRepos ] = useState(() => []);

  useEffect(() => {
    const getRepos = async () => {
      const updatedRepos = await fetchRepos();
      setRepos(repos => updatedRepos);
    }
    getRepos();
  }, [page])

  const fetchRepos = async () => {
    const res = await fetch(`https://api.github.com/users/${repo.username}/repos?sort=updated&type=owner&direction=desc&page=${page}&per_page=10`);
    const data = await res.json();
    return data;
  }

  const nextPage = () => {
    setPage(old => old + 1);
  }

  const previousPage = () => {
    setPage(old => old - 1);
  }


  
  return (
    <div id="repos-outer">
        <div id="repos">
          <div id="close" onClick={closeRepos}>&#10006;</div>
            <h1 id="title">{ repo.name }'s Repos</h1>
            <div id="repos-container">
                <div className="repos-list">
                  {repos.map((rep) => (<Repo repo={rep} key={rep.id} />))}
                </div>
            </div>
            <div id="pagination-container">
                <button id="previous" className={`pagination ${page <= 1 ? 'disabled' : ''}`}  onClick={previousPage}>Previous</button>
                <div id="page">{ page }</div>
                <button id="next" className="pagination" onClick={nextPage}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default UserRepos
