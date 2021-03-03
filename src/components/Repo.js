import '../styles/Repo.scss';

const Repo = ({ repo }) => {
  return (
    <>
    { repo && (<div className='repo'>
      <h3 className="full-name repo-item">{ repo.full_name.split('/')[1].toUpperCase() }</h3>
      <div className="repo-info">
          <div className="license repo-item">License: { (repo.license && repo.license.name) || 'N/A' }</div>
          <div className="stars repo-item">Stars: { repo.stargazers_count }</div>
          <div className="watchers repo-item">Watchers: { repo.watchers }</div>
          <div className="forks repo-item">Forks: { repo.forks }</div>
      </div>
      <div className="divider"></div>
      <h4>Description</h4>
      <div className="description repo-item">{ repo.description }</div>
    </div>)}
    </>
  )
}

export default Repo
