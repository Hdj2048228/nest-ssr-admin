const moment = require('moment')
export class BaseEntity {
  getBJTime (time): string {
    return moment(time).utc().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
  }

  constructor (partial: Partial<BaseEntity>) {
    Object.assign(this, partial)
  }
}
