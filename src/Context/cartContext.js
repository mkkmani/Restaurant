import React from 'react'

const CartContext = React.createContext({
  addToCart: () => {},
  removeFromCart: () => {},
  cartList: [],
  restaurantDetails: {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addDetails: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
