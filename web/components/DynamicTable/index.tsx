import React, { useEffect, forwardRef, useState, useImperativeHandle } from 'react'
import { Table, Button } from 'antd'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { TableList } from '@/config/table'
import styles from './index.module.less'
import { defHttp } from '~/web/request'
import { BasicFetchResult } from '~/typings/common'

interface TableProps {
  tableKey: string
  children?: any
  customRenders?: object
  className?: any
  queryParams?: any
}

interface Pagination {
  pageSizeOptions: number[]
  current: number
  pageSize: number
}

const DynamicTable = forwardRef((props: TableProps, ref) => {
  const [options, setOptions] = useState<any>({})
  const [columns, setColumns] = useState<any>([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: props.queryParams?.pageSize || 20,
    pageSizeOptions: [10, 20, 50]
  })

  useImperativeHandle(ref, () => ({
    getData
  }))

  useEffect(() => {
    getTableOptions()
  }, [])

  useEffect(() => {
    getData().then()
  }, [options])

  const formatColumns = (data) => {
    const columnList = JSON.parse(JSON.stringify(data))
    columnList.forEach(item => {
      const render = Reflect.get(props?.customRenders || {}, item.dataIndex)
      if (render) {
        item.render = render
      }
    })
    return columnList
  }

  const getTableOptions = (): object | undefined => {
    const current = TableList.find(item => item.tableKey === props.tableKey)
    if (current) {
      setOptions(current.setting)
      const columnList = formatColumns(current.setting.columns)
      setColumns(columnList)
    }
    return current
  }

  const getData = async (): Promise<void> => {
    if (!Reflect.has(options, 'api')) {
      return
    }
    const { api } = options
    const { current, pageSize } = pagination
    setLoading(true)
    const params = Object.assign({}, props.queryParams)
    params.pageNumber = current
    params.pageSize = pageSize
    const res = await defHttp.get<BasicFetchResult<never>>({ url: api.url, params })
    setLoading(false)
    if (res) {
      setData(res.data)
      setTotal(res.total)
    }
  }

  useEffect(function () {
    getData().then()
  }, [pagination])

  const onChange = async (pagination): Promise<void> => {
    setPagination(pagination)
  }

  return (
    <div className={styles['table-wrap']}>
      <div className={'handle-area flex items-center justify-between mb-4'}>
        <div></div>
        <div className={'right-handle'}>
          { options?.exporter?.enable && <Button className={'flex items-center'} icon={<VerticalAlignBottomOutlined />}>导出</Button> }
        </div>
      </div>
      <Table
        columns={columns}
        bordered={options.bordered}
        dataSource={data}
        rowKey={options.rowKey}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </div>
  )
})

export default DynamicTable
