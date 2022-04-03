import crypto from 'crypto'
import { bufferToHex } from 'ethereumjs-util'
import { recoverPersonalSignature } from 'eth-sig-util'

export default class Web3Auth {
  /**
   * get the nonce
   * @returns
   */
  public static getNonce = (): string => {
    return crypto.randomBytes(16).toString('base64')
  }

  /**
   * verify signature
   * @param address
   * @param nonce
   * @param signature
   * @returns
   */
  public static verifySignature = (
    address: string,
    nonce: string,
    signature: string
  ): boolean => {
    let blnVerified = false
    const msg = `${process.env.REACT_APP_AUTH_TEXT}${nonce.trim()}`

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'))
    const addr = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature.trim(),
    })

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() === addr.toLowerCase()) {
      blnVerified = true
    }

    return blnVerified
  }
}
