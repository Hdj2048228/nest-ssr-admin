import React, { useState } from 'react'
import SubTitle from '@/components/SubTitle'
import { PageHeader, Form, Input, DatePicker, Select, Button, AutoComplete } from 'antd'
import styles from './index.module.less'
import DynamicTable from '@/components/DynamicTable'
import { debounce } from '~/utils'
import { getProjects } from '@/api/project'

const { RangePicker }: any = DatePicker
const { Option }: any = Select

export default () => {
  const [options, setOptions] = useState<any>([])
  const [totalList] = useState<any>([
    {
      name: '收入总额',
      value: '0'
    },
    {
      name: '支付总额',
      value: '0'
    },
    {
      name: '渠道成本',
      value: '0'
    },
    {
      name: '税成本',
      value: '0'
    },
    {
      name: '平台处理费',
      value: '0'
    },
    {
      name: '税费',
      value: '0'
    }
  ])
  const routes = [
    {
      path: '',
      breadcrumbName: '用户管理'
    },
    {
      path: '',
      breadcrumbName: '交易'
    }
  ]

  const onProjectSelect = (data, option) => {
    console.log(data)
  }

  const onProjectSearch = async (text: string) => {
    if (!text) return
    const res = await getProjects({ name: text })
    if (res?.length) {
      setOptions(res?.map((item, index) => {
        const newItem = { ...item }
        return {
          key: index,
          id: item.id,
          value: newItem.enName
        }
      }))
    } else {
      setOptions([])
    }
  }

  const debounceSearch = debounce(onProjectSearch, 500)

  return (
    <div>
      <PageHeader className={'bg-white'} title={'交易列表'} subTitle={'查看用户的交易数据'} breadcrumb={{ routes }} />
      <div className={styles['search-area']}>
        <Form className={'flex items-center bg-white p-6 rounded-sm m-6'}>
          <Form.Item>
            <Input placeholder={'搜索交易ID, 订单号'} />
          </Form.Item>
          <Form.Item className={'ml-6'}>
            <RangePicker placeholder={['开始时间', '结束时间']} />
          </Form.Item>
          <Form.Item className={'ml-6'} label={'支付商'}>
            <Select
              className={'w-[120px]'}
              placeholder="状态"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item className={'ml-6'} label={'应用'}>
            <AutoComplete
              className={'w-[200px]'}
              placeholder={'请输入应用名称'}
              onSelect={onProjectSelect}
              onSearch={debounceSearch}
            >
              {
                options.map((item, index) => (
                  <AutoComplete.Option key={index} value={item.value}>
                    <span>{ item.value }</span>
                    <span className={'info-color ml-2'}>ID: { item.id }</span>
                  </AutoComplete.Option>
                ))
              }
            </AutoComplete>
          </Form.Item>
          <Form.Item className={'ml-6'} label={'状态'}>
            <Select
              className={'w-[140px]'}
              placeholder="状态"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item className={'ml-6'}>
            <Button type={'primary'}>查询</Button>
          </Form.Item>
        </Form>
      </div>
      <div className={`${styles['list-area']} m-6 p-6 bg-white rounded-sm`}>
        <SubTitle title={'总览'} />
        <div className={'total-box flex items-center bg-[#FAFAFA] mt-2 rounded py-6'}>
          {
            totalList.map(item => {
              return (
                <div className={`${styles['item']} w-1/6`} key={item.name}>
                  <div className={`${styles['name']} text-[14px]`}>{item.name}</div>
                  <div className={'value mt-1 text-[24px] font-bold'}>{ item.value }</div>
                </div>
              )
            })
          }
        </div>
        <div className={'table-area mt-6'}>
          <DynamicTable tableKey={'交易列表'} />
        </div>
      </div>
    </div>
  )
}
