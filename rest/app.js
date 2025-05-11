require('dotenv').config()
const express = require('express')
const { logger_info, logger_error } = require('./api/logger')
const auth = require('./controllers/auth')
const isProduction = process.env.NODE_ENV === 'production'
/** * for encryption */
const diffie = require('./api/diffie')
const whiteListPathEncrypt = ['000001000', 'favicon.ico', 'api-docs']
/** *************** */

// const path = require('path')
const app = express()
//process.setMaxListeners(0)
require('events').EventEmitter.defaultMaxListeners = 100
global.appRoot = __dirname

// APP
const helmet = require('helmet')
const cors = require('cors')

app.disable('x-powered-by')
app.use(express.json({ limit: '10MB' }))
app.use(express.urlencoded({ extended: true }))
// var bodyParser = require('body-parser')
// app.use(bodyParser.json({ limit: '10MB' })) // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN),
    methods: process.env.CORS_METHODS,
    preflightContinue: false
  })
)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  next()
})
app.options('*', cors())
app.use(helmet.noSniff())
app.use(helmet.frameguard())
app.use(helmet.xssFilter())
app.use(helmet.hsts())
// app.use(express.bodyParser({limit: '10mb'}))
// app.use(bodyParser.urlencoded({
//   limit: "50mb",
//   extended: false
// }));
// app.use(express.json({ limit: '10MB' }))

const noCache = require('nocache')
app.use(noCache())
// Request Transformer && Response Transformer

const whiteListPath = [
  '000000001', // auth/login
  '000001000', // auth/exchange
  '000002000', // auth/generate-captcha
  '000000004', // 'auth/change-pass',
  'favicon.ico',
  'api-docs'
]

const mung = require('express-mung')
app.use(
  mung.jsonAsync(async (body, req, res) => {
    let request = {}
    if (Object.keys(req.body).length > 0 && req.body.constructor === Object) {
      request = { ...req.body }
    } else if (
      Object.keys(req.query).length > 0 &&
      req.query.constructor === Object
    ) {
      request = { ...req.query }
    }
    if (req.path === '/000000001' && request.p_pass) {
      delete request.p_pass
    }
    // if (req.path === '/auth/login' && request.p_pass) {
    //   delete request.p_pass
    // }
    logger_info(
      req.method +
        ' ' +
        req.url +
        ' - req = ' +
        JSON.stringify(request) +
        ', res = ' +
        JSON.stringify(body)
    )
    /* for encryption */
    const pathArr = req.path.split('/')
    const path =
      pathArr.length > 1
        ? pathArr[1] === 'api-docs'
          ? 'api-docs'
          : pathArr.slice(1).join('/')
        : ''
    if (!whiteListPathEncrypt.includes(path) && isProduction) {
      if (body) {
        if (req.headers['x-pub']) {
          let rsltNew
          if (request.newDiffiePub) {
            rsltNew = await diffie.newKey(request.newDiffiePub)
            if (rsltNew.ret === 0) {
              body = { ...body, newDiffiePub: rsltNew.pub }
            }
          }
          const rslt = await diffie.encodeData(req.headers['x-pub'], body)
          if (request.newDiffiePub) {
            if (rsltNew.ret === 0) {
              diffie.renewKey(
                rsltNew.pub,
                rsltNew.prv,
                request.newDiffiePub,
                req.headers['x-pub']
              )
            }
          }
          return { ...rslt }
        } else {
          return {}
        }
      }
    }
    // console.log(path, body)
    // /** ********** */
    // console.log('body1', body)
    return body
  })
)

// for check roles
// const {checkRoles} = require('./controllers/index-roles')

app.use(async function (req, res, next) {
  let request = {}
  if (Object.keys(req.body).length > 0 && req.body.constructor === Object) {
    request = { ...req.body }
  } else if (
    Object.keys(req.query).length > 0 &&
    req.query.constructor === Object
  ) {
    request = { ...req.query }
  }
  // if (req.path === '/auth/login' && request.p_pass) {
  //   delete request.p_pass
  // }
  if (req.path === '/000000001' && request.p_pass) {
    delete request.p_pass
  }
  const pathArr = req.path.split('/')
  const path =
    pathArr.length > 1
      ? pathArr[1] === 'api-docs'
        ? 'api-docs'
        : pathArr.slice(1).join('/')
      : ''

  // console.log('eee', path, res.body)
  /* for encryption */
  if (!whiteListPathEncrypt.includes(path) && isProduction) {
    if (req.headers['x-pub']) {
      if (
        req.body &&
        Object.keys(req.body).length !== 0 &&
        req.body.constructor === Object
      ) {
        const rslt = await diffie.decodeData(req.headers['x-pub'], req.body)
        if (rslt.ret === 0) req.body = { ...rslt.data }
      } else if (
        req.query &&
        Object.keys(req.query).length !== 0 &&
        req.query.constructor === Object
      ) {
        const rslt = await diffie.decodeData(req.headers['x-pub'], req.query)
        if (rslt.ret === 0) req.query = { ...rslt.data }
      }
    } else {
      logger_error(
        `Cannot ${req.method} ${req.url} (No encryption key provided) - req=` +
          JSON.stringify(request)
      )
      res.status(401).send({ ret: -1, msg: 'No encryption key provided' })
      return
    }
  }
  // console.log('eee', path, req.body)
  /** ****** */
  if (!whiteListPath.includes(path)) {
    try {
      const rslt = await auth.verifyToken(req)
      // if (path === 'auth/Logout') {
      if (path === '000000002') {
        next()
        return
      } else if (rslt.auth) {
        req.jid = rslt.userId
        // const accessible = checkRoles(req.path, rslt.userRoles)
        // if (!accessible) {
        //   logger_error(`Cannot ${req.method} ${req.url} (you don not have access) - req=` + JSON.stringify(request))
        //   res.status(401).send({ret: -106, msg: 'Ops..you don\'t have access'})
        //   return
        // }
        next()
        return
      } else {
        logger_error(
          `Cannot ${req.method} ${req.url} (${rslt.message}) - req=` +
            JSON.stringify(request)
        )
        res.status(200).send({ ret: -104, msg: rslt.message })
        return
      }
    } catch (e) {
      logger_error(
        `Cannot ${req.method} ${req.url} (error validating key) - req=` +
          JSON.stringify(request)
      )
      res.status(200).send({ ret: -105, msg: 'Ops.. error validating key' })
      return
    }
  }
  next()
})

// SwaggerUI
if (!isProduction) {
  const swaggerUi = require('swagger-ui-express')
  const yaml = require('js-yaml')
  const fs = require('fs')
  const path = require('path')
  const swaggerDocument = yaml.safeLoad(
    fs.readFileSync(
      path.join(__dirname, '/swagger-defs/swagger-local.inc.yaml')
    )
  )
  const options = {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1
  }
  const customCss =
    '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 20px 0; }'
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, true, options, customCss)
  )
}

const indexRouter = require('./routes/index')
app.use('/', indexRouter)
module.exports = app
