import {useContext, useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import HomeDetails from '../HomeDetails'
import Header from '../Navbar'
import CartContext from '../../Context/CartContext'
import './index.css'

const apiStatusList = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  init: 'INIT',
}

const RenderLoader = () => (
  <div className="loader-container">
    <Loader type="Oval" color="orange" height={50} />
  </div>
)

const HomeRoute = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusList.init)
  const {addDetails} = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusList.loading)
      try {
        const api =
          'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
        const response = await fetch(api)

        if (response.ok) {
          const data = await response.json()
          const updatedData = data.map(each => ({
            restaurantId: each.restaurant_id,
            restaurantName: each.restaurant_name,
            restaurantImage: each.restaurant_image,
            tableId: each.table_id,
            tableName: each.table_name,
            branchName: each.branch_name,
            nextUrl: each.nexturl,
            tableMenuList: each.table_menu_list.map(eachMenu => ({
              menuCategory: eachMenu.menu_category,
              menuCategoryId: eachMenu.menu_category_id,
              menuCategoryImage: eachMenu.menu_category_image,
              nextUrl: eachMenu.nexturl,
              categoryDishes: eachMenu.category_dishes.map(eachDish => ({
                dishId: eachDish.dish_id,
                dishName: eachDish.dish_name,
                dishPrice: eachDish.dish_price,
                dishImage: eachDish.dish_image,
                currency: eachDish.dish_currency,
                dishDesc: eachDish.dish_description,
                dishCalories: eachDish.dish_calories,
                dishAvailability: eachDish.dish_Availability,
                dishType: eachDish.dish_Type,
                nextUrl: eachDish.nexturl,
                addonCat: eachDish.addonCat.length,
              })),
            })),
          }))
          addDetails(updatedData)
          setApiStatus(apiStatusList.success)
        } else {
          setApiStatus(apiStatusList.failure)
        }
      } catch (error) {
        setApiStatus(apiStatusList.failure)
      }
    }

    fetchData()
  }, [addDetails])

  const failure = () => <h1>Data fetching failed...</h1>
  const success = () => (
    <div>
      <HomeDetails />
    </div>
  )

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusList.success:
        return success()
      case apiStatusList.failure:
        return failure()
      case apiStatusList.loading:
        return RenderLoader()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderPage()}
    </>
  )
}

export default HomeRoute
