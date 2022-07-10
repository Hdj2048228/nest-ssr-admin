import React, { useState, useEffect } from 'react'
import { MenuItemMap } from '~/typings/data'
import { Menu } from 'antd'
import { UserOutlined, StockOutlined, GlobalOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons'
import { useHistory, useLocation, withRouter, matchPath } from 'react-router-dom'
import { menuData } from '@/config/menu'
import { MenuEnum } from '@/enum/menu'
import styles from './index.module.less'
import { CSSTransition } from 'react-transition-group'

interface MenuItem {
  label: string
  key: string
  icon?: React.ReactNode
  children?: MenuItem
}

interface RouteParams {
  userId?: string
}

const SliderMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const [selectKeys, changeSelectKeys] = useState<any>([])
  const [subMenu, changeSubMenu] = useState<string>('')
  const [subMenuVisible, changeSubmenuVisible] = useState<boolean>(false)

  const getMatchPathParams = (path): RouteParams => {
    const cleanPath = getCleanPath(path)
    const menu = getRouteMenu(cleanPath)
    const mp = matchPath(path, {
      path: menu?.path,
      exact: false,
      strict: false
    })
    return mp?.params || {}
  }

  const getCleanPath = p => p?.replace(/[0-9]+/g, '').replace(/[/]/g, '').replace(/:userId/g, '')
  const getRouteMenu = (p) => {
    let result
    menuData.forEach(item => {
      const cleanPath = getCleanPath(item.path)
      if (p === cleanPath) {
        result = JSON.parse(JSON.stringify(item))
      } else {
        item?.subMenus?.forEach(child => {
          const cleanChildPath = getCleanPath(child.path)
          if (cleanChildPath === p) {
            result = JSON.parse(JSON.stringify(child))
          }
        })
      }
    })
    return result
  }

  const getRouteMenuByKey = (key) => {
    let result
    menuData.forEach(item => {
      if (item.key === key) {
        result = JSON.parse(JSON.stringify(item))
      } else {
        item?.subMenus?.forEach(child => {
          if (child.key === key) {
            result = JSON.parse(JSON.stringify(child))
          }
        })
      }
    })
    return result
  }

  const getSelectKey = () => {
    const path = getCleanPath(location.pathname)
    menuData.forEach(item => {
      const cleanPath = getCleanPath(item.path)
      if (cleanPath === path) {
        changeSelectKeys([item.key])
      } else {
        item.subMenus?.forEach(child => {
          const cleanChildPath = getCleanPath(child.path)
          if (cleanChildPath === path) {
            changeSelectKeys([child.key])
          }
        })
      }
    })
  }

  useEffect(() => {
    const path = location.pathname
    const isUserMenu = !!MenuEnum.USER_MENU_PATHS.find(item => path.includes(item))
    getSelectKey()
    changeSubmenuVisible(isUserMenu)
    if (isUserMenu) {
      changeSubMenu('userMenu')
    } else {
      changeSubMenu('')
    }
  }, [location.pathname])

  function getItem (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItemMap[] | any,
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }

  const IconMap = {
    user: <UserOutlined />,
    cost: <StockOutlined />,
    country: <GlobalOutlined />,
    money: <DollarOutlined />,
    business: <BarChartOutlined />
  }

  const getIcon = (icon) => {
    return IconMap[icon] || null
  }

  const onSelect = (detail) => {
    const { key } = detail
    const params = getMatchPathParams(location.pathname)
    const current = getRouteMenuByKey(key)
    history.push({ pathname: current.path.replace(':userId', params.userId) })
  }

  const items = menuData.map(item => {
    return getItem(item.name, item.key, getIcon(item.icon))
  })

  const userMenuItems = menuData[1]?.subMenus?.filter(item => !item?.hidden).map(item => {
    return getItem(item.name, item.key)
  })

  return (
    <div className={styles['slide-menu']}>
      <CSSTransition in={subMenuVisible} timeout={0} className={'slide-in absolute w-full'} classNames={'slide-in'}>
        <div>
          { subMenu === 'userMenu' && <Menu
            onSelect={onSelect}
            items={userMenuItems}
            mode={'inline'}
            selectedKeys={selectKeys}
          >
          </Menu> }
        </div>
      </CSSTransition>
      <CSSTransition in={subMenuVisible} timeout={0} className={'slide-out absolute w-full'} classNames={'slide-out'}>
        <div>
          <Menu
            onSelect={onSelect}
            items={items}
            mode={'inline'}
            selectedKeys={selectKeys}
          >
          </Menu>
        </div>
      </CSSTransition>
    </div>
  )
}

export default withRouter(SliderMenu)
