const redis = require('redis')
// const client = redis.createClient()
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})
const { promisify } = require('util')
const getRedis = promisify(client.get).bind(client)
const delKeyRedis = promisify(client.del).bind(client)
const encrypt = require('./crypto')
// const Redis = require('ioredis');
// const { promisify } = require('util');
// const encrypt = require('./crypto');

// const redisHosts = process.env.REDIS_HOST.split(',');
// const redisPorts = process.env.REDIS_PORT.split(',');

// const redisCluster = new Redis.Cluster(
//   redisHosts.map((host, index) => ({ host, port: parseInt(redisPorts[index]) })),
//   {
//     scaleReads: 'all',
//     maxRedirections: 16,
//   }
// );

// const getRedis = promisify(redisCluster.get).bind(redisCluster);
// const delKeyRedis = promisify(redisCluster.del).bind(redisCluster);

const isObject = function (a) {
  return !!a && a.constructor === Object
}

const setKey = async function (pub) {
  try {
    if (pub.trim() === '') {
      return Promise.resolve({ ret: -1, msg: 'no pub key' })
    }
    console.log(11,pub)
    const serverKey = encrypt.dhCreateKey()
    console.log(222,serverKey)
    client.set(
      pub,
      JSON.stringify({
        pub: serverKey.publicKey,
        prv: serverKey.privateKey
      }),
      'EX',
      60 * 60 * 24
    )
    console.log(333,serverKey.publicKey)
    return Promise.resolve({ ret: 0, pub: serverKey.publicKey })
  } catch (e) {
    return Promise.resolve({ ret: -1, msg: 'error create key' })
  }
}

const newKey = async function (pub) {
  try {
    if (pub.trim() === '') {
      return Promise.resolve({ ret: -1, msg: 'no pub key' })
    }
    const serverKey = encrypt.dhCreateKey()
    return Promise.resolve({
      ret: 0,
      pub: serverKey.publicKey,
      prv: serverKey.privateKey
    })
  } catch (e) {
    return Promise.resolve({ ret: -1, msg: 'error create key' })
  }
}

const renewKey = function (pub, prv, newGuest, oldGuest) {
  try {
    client.set(
      newGuest,
      JSON.stringify({
        pub: pub,
        prv: prv
      }),
      'EX',
      60 * 60 * 24
    )
    delKeyRedis(oldGuest)
    return true
  } catch (e) {
    return true
  }
}
const decodeData = async function (pub, data) {
  try {
    if (!isObject(data)) {
      return { ret: 0, data: {} }
    } else {
      const objData = Object.entries(data)
      const iv = objData[0] ? objData[0][0] : ''
      const msg = objData[0] ? objData[0][1] : ''
      if (iv === '') {
        return { ret: 0, data: {} }
      } else {
        const key = await getRedis(pub)
        const keyData = JSON.parse(key)
        const clientData = encrypt.dhDecodeData(msg, pub, keyData.prv, iv)
        return { ret: 0, data: clientData }
      }
    }
  } catch (e) {
    return { ret: -1, msg: 'error create key' }
  }
}

const encodeData = async function (pub, data) {
  try {
    if (!isObject(data)) {
      return { ret: 0, data: '' }
    } else {
      const iv = encrypt.createIV()
      const key = await getRedis(pub)
      const keyData = JSON.parse(key)
      const msg = {}
      const clientData = encrypt.dhEncodeData(data, pub, keyData.prv, iv)
      msg[iv] = clientData
      return { ...msg }
    }
  } catch (e) {
    return {}
  }
}

exports.setKey = setKey
exports.decodeData = decodeData
exports.encodeData = encodeData
exports.newKey = newKey
exports.renewKey = renewKey
