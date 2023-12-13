import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const Navbar = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {cartList} = useContext(RestaurantContext)
  const itemsCount = cartList.length

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
          <Link to="/cart" className="link cart-count">
            Cart
            {itemsCount > 0 && <span className="span-count">{itemsCount}</span>}
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
