export const loadConfig = () => {
  const { env } = process
  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      type: env.TYPEORM_CONNECTION
    },
    mongo: {
      uri: env.MONGO_URI,
      host: env.MONGO_HOST,
      port: env.MONGO_PORT,
    },
    redis: {
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT) || 6379
    }
  }
}

export default loadConfig
