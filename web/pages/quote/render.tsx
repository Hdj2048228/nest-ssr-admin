import React, { useRef, useState } from 'react'
import DynamicForm from '@/components/DynamicForm'
import DynamicTable from '@/components/DynamicTable'
import { Form, PageHeader, Select, Button } from 'antd'

export default () => {
  const [form] = Form.useForm()
  const $table = useRef<any>()
  const [queryParams, setQueryParams] = useState({})
  const items = [
    {
      itemType: 'select',
      label: '',
      name: 'zone',
      required: true,
      rules: [{ required: false, message: '' }],
      itemProps: {
        value: 'all',
        placeholder: '所有区域',
        children: (<Select.Option value="all">所有区域</Select.Option>)
      },
    },
    {
      itemType: 'select',
      label: '',
      name: 'country',
      required: true,
      rules: [{ required: false, message: '' }],
      itemProps: {
        value: 'all',
        placeholder: '所有国家',
        children: (<Select.Option value="all">所有国家</Select.Option>)
      },
    },
    {
      itemType: 'select',
      label: '',
      name: 'types',
      required: true,
      rules: [{ required: false, message: '' }],
      itemProps: {
        value: 'all',
        placeholder: '所有类型',
        children: (<Select.Option value="all">所有类型</Select.Option>)
      },
    },
    {
      itemType: 'input',
      label: '',
      name: 'names',
      required: true,
      rules: [{ required: false, message: '' }],
      itemProps: {
        placeholder: '搜索支付方式名称',
        allowClear: true,
        value: ''
      }
    },
    {
      itemType: 'input',
      label: '商户ID',
      name: 'merchant',
      itemProps: {
        placeholder: '商户ID',
        allowClear: true,
        value: ''
      }
    }
  ]

  const handleSearch = () => {
    const values = form.getFieldsValue()
    setQueryParams(values)
    $table.current?.getData()
  }

  return (
    <div>
      <PageHeader className={'bg-white'} title={'报价管理'} subTitle={'编辑此商户下的报价数据'} />
      <div className={'search-area bg-white p-6 m-6 rounded flex items-center'}>
        <DynamicForm layout="inline" form={form} items={items} />
        <Button type={'primary'} onClick={handleSearch}>查询</Button>
      </div>
      <div className={'list-area m-6 p-6 rounded bg-white'}>
        <DynamicTable tableKey={'报价管理列表'} queryParams={queryParams} ref={$table} />
      </div>
    </div>
  )
}
