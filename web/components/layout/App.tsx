// 此文件将会在服务端/客户端都将会用到
// 可通过 __isBrowser__ 或者 useEffect 判断当前在 浏览器环境做一些初始化操作
import { LayoutProps } from 'ssr-types-react'
import '@/styles/index.less'
import { useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import SiderMenu from '@/components/SiderMenu'
import Header from '@/components/Header'
import React from 'react'
import { PageEnum } from '@/enum/page'

const {
  Sider,
  Content
} = Layout

export default (props: LayoutProps) => {
  const location = useLocation()
  const isLogin = location.pathname === PageEnum.LOGIN

  const loginPage = (
    <div>
      { props.children! }
    </div>
  )
  const page = (
    <Layout>
      <Header/>
      <Layout>
        <Sider className={'overflow-hidden app-sider'} theme={'light'}>
          <SiderMenu></SiderMenu>
        </Sider>
        <Content className={'app-content overflow-auto'}>
          {props.children!}
        </Content>
      </Layout>
    </Layout>
  )
  return (
    <div>
      {
        isLogin ? loginPage : page
      }
    </div>
  )
}
