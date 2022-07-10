import type { ErrorMessageMode } from '~/typings/common/axios'
import { useMessage } from '~/web/hooks/useMessage'
import { useI18n } from '~/web/hooks/useI18n'
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';
// import { useUserStoreWithOut } from '/@/store/modules/user';
// import projectSetting from '/@/settings/projectSetting';
// import { SessionTimeoutProcessingEnum } from '~/typings/common/appEnum';
// eslint-disable-next-line
const { createMessage, createErrorModal } = useMessage()
const error = createMessage.error!
// const stp = projectSetting.sessionTimeoutProcessing;

export const isErrorStatus = (code: number | undefined) => {
  let result = false
  if (code === -1) {
    result = true
  }
  return result
}

export function checkStatus (
  code: number,
  message: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  // eslint-disable-next-line
  const { t } = useI18n()
  // const userStore = useUserStoreWithOut();
  let errMessage = ''
  const msg = message
  const status = code
  switch (code) {
    case 400:
      errMessage = `${msg}`
      break
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined);
      errMessage = msg || '无访问权限或者用户密码错误（401）'
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   // userStore.setSessionTimeout(true);
      // } else {
      //   // userStore.logout(true);
      // }
      break
    case 403:
      errMessage = t('403， The user is authorized, but access is forbidden!')
      break
    // 404请求不存在
    case 404:
      errMessage = t('404，Network request error, the resource was not found!')
      break
    case 405:
      errMessage = t('405，Network request error, request method not allowed!')
      break
    case 408:
      errMessage = t('408，Network request timed out!')
      break
    case 500:
      errMessage = '服务器错误（500）'
      break
    case 501:
      errMessage = t('401，The network is not implemented!')
      break
    case 502:
      errMessage = t('502，Network Error!')
      break
    case 503:
      errMessage = t('503，The service is unavailable, the server is temporarily overloaded or maintained!')
      break
    case 504:
      errMessage = t('504，Network timeout!')
      break
    case 505:
      errMessage = t('405，The http version does not support the request!')
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
    } else {
      error({ content: errMessage, key: `global_error_message_status_${status}` })
    }
  }
}
