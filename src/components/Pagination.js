import '../styles/Pagination.scss';

const Pagination = ({ page, isLastPage, nextPage, previousPage, noOfPages }) => {
  return (
    <div id="pagination-container">
      <button id="previous"  className={`pagination ${page <= 1 ? 'disabled' : ''}`} onClick={previousPage}>Previous</button>
      <div id="page">{ page }{ noOfPages ? (' / ' + noOfPages) : '' }</div>
      <button id="next"  className={`pagination ${isLastPage ? 'disabled' : ''}`} onClick={nextPage}>Next</button>
    </div>
  )
}

export default Pagination
