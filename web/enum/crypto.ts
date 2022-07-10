const CryptoJS = require('crypto-js')

export const CryptoEnum = {
  PASSWORD: {
    ITERATIONS: 150000,
    HASHER: CryptoJS.algo.SHA256
  }
}
