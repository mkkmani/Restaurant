import './index.css'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Navbar'
import CartContext from '../../Context/CartContext'

const CartRoute = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeFromCart,
    removeAllCartItems,
  } = useContext(CartContext)

  const emptyImgUrl =
    'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'

  let totalAmount = 0

  cartList.forEach(each => {
    totalAmount += each.dishPrice * each.quantity
  })

  const EmptyCart = () => (
    <div className="empty-cart">
      <img className="empty-img" src={emptyImgUrl} alt="empty cart" />
      <h1>Your cart is empty</h1>
      <Link to="/">
        <button type="button" className="add-items-btn">
          Add items
        </button>
      </Link>
    </div>
  )

  const CartItems = () => (
    <div>
      <>
        <div className="remove-all-div">
          <button
            className="remove-all-btn"
            type="button"
            onClick={() => removeAllCartItems()}
          >
            Remove all
          </button>
        </div>
      </>
      <ul className="cart-items-ul">
        {cartList.map(item => (
          <li key={item.dishId}>
            <div className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.dishImage}
                  className="cart-image"
                  alt={item.dishName}
                />
                <div className="cart-name-item">
                  <p className="cart-item-name">{item.dishName}</p>
                  <div className="qty-div">
                    <button
                      type="button"
                      onClick={() => decrementCartItemQuantity(item.dishId)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="item-qty">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementCartItemQuantity(item.dishId)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="remove-btn-div">
                <p className="cost-p">{`Cost: ${item.currency} ${
                  item.dishPrice * item.quantity
                }`}</p>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.dishId)
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-cost-div">
        <div>
          <p>{`Total amount: SAR ${totalAmount}`}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <Header />
      {cartList.length > 0 ? <CartItems /> : <EmptyCart />}
    </div>
  )
}

export default CartRoute
