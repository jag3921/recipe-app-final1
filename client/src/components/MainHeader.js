import { Link } from 'react-router-dom';
import logo from '../media/logo2.png';

function MainHeader() {
    return (
        <header>
        <img className="logoImage" src={logo} alt="logo" />
        <h1>Recipe Review App!</h1>
        <nav>
            <Link className="navLink" to='/login'>Login</Link> 
            <Link className="navLink" to='/signup'>Sign Up</Link>
            <Link className="navLink" to='/'>Search for Recipes</Link>
            <Link className="navLink" to='/reviews'>See What People are Saying</Link>
        </nav>
      </header>
    )
}

export default MainHeader;