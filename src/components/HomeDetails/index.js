import {useContext, useState, useEffect} from 'react'
import DishCard from '../DishCard'
import CartContext from '../../Context/CartContext'
import './index.css'

const HomeDetails = () => {
  const {restaurantDetails} = useContext(CartContext)
  const [activeTab, setActiveTab] = useState('')
  const menuItems = restaurantDetails[0].tableMenuList

  useEffect(() => {
    const tabActive = () => {
      const tab = menuItems[0].menuCategoryId
      setActiveTab(tab)
    }

    tabActive()
  }, [menuItems])

  const renderMenuTabs = () => (
    <ul className="menu-tabs-ul">
      {restaurantDetails.map(each => {
        const {tableMenuList} = each

        return tableMenuList.map(eachMenu => (
          <li key={eachMenu.menuCategoryId}>
            <button
              type="button"
              onClick={() => setActiveTab(eachMenu.menuCategoryId)}
              className={
                activeTab === eachMenu.menuCategoryId
                  ? 'tab-menu active-tab'
                  : 'tab-menu'
              }
              key={eachMenu.menuCategoryId}
            >
              {eachMenu.menuCategory}
            </button>
          </li>
        ))
      })}
    </ul>
  )

  const renderItems = () => {
    const [activeCategory] = menuItems.filter(
      items => items.menuCategoryId === activeTab,
    )

    if (!activeCategory) {
      return null
    }

    const {categoryDishes, menuCategory} = activeCategory

    const custom = menuCategory === 'Fast Food'

    return (
      <ul className="items-ul-home">
        {categoryDishes.map(each => (
          <li key={each.dishId}>
            <DishCard key={each.dishId} details={each} custom={custom} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      {renderMenuTabs()}
      {renderItems()}
    </div>
  )
}

export default HomeDetails
