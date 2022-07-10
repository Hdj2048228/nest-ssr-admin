import { User } from '../modules/user/user.entity'
import { Random } from 'mockjs'

export const getInitUsers = () => {
  const admin = new User(
    {
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      phone: '120',
      merchant_id: -1,
      finish_init: -1
    }
  )
  const user = new User(
    {
      email: 'user@admin.com',
      name: 'user',
      password: '123456',
      phone: '110',
      merchant_id: -1,
      finish_init: -1

    })

  return [admin, user]
}

export const getRandomUser = (): User => {
  const user = new User(
    {
      email: Random.email(),
      name: Random.cname(),
      password: '123456',
      phone: '12345678910',
      merchant_id: 0,
      finish_init: -1

    })
  return user
}
