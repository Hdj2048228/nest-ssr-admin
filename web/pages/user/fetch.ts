import { ReactNestFetch } from 'ssr-types-react'
import { IndexData } from '~/typings/data'

const fetch: ReactNestFetch<{
  apiService: {
    index: () => Promise<IndexData>
  }
}> = async ({ ctx, routerProps }) => {
  return {
  }
}

export default fetch
