import 'reflect-metadata'
import { createConnection, Repository } from 'typeorm'
import * as lodash from 'lodash'
import { getInitUsers, getRandomUser } from './init'
import { User } from '../modules/user/user.entity'
import ormConfig from './config'

const checkExist = async (userRepository: Repository<User>) => {
  console.log('检查是否已初始化...')

  const userNum = await userRepository.count()
  const exist = userNum > 0

  if (exist) {
    console.log(`已存在 ${userNum} 条用户数据，不再初始化。`)
    return true
  }

  return false
}

const seed = async () => {
  console.log('开始插入数据...')
  const connection = await createConnection(ormConfig)

  const userRepository = connection.getRepository<User>(User)

  const dataExist = await checkExist(userRepository)

  if (dataExist) {
    return
  }

  const initUsers = getInitUsers()

  console.log('生成初始化数据...')

  const users = lodash.range(10).map(() => {
    return getRandomUser()
  })

  const allUsers = [...initUsers, ...users]

  console.log('插入初始化数据...')
  await userRepository.save(allUsers)

  console.log('数据初始化成功！')
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
