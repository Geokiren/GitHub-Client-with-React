import { NavLink } from "react-router-dom";
import '../styles/Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to="/" exact className='navlink' activeClassName='navlink-active'>Home</NavLink>
      -
      <NavLink to="/following" className='navlink' activeClassName='navlink-active'>Following</NavLink>
    </div>
  )
}

export default Navbar
