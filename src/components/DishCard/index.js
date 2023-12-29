import {useState, useContext} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const DishCard = props => {
  const {details, custom} = props
  const {addToCart} = useContext(RestaurantContext)
  const {
    currency,
    dishAvailability,
    dishCalories,
    dishDesc,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = details

  //   const [quantity, setQuantity] = useState(0)

  //   const handleIncrement = () => {
  //     setQuantity(quantity + 1)
  //     addToCart({...details, quantity: quantity + 1})
  //   }

  //   const handleDecrement = () => {
  //     if (quantity > 0) {
  //       setQuantity(quantity - 1)
  //       addToCart({...details, quantity: quantity - 1})
  //     }
  //   }

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
              <div className="dish-btn-quantity">
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addToCart(details)}
                >
                  ADD TO CART
                </button>
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
