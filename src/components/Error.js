import '../styles/Error.scss';

const Error = ({ error, type }) => {
  return (
    <div className='error'>
      <div className='error-symbol'>&#9888;</div>
      <div className='error-message'>{ `${error} ${type}` }</div>
      <div className='advice'>Please try again later</div>
    </div>
  )
}

export default Error
