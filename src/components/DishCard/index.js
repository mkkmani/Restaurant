import {useState, useContext} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import CartContext from '../../Context/CartContext'
import './index.css'

const DishCard = props => {
  const {details} = props

  const {
    dishId,
    dishName,
    dishImage,
    addonCat,
    currency,
    dishAvailability,
    dishCalories,
    dishDesc,
    dishPrice,
    dishType,
  } = details

  const context = useContext(CartContext)
  const {
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    cartList,
  } = context

  const dishInCart = cartList.find(item => item.dishId.includes(dishId))
  const initialQuantity = dishInCart ? dishInCart.quantity : 0

  const [quantity, setQuantity] = useState(initialQuantity)

  const increment = () => {
    setQuantity(quantity + 1)
    incrementCartItemQuantity(dishId)
  }

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      decrementCartItemQuantity(dishId)
    }
  }

  return (
    <div className="dish-card">
      <div className="type-details">
        <BiFoodTag className={dishType === 2 ? 'non-veg' : 'veg'} />
        <div className="dish-details">
          <p className="dish-name">{dishName}</p>
          <span>{`${currency} ${dishPrice}`}</span>
          <span className="dish-desc">{dishDesc}</span>
          {addonCat > 0 && <p>Customizations available</p>}
          <div>
            {dishAvailability ? (
              <div>
                <div className="dish-btn-quantity">
                  <button type="button" className="qty-btn" onClick={decrement}>
                    -
                  </button>
                  <p>{quantity}</p>
                  <button type="button" className="qty-btn" onClick={increment}>
                    +
                  </button>
                </div>
                <div>
                  {quantity > 0 && (
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => {
                        addToCart(details)
                      }}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p>Not available</p>
            )}
          </div>
        </div>
      </div>
      <div className="calories-img">
        <p className="calories">{`${dishCalories} calories`}</p>
        <div className="img-div">
          <img className="dish-img" src={dishImage} alt={dishName} />
        </div>
      </div>
    </div>
  )
}

export default DishCard
