export const TableList: any = [
  {
    tableKey: '报价管理列表',
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
  },
  {
    tableKey: '交易列表',
    setting: {
      rowKey: 'id',
      bordered: true,
      columns: [
        {
          title: '交易ID',
          dataIndex: 'id'
        },
        {
          title: '订单编号',
          dataIndex: 'code'
        },
        {
          title: '交易时间',
          dataIndex: 'payTime'
        },
        {
          title: '商户',
          dataIndex: 'merchant'
        },
        {
          title: '支付商',
          dataIndex: 'payStore'
        },
        {
          title: '应用',
          dataIndex: 'app'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '购买商品价格',
          dataIndex: 'payGoodPrice'
        },
        {
          title: '支付金额',
          dataIndex: 'payPrice'
        },
        {
          title: '渠道成本',
          dataIndex: 'channel'
        },
        {
          title: '税成本',
          dataIndex: 'taxCost'
        },
        {
          title: '渠道费',
          dataIndex: 'channelFee'
        },
        {
          title: '税费',
          dataIndex: 'taxFee'
        },
        {
          title: '出款金额',
          dataIndex: 'outFee'
        }
      ]
    }
  },
  {
    tableKey: '用户管理列表',
    setting: {
      bordered: true,
      rowKey: 'id',
      api: {
        url: '/api/user/list',
        params: {}
      },
      exporter: {
        enable: true
      },
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '账号名称',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '账号状态',
          dataIndex: 'finish_init'
        },
        {
          title: '操作',
          dataIndex: 'action'
        }
      ]
    }
  },
  {
    tableKey: '成本管理',
    setting: {
      bordered: true,
      rowKey: 'id',
      api: {
        url: '/api/cost/list',
        params: {}
      },
      columns: [
        {
          title: '区域',
          dataIndex: 'zone',
          colSpan: 1,
          onCell: (_, index) => {
            console.error(_, index)
            if (index === 0) {
              return { rowSpan: 2, colSpan: 2 }
            }
            // These two are merged into above cell
            if (index === 2) {
              return { rowSpan: 4 }
            }
            if (index === 2) {
              return { rowSpan: 2 }
            }
            if (index === 2) {
              return { rowSpan: 2 }
            }
            return {}
          },
        },
        {
          title: '国家/地区',
          dataIndex: 'country'
        },
        {
          title: '税',
          dataIndex: 'tax'
        },
        {
          title: '支付类型',
          dataIndex: 'payType'
        },
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '名称',
          dataIndex: 'payName'
        },
        {
          title: '渠道费(百分比)',
          dataIndex: 'dao'
        },
        {
          title: '渠道费(固定值)',
          dataIndex: 'fixed'
        },
        {
          title: '渠道费(最小值)',
          dataIndex: 'min'
        },
        {
          title: '状态',
          dataIndex: 'action'
        }
      ]
    }
  },
]
