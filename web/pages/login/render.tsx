import React, { useState } from 'react'
import { Tabs, Form, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { loginAdminUser, registerAdminUser } from '@/api/AdminUser'
import DynamicForm from '@/components/DynamicForm'
import styles from './index.module.less'
import { CookieEnum } from '@/enum/cookie'

const { TabPane } = Tabs

export default () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [tabKey, setTabKey] = useState<string>('login')
  const items: any = [
    {
      itemType: 'input',
      label: '',
      name: 'username',
      required: true,
      rules: [{ required: true, message: '邮箱格式错误', type: 'email' }],
      itemProps: {
        type: 'username',
        placeholder: tabKey === 'register' ? '邮箱' : '请输入账户邮箱',
        allowClear: true,
        value: '',
        size: 'large'
      }
    },
    {
      itemType: 'password',
      label: '',
      required: true,
      rules: [{ required: true, message: '密码格式错误' }],
      name: 'password',
      itemProps: {
        placeholder: tabKey === 'register' ? '密码' : '请输入账户密码',
        allowClear: true,
        value: '',
        type: 'new-password',
        size: 'large'
      }
    }
  ]

  const onChange = (data) => {
    setTabKey(data)
  }

  const login = async () => {
    const values = form.getFieldsValue()
    const password = await crypto(values.password)
    const params: any = {
      username: values.username,
      password
    }
    const res = await loginAdminUser(params)
    message.success('登录成功！')
    if (res?.token) {
      Cookies.set(CookieEnum.TOKEN_NAME, res.token)
      history.push({ pathname: '/' })
    }
  }

  const crypto = async (password) => {
    return await new Promise((resolve, reject) => {
      const md5 = CryptoJS.MD5(password)
      resolve(md5.toString())
    })
  }

  const register = async () => {
    const values = form.getFieldsValue()
    const { username, password } = values
    const cryptoPassword = await crypto(password)
    const params: any = {
      username,
      password: cryptoPassword,
      email: username
    }
    await registerAdminUser(params)
    message.success('注册成功！')
  }

  const handleSubmit = async () => {
    const isLogin = tabKey === 'login'
    try {
      await form.validateFields()
      isLogin ? await login() : await register()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <div className={styles['login-wrap']}>
      <div className={styles['content']}>
        <div className={'title text-2xl font-bold'}>KOP 后台管理系统</div>
        <div className={'info-color mt-2 text-[14px]'}>专属于KOP支付，致力于打造一个强大的管理平台</div>
        <Tabs className={'w-full mt-10'} activeKey={tabKey} onChange={onChange}>
          <TabPane tab="账户密码登录" key="login" />
          <TabPane tab="注册系统账号" key="register"></TabPane>
        </Tabs>
        <DynamicForm className={'w-full'} items={items} form={form} />
        <Button className={'w-full mt-4'} type={'primary'} size={'large'} htmlType={'submit'} onClick={handleSubmit}>
          { tabKey === 'register' ? '注册' : '登录' }
        </Button>
      </div>
    </div>
  )
}
