import React, { useState, useEffect } from 'react';
import '../styles/Repo.scss';

const Repo = ({ repo }) => {
  const [stars, setStars] = useState(repo.stargazers_count);
  const [watchers, setWatchers] = useState(repo.watchers);
  const [forks, setForks] = useState(repo.forks);
  
  useEffect(() => {
    const updateRepoInfo = async () => {
      const newRepoInfo = await fetchRepoInfo();
      setStars(old => newRepoInfo && newRepoInfo.stargazers_count);
      setWatchers(old => newRepoInfo && newRepoInfo.watchers);
      setForks(old => newRepoInfo && newRepoInfo.watchers);
    }
    const interval = setInterval(updateRepoInfo, 30000);
    return () => clearInterval(interval);
  }, [])

  const fetchRepoInfo = async () => {
    const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.full_name.split('/')[1]}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.REACT_APP_GITHUB_USERNAME}:${process.env.REACT_APP_GITHUB_KEY}`).toString('base64')
      }
    });
    const data = await res.json();
    return data;
  }

  return (
    <>
    { repo && (<div className='repo'>
      <h3 className="full-name repo-item">{ repo.full_name.split('/')[1].toUpperCase() }</h3>
      <div className="repo-info">
          <div className="license repo-item">License: { (repo.license && repo.license.name) || 'N/A' }</div>
          <div className="stars repo-item">Stars: { stars }</div>
          <div className="watchers repo-item">Watchers: { watchers }</div>
          <div className="forks repo-item">Forks: { forks }</div>
      </div>
      <div className="divider"></div>
      <h4>Description</h4>
      <div className="description repo-item">{ repo.description }</div>
    </div>)}
    </>
  )
}

export default Repo
