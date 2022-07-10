import { Injectable } from '@nestjs/common' // , HttpException, HttpStatus,
import { CostPageQueryDto } from './dto/page-cost.dto'
import { CostEntity } from './cost.entity'
// import { Repository } from 'typeorm'
// import { InjectRepository } from '@nestjs/typeorm'
import { PageDto } from 'src/common/dtos'

@Injectable()
export class CostService {
  // constructor(
  //     @InjectRepository(CostEntity)
  //     private readonly userRepository: Repository<CostEntity>) {
  // }

  async paginate (query: CostPageQueryDto): Promise<PageDto<CostEntity>> {
    const name: string = query.name || ''
    console.log(query.name)
    // const queryBuilder = this.userRepository.createQueryBuilder('user')
    // if (name) {
    //   queryBuilder
    //     .where('user.email LIKE :param or user.name LIKE :param', {
    //       param: '%' + name + '%'
    //     })
    // }
    //
    // queryBuilder.orderBy('user.id', query.order) // Or whatever you need to do
    //   .skip(query.skip)
    //   .take(query.pageSize)
    // const { entities } = await queryBuilder.getRawAndEntities()
    // const itemCount = await queryBuilder.getCount()
    const arr = new Array(100).fill('').map((item, index) => {
      return { id: Number(index), name, createTime: Date.now().toString(), create_time: '' }
    })
    return new PageDto(arr, 100)
  }
}
