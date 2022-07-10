import React, { useRef } from 'react'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Switch, PageHeader } from 'antd'
import { getTableListApi } from '~/web/api/common'

const request = getTableListApi
interface CostItem {
  id: number
  rowSpan?: number
  countryRowSpan?: number
}

const columns: Array<ProColumns<CostItem>> = [
  {
    title: '区域',
    dataIndex: 'zone',
    valueType: 'select',
    initialValue: 'all',
    valueEnum: {
      all: { text: '所有地区', status: 'Default' },
      asia: {
        text: '亚太',
        status: 'Error',
      },
    },
    onCell: (_, index) => {
      return { rowSpan: Reflect.has(_, 'rowSpan') ? _.rowSpan : 1 }
    },
  },
  {
    title: '国家/地区',
    dataIndex: 'country',
    valueType: 'select',
    initialValue: 'all',
    onCell: (_, index) => {
      return { rowSpan: Reflect.has(_, 'countryRowSpan') ? _.countryRowSpan : 1 }
    },
    valueEnum: {
      all: { text: '所有国家', status: 'Default' },
      cn: {
        text: '中国',
        status: 'Error',
      },
    },
  },
  {
    title: '税',
    dataIndex: 'tax',
    search: false,
    onCell: (_, index) => {
      return { rowSpan: Reflect.has(_, 'countryRowSpan') ? _.countryRowSpan : 1 }
    },
  },
  {
    title: '支付类型',
    dataIndex: 'payType',
    initialValue: 'all',
    valueEnum: {
      all: { text: '所有类型', status: 'Default' },
      xsolla: {
        text: 'xsolla',
        status: 'Error',
      },
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    search: false,

  },
  {
    title: '名称',
    dataIndex: 'payName',
    search: false,
  },
  {
    title: '渠道费(百分比)',
    dataIndex: 'dao',
    search: false,
  },
  {
    title: '渠道费(固定值)',
    dataIndex: 'fixed',
    search: false,
  },
  {
    title: '渠道费(最小值)',
    dataIndex: 'min',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    search: false,
    render: (text, record, _, action) => {
      return <Switch></Switch>
    }
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    search: false,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑{record.id}
      </a>,
      // <a href={record.id} target="_blank" rel="noopener noreferrer" key="view">
      //   查看
      // </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={async () => await action?.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //   ]}
      // />,
    ],
  },
]

const postData = (data) => {
  const result = data.map((item, index) => {
    if (index % 4 === 0) {
      item.rowSpan = 4
    } else {
      item.rowSpan = 0
    }
    if (index % 2 === 0) {
      item.countryRowSpan = 2
    } else {
      item.countryRowSpan = 0
    }
    return item
  })
  return result
}

export default () => {
  const actionRef = useRef<ActionType>()
  return (
    <div>
      <PageHeader className={'bg-white'} title={'成本管理'} subTitle={'管理所有支付厂商的成本。'}/>
      <ProTable<CostItem>
        className={'m-5 overflow-hidden'}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        postData={postData}
        bordered={true}
        request={async (params, sort, filter) => {
          // eslint-disable-next-line @typescript-eslint/default-param-last
          return await request('/api/cost/list', {
            params,
          })
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'cost-table-list',
          persistenceType: 'localStorage',
          onChange (value) {
            console.log('value: ', value)
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          span: 6
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        //   syncToUrl: (values, type) => {
        //     if (type === 'get') {
        //       return {
        //         ...values,
        //         created_at: [values.startTime, values.endTime],
        //       }
        //     }
        //     return values
        //   },
        }}
        pagination={{
          pageSize: 50,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="成本管理"
        toolBarRender={() => [
          <Button key="button" type="primary">
              导出
          </Button>,
        ]}
      />
    </div>

  )
}
