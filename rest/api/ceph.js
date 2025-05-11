const mime = require('mime/lite')
const rp = require('request-promise')
const axios = require('axios')
// const { compareSync } = require('bcryptjs')
const moment = require('moment')

const filterUpload = {
  fileType: null,
  maxMb: process.env.CEPH_MAXMB
}

exports.cephMiddlewareBin = async (req, res, next) => {
  try {
    const { buffer, originalname, mimetype, size } = req.file
    if (size / 1000000 > filterUpload.maxMb) {
      res.status(200).json({ ret: -101, msg: 'Gagal upload file' })
    }
    var options = {
      method: 'POST',
      url: process.env.CEPH_URL + '/' + process.env.CEPH_POST,
      formData: {
        file: {
          value: buffer,
          options: {
            filename: originalname,
            contentType: mimetype
          }
        },
        namaBucket: 'rusunawa',
        namaFolder: 'tes'
      }
    }
    const resultRp = await rp(options)
    const response = JSON.parse(resultRp)
    if (response.ret === '0') {
      req.body.cephData = {
        originalname: originalname,
        mimetype: mimetype,
        size,
        path: response.path
      }
    }
    if (response.ret === '0') {
      next()
    } else {
      res.status(200).json({ ret: -1, msg: 'Gagal upload file' })
    }
  } catch (err) {
    res.status(200).json({ ret: -199, msg: 'Gagal upload file' })
  }
}

exports.cephMiddlewareBase64 = async (req, res, next) => {
  try {
    let fileOption = {}
    let resultRp
    let response = {}
    if (!req.body.file) {
      res.status(200).json({ ret: -102, msg: 'Data file tidak ditemukan' })
    } else {
      if (req.body.files) {
        let cephData = []
        for (let i = 0; i < req.body.files.length; i++) {
          fileOption = getDetailFileBase64(req.body.files[i])
          if (fileOption.ret === -1) {
            res.status(200).json({
              ret: -99,
              msg: 'File Corupt atau tipe file tidak diperbolehkan'
            })
          } else if (fileOption.ret === -2) {
            res.status(200).json({
              ret: -99,
              msg: 'Max size ' + process.env.CEPH_MAXMB + 'MB'
            })
          } else if (fileOption.ret === -99) {
            res.status(200).json({ ret: -99, msg: 'Eror decoding file' })
          } else {
            resultRp = await rp(fileOption.options)
            response = JSON.parse(resultRp)
            if (response.ret === '0') {
              cephData = [
                ...cephData,
                {
                  fileName: fileOption.options.formData.file.options.fileName,
                  contentType:
                    fileOption.options.formData.file.options.contentType,
                  path: response.path
                }
              ]
            }
          }
          if (cephData.length > 0) {
            req.body.cephData = [...cephData]
            next()
          } else {
            res.status(200).json({ ret: -101, msg: 'Gagal upload file' })
          }
        }
      } else {
        fileOption = getDetailFileBase64(req.body.file)
        if (fileOption.ret === -1) {
          res.status(200).json({
            ret: -99,
            msg: 'File Corupt atau tipe file tidak diperbolehkan'
          })
        } else if (fileOption.ret === -2) {
          res.status(200).json({
            ret: -99,
            msg: 'Max size ' + process.env.CEPH_MAXMB + 'MB'
          })
        } else if (fileOption.ret === -99) {
          res.status(200).json({ ret: -99, msg: 'Eror decoding file' })
        } else {
          resultRp = await rp(fileOption.options)
          console.log(resultRp)
          response = JSON.parse(resultRp)
          if (response.ret === '0') {
            delete req.body.file
            req.body.p_path = response.path
            req.body.cephData = {
              fileName: fileOption.options.formData.file.options.filename,
              contentType: fileOption.options.formData.file.options.contentType,
              path: response.path
            }
          }
          if (response.ret === '0') {
            next()
          } else {
            res.status(200).json({ ret: -101, msg: 'Gagal upload file' })
          }
        }
      }
    }
  } catch (err) {
    res.status(200).json({ ret: -199, msg: 'Gagal upload file' })
  }
}

function getDetailFileBase64(fileData, folder = '') {
  try {
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (matches.length !== 3) {
      return { ret: -1 }
    }
    const fType = matches[1]
    const fTipe = fType.split('/')
    if (fTipe.length === 2) {
      if (
        !(
          fTipe[0].toLowerCase() === 'image' || fTipe[1].toLowerCase() === 'pdf'
        )
      ) {
        return { ret: -1 }
      }
    } else {
      return { ret: -1 }
    }
    const extension = mime.getExtension(fType)
    const fileName = 'anythings.' + extension
    const folderDefault = moment().format('YYYYMM')
    const buffer = Buffer.from(matches[2], 'base64')
    if (buffer.length / 1e6 > Number(process.env.CEPH_MAXMB)) {
      return { ret: -2 }
    }
    const options = {
      method: 'POST',
      url: process.env.CEPH_URL + '/' + process.env.CEPH_POST,
      formData: {
        file: {
          value: buffer,
          options: {
            filename: fileName,
            contentType: fType
          }
        },
        namaBucket: process.env.CEPH_BUCKET,
        namaFolder: `${process.env.CEPH_KANTOR}/${folderDefault}`
        // namaFolder: `41A/${folderDefault}/${extension}`
      }
    }
    return { ret: 0, options: options }
  } catch (e) {
    return { ret: -99 }
  }
}

exports.getCephFileAsBase64 = (path) => {
  if (path === null || path.trim() === '') {
    return ''
  } else {
    return axios
      .get(process.env.CEPH_URL + process.env.CEPH_GET + path, {
        responseType: 'arraybuffer'
      })
      .then(
        (response) =>
          `data:${response.headers['content-type']};base64,${Buffer.from(
            response.data,
            'binary'
          ).toString('base64')}`
      )
      .catch(() => '')
  }
}
