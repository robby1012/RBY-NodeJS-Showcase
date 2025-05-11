const { isValidParams } = require('../api/validator')
const request = require('../api/requests')
// const jwt = require('jsonwebtoken')
var redis = require('redis')
const { promisify } = require('util')
// const client = redis.createClient()
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})
const getRedis = promisify(client.get).bind(client)
const ttlRedis = promisify(client.ttl).bind(client)
const expireRedis = promisify(client.expire).bind(client)
const delKeyRedis = promisify(client.del).bind(client)

var redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})
var JWTR = require('jwt-redis').default
const jwt_jti = 'rusun_jti_'
const jwt_user = 'rusun_user_'
var jwt = new JWTR(redisClient, { prefix: jwt_jti })
const { setKey } = require('../api/diffie')
const { randomBytes } = require('crypto')

const bcrypt = require('bcryptjs')

const auditTrails = {
  req: (data) => {
    return {
      reqId: data.reqId ? data.reqId.trim() : '',
      chId: data.chId ? data.chId.trim() : ''
    }
  },
  roles: {
    reqId: { required: true }, // request ID contoh DSH-SMILE
    chId: { required: true } // channel ID jsiv8203
  }
}

exports.verifyToken = async (req) => {
  try {
    // check header or url parameters or post parameters for token
    const token = req.headers['x-access-token']
    if (!token) {
      return { auth: false, message: 'No token provided.' }
    }

    // verifies secret and checks exp
    const decoded = await jwt.verify(token, process.env.JWTKEY)
    const jwtLabel = await getRedis(jwt_user + decoded.id)
    if (jwtLabel) {
      const jwtKeyTtl = await ttlRedis(jwt_user + decoded.id)
      const jwtKeyTtlMinutes = jwtKeyTtl / 60
      if (jwtKeyTtlMinutes > 0 && jwtKeyTtlMinutes <= 30) {
        await expireRedis(jwt_user + decoded.id, 1800)
        return { auth: true, userId: decoded.id }
      } else {
        await jwt.destroy(decoded.jti)
        return { auth: false, message: 'Session is expired' }
      }
    } else {
      await jwt.destroy(decoded.jti)
      return { auth: false, message: 'Session is expired' }
    }
    // return { auth: true, userId: decoded.id, jti: decoded.jti }
  } catch (e) {
    return { auth: false, message: 'No Valid authenticate token.' }
  }
}

exports.doLoginPengguna = async (req, res) => {
  try {
    // verify owncaptcha
    if (process.env.CAPTCHA === 'Y') {
      if (!req.body.iCaptcha || !req.body.kCaptcha) {
        res.status(200).json({ ret: -1, msg: 'Error validasi captcha1' })
        return
      } else {
        if (!(await cekCaptchaRedis(req.body.iCaptcha, req.body.kCaptcha))) {
          res.status(200).json({ ret: -1, msg: 'Error validasi captcha' })
          return
        }
      }
    }
    // ///////////////////
    const params = {
      p_pengguna: req.body.p_pengguna ? req.body.p_pengguna.trim() : '',
      p_password: req.body.p_password ? req.body.p_password.trim() : ''
    }
    const rules = {
      ...auditTrails.roles,
      p_pengguna: { required: true },
      p_password: { required: true }
    }
    const x = isValidParams({ ...params, ...auditTrails.req(req.body) }, rules)
    if (x.ret === -1) {
      res.status(200).json(x)
      return
    }
    const params_pg = [params.p_pengguna]
    const data = await request.queryFunction('getInfoPengguna', params_pg)
    if (data.ret === 0) {
      if (data.can_login === 0) {
        const passwordIsValid = bcrypt.compareSync(
          params.p_password,
          data.data.password_pengguna
        )
        if (!passwordIsValid) {
          res.status(200).json({
            ret: -10,
            msg: 'Username atau Password salah. Pastikan besar/kecil huruf dan angka benar!',
            token: null
          })
          return
        }
        console.log('anu', data.roles)
        if (data.roles.length === 0) {
          res.status(200).json({
            ret: -1,
            msg: 'User belum memiliki roles, untuk  masuk ke aplikasi',
            token: null
          })
          return
        }
        // tambahan apakah sedang login
        const jwtLabel = await getRedis(jwt_user + params.p_pengguna)
        if (jwtLabel) {
          const jwtKeyTtl = await ttlRedis(jwt_user + params.p_pengguna)
          const jwtKeyTtlMinutes = jwtKeyTtl / 60
          if (jwtKeyTtl > 600) {
            res.status(200).json({
              ret: -999,
              msg: 'User sedang login, coba login 10 menit lagi',
              token: null
            })
            await expireRedis(jwt_user + params.p_pengguna, 600)
            return
          } else if (jwtKeyTtl > 0) {
            res.status(200).json({
              ret: -999,
              msg:
                'User sedang login, coba login sekitar ' +
                Math.floor(jwtKeyTtlMinutes).toString() +
                ' menit lagi',
              token: null
            })
            return
          } else {
            // await delKeyRedis(jwtLabel)
            await delKeyRedis(jwt_user + params.p_pengguna)
          }
        }
        // end tambahan
        const token = await jwt.sign(
          { id: params.p_pengguna },
          process.env.JWTKEY,
          {
            expiresIn: 10080 // expires in 1 week
          }
        )
        const decoded = await jwt.verify(token, process.env.JWTKEY)

        // tambahan apakah sedang login
        redisClient.set(jwt_user + params.p_pengguna, jwt_jti + decoded.jti)
        await expireRedis(jwt_user + params.p_pengguna, 1800)
        // end tambahan
        res.status(200).json({
          ret: data.can_login,
          info: {
            kode: data.data.kode_pengguna,
            nama: data.data.nama_pengguna,
            kode_kantor: data.data.kode_kantor,
            nama_kantor: data.data.nama_kantor,
            departemen: data.data.departemen,
            nama_atasan: data.data.nama_atasan,
            email: data.data.email,
            last_login: data.data.last_login,
            last_change_pass: data.data.last_change_pass,
            aktif: data.data.aktif,
            locked: data.data.locked
          },
          roles: data.roles,
          token: token,
          menu: data.menu,
          fitur: data.fitur
        })
      } else {
        res
          .status(200)
          .json({ ret: data.can_login, msg: data.msg, token: null })
      }
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg, token: null })
    }
  } catch (e) {
    res
      .status(200)
      .json({ ret: -99, msg: 'Error in processing request to db', token: null })
  }
}

