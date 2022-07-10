import { Injectable, HttpException, HttpStatus, } from '@nestjs/common'
// import { MerchantInfoDto } from './dto/merchant-info.dto'
import { MerchantPageQueryDto } from './dto/page-merchant.dto'
import { Merchant } from './merchant.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PageDto } from 'src/common/dtos'
import { User } from '../user/user.entity'

@Injectable()
export class MerchantService {
  constructor (
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>
  ) {}

  async findAll () {
    return await this.merchantRepository.find()
  }

  async findOne (id: number) {
    const m = await this.merchantRepository.findOne({
      where: { id }
    })
    if (m) {
      return new Merchant(m)
    } else { throw new HttpException('商户不存在', HttpStatus.OK) }
  }

  async paginate (query: MerchantPageQueryDto): Promise<PageDto<Merchant>> {
    const name: string = query.name || ''
    const queryBuilder = this.merchantRepository.createQueryBuilder('m')
    if (name) {
      queryBuilder
        .where('m.name LIKE :param or m.id LIKE :param', {
          param: '%' + name + '%'
        })
    }
    queryBuilder.leftJoinAndMapOne('m.user', User, 'user', 'm.id = user.merchant_id')// queryBuilder.orderBy('id', query.order) // Or whatever you need to do
      .skip(query.skip)
      .take(query.pageSize)
    const { entities } = await queryBuilder.getRawAndEntities()
    const result: Merchant[] = entities.map(item => new Merchant(item))
    const itemCount = await queryBuilder.getCount()
    return new PageDto(result, itemCount)
  }

}
