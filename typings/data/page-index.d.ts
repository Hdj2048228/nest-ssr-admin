export interface IData {
  indexData: IndexData
  testData: User[]
}

export interface MenuData {
  data?: MenuItemMap[]
}

export interface MenuItemMap {
  icon?: string
  name: string
  path: string
  children?: MenuItemMap[]
}

export interface User {
  id: string
  name: string
}
export interface IndexData {
  data: ComponentsArr[]
}
export interface ComponentsArr {
  components: ItemMapArr[]
}

export interface ItemMapArr {
  itemMap: ItemMap[]
}
export interface ItemMap {
  action: {
    type: string
    extra: {
      value: string
      videoId?: string
    }
  }
  mark: {
    text: string
  }
  subtitle?: string
  title: string
  img: string
  summary: string
}
