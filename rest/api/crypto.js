const crypto = require('crypto')

const config = { // for diffie helman encryption
  prime: process.env.DH_PRIME,
  generator: process.env.DH_GEN
}

const ENCRYPTION_KEY = process.env.WS_SEC // Must be 256 bits (32 characters)
const IV_LENGTH = 16 // For AES, this is always 16

const fromHexString = function(hexString) {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
}

const createIV = function() {
  const iv = crypto.randomBytes(16)
  return iv.toString('hex')
}

const dhCreateKey = function() {
  const server = crypto.createDiffieHellman(config.prime, config.generator)
  server.generateKeys('base64')
  const iv = crypto.randomBytes(16)
  return { publicKey: server.getPublicKey('hex'), privateKey: server.getPrivateKey('hex'), iv: iv.toString('hex') }
}

const dhCreateSharedKey = function(guestPublicKey, privateKey) {
  const server = crypto.createDiffieHellman(config.prime, config.generator)
  server.setPrivateKey(privateKey, 'hex')
  const sharedKey = server.computeSecret(fromHexString(guestPublicKey))
  return sharedKey.toString('hex')
}
const dhEncodeData = function(data, guestPublicKey, privateKey, iv) {
  const sharedKey = dhCreateSharedKey(guestPublicKey, privateKey)
  var responseCipher = crypto.createCipheriv('aes-256-cbc', sharedKey.substr(0, 32), fromHexString(iv))
  const dataRaw = typeof (data) === 'string' ? data : JSON.stringify(data,
    function(key, value) { return (value == null) ? '' : value }
  )
  var message = responseCipher.update(dataRaw, 'utf8', 'hex')
  message += responseCipher.final('hex')
  return message
}

const dhDecodeData = function(encodedData, guestPublicKey, privateKey, iv) {
  const sharedKey = dhCreateSharedKey(guestPublicKey, privateKey)
  var decipher = crypto.createDecipheriv('aes-256-cbc', sharedKey.substr(0, 32), fromHexString(iv))
  var decoded = decipher.update(encodedData, 'hex', 'utf8')
  decoded += decipher.final('utf8')
  if (/^[\],:{}\s]*$/.test(decoded.replace(/\\["\\\/bfnrtu]/g, '@')
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    return JSON.parse(decoded,
      function(key, value) { return (value == null) ? '' : value }
    )
  } else {
    return decoded
  }
}

const generateToken = function() {
  return crypto.randomBytes(32).toString('hex')
}

const aesEncrypt = function(data) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = cipher.update(JSON.stringify(data))

    encrypted = Buffer.concat([encrypted, cipher.final()])

    return iv.toString('hex') + ':' + encrypted.toString('hex')
  } catch (e) {
    return ''
  }
}

const aesDecrypt = function(text) {
  try {
    const textParts = text.split(':')
    const iv = Buffer.from(textParts.shift(), 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return JSON.parse(decrypted.toString())
  } catch (e) {
    return {}
  }
}

const hashText = function(txt) {
  const salt = crypto.randomBytes(16).toString('hex')
  // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  const hash = crypto.pbkdf2Sync(txt, salt, 1000, 64, `sha512`).toString(`hex`)
  return hash
}

const compareHashText = function(txt1, txt2) {
  // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  const hash = crypto.pbkdf2Sync(txt1, this.salt, 1000, 64, `sha512`).toString(`hex`)
  return hash === txt2
}

exports.dhCreateKey = dhCreateKey
exports.dhCreateSharedKey = dhCreateSharedKey
exports.dhEncodeData = dhEncodeData
exports.dhDecodeData = dhDecodeData
exports.aesEncrypt = aesEncrypt
exports.aesDecrypt = aesDecrypt
exports.generateToken = generateToken
exports.createIV = createIV

exports.hashText = hashText
exports.compareHashText = compareHashText
