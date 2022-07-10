import { ReactNestFetch } from 'ssr-types-react'
import { IndexData } from '~/typings/data' // , User
// import axios from 'axios'
const fetch: ReactNestFetch<{
  apiService: {
    index: () => Promise<IndexData>
  }
  // userService: {
  //   findAll: () => Promise<User[]>
  // }
}> = async ({ ctx, routerProps }) => {
  // const data = __isBrowser__ ? await (await window.fetch('/api/index')).json() : await ctx!.apiService?.index()
  // const tData = __isBrowser__ ? await (await window.fetch('/api/users')).json() : { data: [{ id: 1 }] }
  // console.log(1111, data)
  // const d = await axios.get('http://127.0.0.1:3000/api/users')
  // console.log('11111', d)
  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    // indexData: __isBrowser__ ? data?.data : data,
    // testData: __isBrowser__ ? tData?.data : tData
  }
}

export default fetch
