/**
 * the message code
 *
 * @enum {number}
 */
const enum MsgCode {
  SUCCESS = 'successful',
  SESSION_EXPIRE = 'session expired',
  NOPERMISSION = 'no permission',
  DUPLICATE_KEY = 'duplicate key',
  FAILURE = 'unkown error,please contact the administrator',
}

export default MsgCode
