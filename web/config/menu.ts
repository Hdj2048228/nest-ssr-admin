export const menuData = [
  {
    name: '首页',
    path: '/',
    icon: '',
    key: 'home',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'user',
    key: 'user',
    subMenus: [
      {
        name: '用户详情',
        path: '/user/detail/:userId',
        hidden: true,
        key: 'userDetail'
      }
    ]
  },
  {
    name: '成本管理',
    path: '/cost',
    icon: 'cost',
    key: 'cost'
  },
  {
    name: '报价管理',
    path: '/quote',
    key: 'quote',
    icon: 'money'
  },
  {
    name: '交易',
    path: '/transaction',
    key: 'transaction',
    icon: 'business'
  },
  {
    name: '货币/国家管理',
    path: '/country',
    icon: 'country',
    key: 'country'
  }
]
