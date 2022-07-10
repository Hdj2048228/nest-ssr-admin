import { User } from '../modules/user/user.entity'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'
import { Merchant } from '../modules/merchant/merchant.entity'
import { AdminUser } from '../modules/AdminUser/AdminUser.entity'

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  database: 'payserver',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '12345678',
  entities: [User, Merchant, AdminUser],
}

export default ormConfig
