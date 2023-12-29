import {useState, useContext} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const DishCard = props => {
  const {details, custom} = props
  const {
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(RestaurantContext)
  const {
    currency,
    dishAvailability,
    dishCalories,
    dishDesc,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    dishId,
    quantity,
  } = details

  const [itemQuantity, setItemQuantity] = useState(0)

  const qtyIncrement = () => {
    setItemQuantity(itemQuantity + 1)
    addToCart({...details, quantity: itemQuantity + 1})
    incrementCartItemQuantity(dishId)
  }

  const qtyDecrement = () => {
    if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1)
      decrementCartItemQuantity(dishId)
    }
  }

  const onClickAddBtn = () => {
    addToCart(details)
    setItemQuantity(1)
  }

  return (
    <div className="dish-card">
      <div className="type-details">
        <BiFoodTag className={dishType === 2 ? 'non-veg' : 'veg'} />
        <div className="dish-details">
          <p className="dish-name">{dishName}</p>
          <span>{`${currency} ${dishPrice}`}</span>
          <span className="dish-desc">{dishDesc}</span>
          {custom && <p>Customizations available</p>}
          <div>
            {dishAvailability ? (
              <div>
                <div className="dish-btn-quantity">
                  <button type="button" onClick={qtyDecrement}>
                    -
                  </button>
                  {quantity ? <p>{quantity}</p> : <p>{itemQuantity}</p>}
                  <button type="button" onClick={qtyIncrement}>
                    +
                  </button>
                </div>
                <div className="dish-btn-quantity">
                  <button
                    type="button"
                    className="add-btn"
                    onClick={onClickAddBtn}
                  >
                    ADD TO CART
                  </button>
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
