import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiProjectService: {
    projects: () => Promise<any>
  }
}> = async ({ ctx, routerProps }) => {
  return {
    projectData: []
  }
}

export default fetch
