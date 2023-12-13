import {useContext} from 'react'
import {Link} from 'react-router-dom'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const CartRoute = () => {
  const {cartList, updateQuantity, removeAll, removeFromCart} = useContext(
    RestaurantContext,
  )

  let totalAmount = 0

  cartList.forEach(each => {
    totalAmount += each.dishPrice * each.quantity
  })

  const removeAllItems = () => (
    <div className="remove-all-div">
      <button
        className="remove-all-btn"
        type="button"
        onClick={() => removeAll()}
      >
        Remove all
      </button>
    </div>
  )

  const returnItemsList = () => (
    <div>
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
                      onClick={() => updateQuantity(item.dishId, -1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="item-qty">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.dishId, 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="remove-btn-div">
                <p className="cost-p">{`Cost: SAR ${
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

  const returnCartEmpty = () => (
    <div className="empty-cart">
      <h1 className="empty-text">You didn't added any items</h1>
      <Link to="/">
        <button type="button" className="add-items-btn">
          Add items
        </button>
      </Link>
    </div>
  )

  if (cartList.length === 0) {
    return returnCartEmpty()
  }

  return (
    <div>
      {removeAllItems()}
      {returnItemsList()}
    </div>
  )
}

export default CartRoute