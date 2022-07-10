import { Injectable, HttpException, HttpStatus, } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserPageQueryDto } from './dto/page-user.dto'

import { User } from './user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PageDto } from 'src/common/dtos'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async register (createUserDto: CreateUserDto) {
    const { name } = createUserDto
    const user = await this.findByUsername(name)
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }
    return await this.userRepository.save(createUserDto)
  }

  async findAll () {
    return await this.userRepository.find()
  }

  async findOne (id: number) {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    if (user) {
      return new User(user)
    } else { throw new HttpException('用户不存在', HttpStatus.OK) }
  }

  async findByUsername (name: string) {
    return await this.userRepository.findOne({
      where: { name }
    })
  }

  async update (id: number, updateUserDto: UpdateUserDto) {
    const { name, password, email } = updateUserDto
    return await this.userRepository.update({ id }, { name, password, email })
  }

  async remove (id: number) {
    return await this.userRepository.delete({
      id
    })
  }

  async paginate (query: UserPageQueryDto): Promise<PageDto<User>> {
    const name: string = query.name || ''
    console.log(query.name)
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    if (name) {
      queryBuilder
        .where('user.email LIKE :param or user.name LIKE :param', {
          param: '%' + name + '%'
        })
    }

    queryBuilder.orderBy('user.id', query.order) // Or whatever you need to do
      .skip(query.skip)
      .take(query.pageSize)
    const { entities } = await queryBuilder.getRawAndEntities()
    const itemCount = await queryBuilder.getCount()
    return new PageDto(entities, itemCount)
  }

  async checkAdmin (id: number) {
    return await this.userRepository.findOne({
      where: { id }
    })
  }
}
