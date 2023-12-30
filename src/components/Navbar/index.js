import {Link, useHistory} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart, AiOutlineHome} from 'react-icons/ai'
import CartContext from '../../Context/CartContext'
import './index.css'

const Header = () => {
  const history = useHistory()
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {cartList, restaurantDetails} = useContext(CartContext)
  const itemsCount = cartList.length

  let name = ''

  if (restaurantDetails.length > 0) {
    name = restaurantDetails[0].restaurantName
  } else {
    name = 'loading...'
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="link">
          <span className="resto-name">{name}</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="link cart-count">
            <AiOutlineHome className="nav-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link cart-count">
            <button data-testid="cart" type="button">
              <AiOutlineShoppingCart className="nav-icon" aria-label="cart" />
            </button>
            <p>My orders</p>
            <span className="span-count">{itemsCount}</span>
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

export default Header
