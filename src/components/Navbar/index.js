import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const Header = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {cartList, restaurantDetails} = useContext(RestaurantContext)
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
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link cart-count">
            <AiOutlineShoppingCart className="nav-icon" />
            <p>My orders</p>
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

export default withRouter(Header)