exports.getInfoPengguna = async (req, res) => {
  try {
    const params = {}
    const rules = {
      ...auditTrails.roles
    }
    const x = isValidParams({ ...params, ...auditTrails.req(req.query) }, rules)
    if (x.ret === -1) {
      res.status(200).json(x)
      return
    }
    const data = await request.queryFunction('getInfoPengguna', [req.jid])
    if (data.ret === 0) {
      if (data.can_login === 0) {
        res.status(200).json({
          ret: data.can_login,
          info: {
            kode: data.data.kode_pengguna,
            nama: data.data.nama_pengguna,
            kode_kantor: data.data.kode_kantor,
            nama_kantor: data.data.nama_kantor,
            departemen: data.data.departemen,
            nama_atasan: data.data.nama_atasan,
            email: data.data.email,
            last_login: data.data.last_login,
            last_change_pass: data.data.last_change_pass,
            aktif: data.data.aktif,
            locked: data.data.locked
          },
          roles: data.roles,
          menu: data.menu,
          fitur: data.fitur
        })
      } else {
        res.status(200).json({ ret: data.can_login, msg: data.msg })
      }
    } else {
      res.status(200).json({ ret: data.ret, msg: data.msg })
    }
  } catch (e) {
    res
      .status(200)
      .json({ ret: -99, msg: 'Error inverifying token', token: null })
  }
}

exports.doLogout = async (req, res) => {
  try {
    const token = req.headers['x-access-token']
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWTKEY)
      if (decoded.jti) {
        await jwt.destroy(decoded.jti)
        await delKeyRedis(jwt_user + decoded.id)
        res.status(200).json({
          ret: 0,
          msg: 'Logout success with valid authenticate token destroyed'
        })
      } else {
        res.status(200).json({
          ret: 0,
          msg: 'Logout success with No Valid authenticate token'
        })
      }
    } else res.status(200).json({ ret: 0, msg: 'Logout success with No token' })
  } catch (e) {
    res.status(200).json({ ret: 0, msg: 'Logout success with Others error' })
  }
}

exports.exchange = async (req, res) => {
  try {
    console.log('aaaa1', req.body)
    if (!req.headers['x-pub']) {
      res.status(200).json({ ret: -1, msg: 'no pub' })
      return
    }
    const rslt = await setKey(req.headers['x-pub'])
    if (rslt.ret === -1) {
      res.status(200).json({ ret: -1, msg: rslt.msg })
      return
    }
    // if (req.body.oldPub) {
    //   console.log('delete old pub')
    //   await delKeyRedis(req.body.oldPub)
    // }
    res.status(200).json({ ret: 0, pub: rslt.pub })
  } catch (e) {
    res.status(200).json({ ret: -99, msg: 'Error processing exchange' })
  }
}

async function creteRandomKey() {
  try {
    const randValue = parseInt(Math.random() * 9000 + 1000)
    const key = await getRedis(randValue)
    if (key !== null) {
      return await creteRandomKey()
    } else {
      const keyRandom = await setCaptchaRedis(randValue)
      return { r: keyRandom, n: randValue }
    }
  } catch (e) {
    return false
  }
}
const cekCaptchaRedis = async (randomNumber, key) => {
  const keyCaptcha = await getRedis('captcha-' + randomNumber + '-' + key)
  if (keyCaptcha !== null) {
    client.del('captcha-' + randomNumber + '-' + key)
    return true
  } else return false
}
const setCaptchaRedis = async (randomNumber) => {
  try {
    var token = randomBytes(64).toString('hex')
    await client.set('captcha-' + randomNumber + '-' + token, 1, 'EX', 60)
    return token
  } catch (e) {
    return false
  }
}

exports.getCaptcha = async (req, res) => {
  try {
    const Captchapng = require('captchapng')
    const randValue = await creteRandomKey()
    const p = new Captchapng(80, 30, randValue.n) // width,height,numeric captcha
    p.color(46, 102, 167, 50) // First color: background (red, green, blue, alpha)
    p.color(255, 255, 255, 255) // Second color: paint (red, green, blue, alpha)

    const img = p.getBase64()
    res
      .status(200)
      .json({ ret: 0, type: 'image/png', img: img, r: randValue.r })
  } catch (e) {
    res.status(200).json({ ret: -99 })
  }
}

function cekComplexPassword(pass) {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  return pass.match(passw) !== null
}
