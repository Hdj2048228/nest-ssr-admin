import React from 'react'
import { LayoutProps } from 'ssr-types-react'
import App from './App'

const Layout = (props: LayoutProps) => {
  // 注：Layout 只会在服务端被渲染，不要在此运行客户端有关逻辑
  const { injectState } = props
  const { injectCss, injectScript } = props.staticList!
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta name='theme-color' content='#000000' />
        <title>kop-admin</title>
        { injectCss }
      </head>
      <body id="im-app">
        <div id="app" className={'overflow-hidden h-full'} >
          <App {...props} />
        </div>
        { injectState }
        { injectScript }
      </body>
    </html>
  )
}

export default Layout
