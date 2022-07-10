import React, { useRef } from 'react'
import { PageHeader, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { ProTable } from '@ant-design/pro-components'
import { getTableListApi } from '~/web/api/common'
import type { ActionType, ProColumns } from '@ant-design/pro-components'

const request = getTableListApi
interface UserItem {
  id: number
}
export default () => {
  const history = useHistory()
  const columns: Array<ProColumns<UserItem>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false
    },
    {
      title: '商户ID',
      dataIndex: 'merchant_name',
      hideInTable: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false
    },
    {
      title: '账号名称',
      dataIndex: 'name',
      search: false

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false
    },
    {
      title: '账号状态',
      dataIndex: 'formal',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'action',
      search: false,
      render: (text, record, _, action) => {
        const handleGoDetail = () => {
          history.push({ pathname: `/user/detail/${record.id}` })
        }
        return (
          <div>
            <Button size={'small'} type={'primary'} onClick={handleGoDetail}>查看</Button>
          </div>
        )
      }
    }
  ]
  const actionRef = useRef<ActionType>()

  return (
    <div>
      <PageHeader className={'bg-white'} title={'用户管理'} subTitle={'用于操作管理商户的功能'} />
      <div className={'m-5 overflow-hidden'}>
        <ProTable<UserItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          tableClassName={' pt-5 '}
          bordered={true}
          request={async (params, sort, filter) => {
            params.name = params.merchant_name
            delete params.merchant_name
            // eslint-disable-next-line @typescript-eslint/default-param-last
            return await request('/api/merchant/list', {
              params,
            })
          }}
          columnsState={{
            persistenceKey: 'merchant-user-table-list',
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
            pageSize: 10,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          options={false}
          headerTitle=""
        />
      </div>

    </div>
  )
}
