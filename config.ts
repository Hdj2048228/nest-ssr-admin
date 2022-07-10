import type { UserConfig } from 'ssr-types-react'
import { ConfigModule } from '@nestjs/config'
const args = require('minimist')(process.argv.slice(2))
const mode = args['mode'] // mode
const envs = ['.env']
ConfigModule.forRoot({
  envFilePath: mode ? [`.env.${mode}`, ...envs] : envs
})
const isAnalyze = args['analyze'] // analyze
const lessRegex = /\.less$/
const userConfig: UserConfig = {
  whiteList: [/\.(css|less|sass|scss)$/, 'react-transition-group'],
  mode: 'csr',
  chainBaseConfig: (chain, isServer) => {
    chain.module.rule('less').test(lessRegex).use('style-resources-loader').loader('style-resources-loader').options({
      patterns: ['./web/styles/theme.less']
    })
  },
  chainClientConfig: chain => {
    // 分析
    chain.when(isAnalyze, (config) => {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugin('BundleAnalyzerPlugin').use(new BundleAnalyzerPlugin())
    })
    // Todo  待优化
    chain.optimization.splitChunks({
      ...chain.optimization.get('splitChunks'),
      cacheGroups: { // 这里开始设置缓存的 chunks\
        ...chain.optimization.get('splitChunks').cacheGroups
      },
    })
  },
  css: () => {
    return {
      loaderOptions: {
        cssOptions: {
        },
        less: {
          lessOptions: {
            modifyVars: {
              'primary-color': 'rgba(90, 71, 238, 1)'
            },
            javascriptEnabled: true
          }
        },
        postcss: {
          options: {},
          plugins: [
            require('postcss-import'),
            require('tailwindcss')
          ]
        }
      }
    }
  },
  serverPort: Number(process.env.KOP_ADMIN_PORT || process.env.SERVER_PORT)
}

export { userConfig }
