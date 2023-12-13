import React from 'react'

const RestaurantContext = React.createContext({
  addToCart: () => {},
  removeFromCart: () => {},
  cartList: [],
  restaurantDetails: {},
  updateQuantity: () => {},
  addDetails: () => {},
  removeAll: () => {},
})

export default RestaurantContext
