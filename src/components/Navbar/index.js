import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="link">
          <span>UNI Resto Cafe</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            Cart
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
