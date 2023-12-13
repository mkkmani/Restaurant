import {useContext} from 'react'
import {BiFoodTag} from 'react-icons/bi'
import RestaurantContext from '../../Context/cartContext'
import './index.css'

const DishCard = props => {
  const {details} = props
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

  return (
    <div className="dish-card">
      <div className="type-details">
        <BiFoodTag className={dishType === 2 ? 'non-veg' : 'veg'} />
        <div className="dish-details">
          <p className="dish-name">{dishName}</p>
          <span>{`${currency} ${dishPrice}`}</span>
          <span className="dish-desc">{dishDesc}</span>
          <div>
            {dishAvailability ? (
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(details)}
              >
                Add
              </button>
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
