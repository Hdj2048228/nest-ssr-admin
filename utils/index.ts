
import { isObject } from './is'

export const noop = () => {}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer (node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams (baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any> (src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

const cache = []

export function deepClone (source) {
  if (source instanceof Object) {
    const cacheDist = findCache(source)
    if (cacheDist) {
      return cacheDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = []
      } else if (source instanceof Function) {
        dist = function () {
          // @ts-expect-error
          return source.apply(this, arguments)
        }
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else {
        dist = {}
      }
      // 数据源 和 副本 都存入缓存 ，注意一定要 在 dist创建成功之后就把它 存入，防止重复的生成
      // @ts-expect-error
      cache.push([source, dist])
      for (const key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
          dist[key] = deepClone(source[key])
        }
      }
      return dist
    }
  }
  return source
}

function findCache (source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

// 防抖
export const debounce = (method, delay) => {
  let timer = null
  return function () {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // @ts-expect-error
    timer = setTimeout(function () {
      method.apply(context, args)
    }, delay)
  }
}

// 截流
export const throttle = (func, wait) => {
  let lastTime = null
  let timeout
  return function () {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const now = new Date()
    const arg = arguments
    // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
    // @ts-expect-error
    if (now - lastTime - wait > 0) {
      // 如果之前有了定时任务则清除
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, arg)
      // @ts-expect-error
      lastTime = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        // 改变执行上下文环境
        func.apply(context, arg)
      }, wait)
    }
  }
}
