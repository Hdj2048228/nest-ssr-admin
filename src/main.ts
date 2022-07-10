import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { initialSSRDevProxy, loadConfig, getCwd } from 'ssr-server-utils'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ReportLogger } from './log/ReportLogger'
import { LogInterceptor } from './log/log.interceptor'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './error/http-exception.filter'
// import { AllExceptionFilter } from './error/all-exception.filter'

import { TransformInterceptor } from './transform/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
async function bootstrap (): Promise<void> {
  const reportLogger = new ReportLogger()
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true
    },
    bufferLogs: true,
    logger: reportLogger
  })
  app.use(cookieParser())
  // 全局错误过滤
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
  }))
  // 日志
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor()
  )
  // swaggerModule
  const options = new DocumentBuilder()
    .setTitle('koppay apis')
    .setDescription('The Admin API description')
    .setVersion('1.0')
    .addTag('admin')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('swagger', app, document)

  await initialSSRDevProxy(app, {
    express: true
  })
  app.useStaticAssets(join(getCwd(), './build'))
  app.useStaticAssets(join(getCwd(), './public'))
  app.useStaticAssets(join(getCwd(), './build/client'))
  app.useStaticAssets(join(getCwd(), './public'))
  const { serverPort } = loadConfig()
  await app.listen(serverPort)
}

bootstrap().catch(err => {
  console.log(err)
  process.exit(1)
})
