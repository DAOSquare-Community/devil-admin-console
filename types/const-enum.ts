/**
 * the message code
 */
export enum ChainEnum {
  Mainnet = 'mainnet',
  Kovan = 'kovan',
  Rinkeby = 'rinkeby',
  xDai = 'xdai',
  Matic = 'matic',
  Optimism = 'optimism',
  Celo = 'celo',
  Arbitrum = 'arbitrum',
}

/**
 * the chain id
 * @link https://chainlist.org/
 */
export enum ChainIdEnum {
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
export enum WalletEnum {
  METAMASK = 'METAMASK',
  TRUSTWALLET = 'TRUSTWALLET',
  WALLETCONNECT = 'WALLETCONNET',
}

/**
 * the message code
 */
export enum MsgCode {
  SUCCESS = 'successful',
  SESSION_EXPIRE = 'session expired',
  NOPERMISSION = 'no permission',
  DUPLICATE_KEY = 'duplicate key',
  FAILURE = 'unkown error,please contact the administrator',
  CLASS_INIT_ERROR = 'class init error',
  AUTH_FAILED = 'auth failed',
}

/**
 * the http method enum
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * the Offical or Social links
 */
export enum LinksEnum {
  Twitter = 'twitter',
  WebSite = 'website',
  Discord = 'discord',
  Telegram = 'telegram',
  Medium = 'medium',
}

/**
 * the Offical or Social links
 */
export enum DaoPurpose {
  // Grants(Accelerators)
  Grants = 'Grants',
  // Ventures(Investments)
  Ventures = 'Ventures',
  // Guilds(Services)
  Guilds = 'Guilds',
  // Clubs(Social)
  Clubs = 'Clubs',
  // Non-profit(Impact)
  Non_profit = 'Non-profit',
  // Product(Project)
  Product = 'Product',
}
