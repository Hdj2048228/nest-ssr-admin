import { Injectable } from '@nestjs/common'
import { AdminUser } from '@/modules/AdminUser/AdminUser.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '@/modules/auth/constants'
import * as crypto from 'crypto'

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>,
    private readonly jwtService: JwtService
  ) {}

  async findUser (username) {
    return await this.adminUserRepository.findOne({ where: { email: username } })
  }

  async validateUser (username, password) {
    const user = await this.findUser(username)
    const isRight = await this.checkPassword(user?.password, password)
    if (user && isRight) {
      return { ...user }
    }
    return null
  }

  async verifyToken (token) {
    return await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, issuer: jwtConstants.issuer })
  }

  async checkPassword (origin, target) {
    return await new Promise((resolve, reject) => {
      if (!origin) {
        resolve(false)
      } else {
        const start = origin.indexOf('$')
        const end = origin.lastIndexOf('$')
        const salt = origin.slice(Number(start) + 1, end)
        crypto.pbkdf2(target, salt, 150000, 32, 'sha256', (err, text) => {
          if (!err) {
            const result = `pbkdf2:sha256:150000$${salt}$${text.toString('hex')}`
            if (result === origin) {
              resolve(true)
            } else {
              resolve(false)
            }
          } else {
            resolve(false)
          }
        })
      }
    })
  }

  async encryptText (text) {
    return await new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(4).toString('hex')
      crypto.pbkdf2(text, salt, 150000, 32, 'sha256', (err, text) => {
        if (!err) {
          const result = `pbkdf2:sha256:150000$${salt}$${text.toString('hex')}`
          resolve(result)
        } else {
          reject(new Error('文本加密失败'))
        }
      })
    })
  }

  async login (user) {
    const payload = { username: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload, { secret: jwtConstants.secret, issuer: jwtConstants.issuer })
    }
  }
}
