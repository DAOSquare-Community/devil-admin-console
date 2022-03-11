/**
 * the message code
 */
export const enum ChainEnum {
  Mainnet = 'mainnet',
  Kovan = 'kovan',
  Rinkeby = 'rinkeby',
  xDai = 'xdai',
  Matic = 'matic',
}

/**
 * the chain id
 * @link https://chainlist.org/
 */
export const enum ChainIdEnum {
  ETH = 1,
  RINKEBY = 4,
  BSC = 56,
  BSC_TESTNET = 97,
  xDai = 100, //
  POLYGON = 137,
}

/**
 * the wallet
 */
export const enum WalletEnum {
  METAMASK = 'METAMASK',
  TRUSTWALLET = 'TRUSTWALLET',
  WALLETCONNECT = 'WALLETCONNET',
}

/**
 * the message code
 */
export const enum MsgCode {
  SUCCESS = 'successful',
  SESSION_EXPIRE = 'session expired',
  NOPERMISSION = 'no permission',
  DUPLICATE_KEY = 'duplicate key',
  FAILURE = 'unkown error,please contact the administrator',
  CLASS_INIT_ERROR = 'class init error',
}

/**
 * the http method enum
 */
export const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
