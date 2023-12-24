import React from 'react'

const RestaurantContext = React.createContext({
  addToCart: () => {},
  removeFromCart: () => {},
  cartList: [],
  restaurantDetails: {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addDetails: () => {},
  removeAllCartItems: () => {},
})

export default RestaurantContext
