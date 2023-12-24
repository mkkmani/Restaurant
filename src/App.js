import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import CartRoute from './components/CartRoute'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRouter'
import RestaurantContext from './Context/cartContext'

class App extends Component {
  state = {
    cartList: [],
    restaurantDetails: {},
  }

  addToCart = details => {
    const {cartList} = this.state
    const existing = cartList.findIndex(item => item.dishId === details.dishId)

    if (existing !== -1) {
      const updated = [...cartList] // Spread the cartList
      updated[existing].quantity += 1
      this.setState({cartList: updated})
    } else {
      const updated = [...cartList, {...details, quantity: 1}]
      this.setState({cartList: updated})
    }
  }

  addDetails = details => {
    this.setState({restaurantDetails: details})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const itemIndex = cartList.findIndex(item => item.dishId === id)

      if (itemIndex !== -1) {
        const updatedCartList = [...cartList]
        updatedCartList[itemIndex] = {
          ...updatedCartList[itemIndex],
          quantity: updatedCartList[itemIndex].quantity + 1,
        }

        return {cartList: updatedCartList}
      }

      return null
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const itemIndex = cartList.findIndex(item => item.dishId === id)

      if (itemIndex !== -1) {
        const updatedCartList = [...cartList]
        updatedCartList[itemIndex] = {
          ...updatedCartList[itemIndex],
          quantity: updatedCartList[itemIndex].quantity - 1,
        }

        if (updatedCartList[itemIndex].quantity === 0) {
          updatedCartList.splice(itemIndex, 1)
        }

        return {cartList: updatedCartList}
      }

      return null
    })
  }

  //   updateQuantity = (id, change) => {
  //     const {cartList} = this.state
  //     const itemIndex = cartList.findIndex(item => item.dishId === id)
  //     cartList[itemIndex].quantity += change
  //     const updatedList = cartList.filter(item => item.quantity > 0)
  //     this.setState({cartList: updatedList})
  //   }

  removeFromCart = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(item => item.dishId !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, restaurantDetails} = this.state
    return (
      <RestaurantContext.Provider
        value={{
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          cartList,
          restaurantDetails,
          addDetails: this.addDetails,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Navbar />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
        </Switch>
      </RestaurantContext.Provider>
    )
  }
}

export default App
