import { Layout } from 'antd'
import React from 'react'

const { Header } = Layout

export default () => {
  return (
    <Header className={'text-white text-3xl flex items-center px-5'}>
      <div className={'logo'}>
        <img src={'../../assets/images/logo.svg'} alt={'logo'} />
      </div>
    </Header>
  )
}
