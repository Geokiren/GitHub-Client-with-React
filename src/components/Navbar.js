import { NavLink } from "react-router-dom";
import '../styles/Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to="/" exact className='navlink' activeClassName='navlink-active'>Home</NavLink>
      -
      <NavLink to="/followers" className='navlink' activeClassName='navlink-active'>Followers</NavLink>
    </div>
  )
}

export default Navbar
