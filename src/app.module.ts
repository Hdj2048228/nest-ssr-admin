import loadConfig from './config/configurations'
import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { QuoteModule } from './modules/quote/quote.module'
import { PagesModule } from './modules/pages/index.module'
import { ProjectModule } from './modules/project/project.module'
import { AdminUserModule } from './modules/AdminUser/AdminUser.module'
import { AuthModule } from './modules/auth/auth.module'
import { CostModule } from './modules/cost/cost.module'
import { MerchantModule } from './modules/merchant/merchant.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { Dbs } from '@/common/enums'

const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig]
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { type, host, port, username, password, database } =
        configService.get('db')
      return {
        type,
        connectorPackage: 'mysql2',
        // .env 获取
        host,
        port,
        username,
        password,
        database,
        synchronize: true, // 强替换
        // entities
        entities: ['dist/**/*.entity{.ts,.js}']
      }
    }
  }),
  // TypeOrmModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: (configService: ConfigService) => {
  //     const { host, port } = configService.get('mongo')
  //     return {
  //       type: 'mongodb',
  //       name: Dbs.MongoLocal,
  //       host: host,
  //       port: port,
  //       synchronize: false,
  //       database: Dbs.MongoLocal
  //     }
  //   }
  // })
]

@Module({
  imports: [
    ...libModules,
    PagesModule, // 页面module
    UserModule,
    ProjectModule,
    QuoteModule,
    AdminUserModule,
    CostModule,
    AuthModule,
    MerchantModule
  ]
})

export class AppModule {}
