import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import {SkeletonTheme} from 'react-loading-skeleton'
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

  //   addToCart = details => {
  //     const {cartList} = this.state
  //     const existing = cartList.findIndex(item => item.dishId === details.dishId)
  //     if (existing !== -1) {
  //       const updated = [...details]
  //       updated[existing].quantity += 1
  //       this.setState({cartList: updated})
  //     } else {
  //       const updated = [...cartList, {...details, quantity: 1}]
  //       this.setState({cartList: updated})
  //     }
  //   }

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

  updateQuantity = (id, change) => {
    const {cartList} = this.state
    const itemIndex = cartList.findIndex(item => item.dishId === id)
    cartList[itemIndex].quantity += change
    const updatedList = cartList.filter(item => item.quantity > 0)
    this.setState({cartList: updatedList})
  }

  removeFromCart = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(item => item.dishId !== id)
    this.setState({cartList: updatedList})
  }

  removeAll = () => {
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
          updateQuantity: this.updateQuantity,
          removeAll: this.removeAll,
        }}
      >
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Navbar />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
          </Switch>
        </SkeletonTheme>
      </RestaurantContext.Provider>
    )
  }
}

export default App
