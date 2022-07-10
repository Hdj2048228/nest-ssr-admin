import { Select } from 'antd'
import React from 'react'

export const getFormItems = (onSearch) => {
  return [
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
      itemType: 'search',
      label: '',
      name: 'names',
      required: true,
      rules: [{ required: false, message: '' }],
      itemProps: {
        placeholder: '搜索支付方式名称',
        allowClear: true,
        value: '',
        enterButton: 'Search',
        onSearch
      }
    }]
}
export const getTableColumns = () => {
  return {
    tableKey: '成本管理列表',
    setting: {
      rowKey: 'id',
      bordered: true,
      columns: [
        {
          title: '区域',
          dataIndex: 'area'
        },
        {
          title: '国家地区',
          dataIndex: 'country'
        },
        {
          title: '税',
          dataIndex: 'tax'
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '渠道费(百分比)',
          dataIndex: 'channelPercent'
        },
        {
          title: '渠道费（固定值）',
          dataIndex: 'channelFixed'
        },
        {
          title: '渠道费（最小值）',
          dataIndex: 'channelMin'
        }
      ]
    }
  }
}
