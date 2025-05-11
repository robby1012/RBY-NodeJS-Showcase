var fonts = require('./fonts/Roboto')
var PdfPrinter = require('pdfmake/src/printer')
var printer = new PdfPrinter(fonts)

const rpts = {
  ...require('./kontrak'),
  ...require('./aset'),
  ...require('./tes-rpts'),
  ...require('./invoice'),
  ...require('./waiting-list'),
  ...require('./formulir-perusahaan'),

}

module.exports.createPdf = function (kodeReport, data, callback) {
  if (typeof rpts[kodeReport] === 'undefined') {
    // eslint-disable-next-line no-throw-literal
    throw 'Report tidak ditemukan'
  }
  const docDefinition = rpts[kodeReport](data)

  var pdfDoc = printer.createPdfKitDocument(docDefinition)
  var chunks = []
  var result

  pdfDoc.on('data', function (chunk) {
    chunks.push(chunk)
  })
  pdfDoc.on('end', function () {
    result = Buffer.concat(chunks)
    callback('data:application/pdf;base64,' + result.toString('base64'))
  })
  pdfDoc.end()
}
