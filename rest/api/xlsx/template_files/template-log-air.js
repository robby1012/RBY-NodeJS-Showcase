require('core-js/modules/es.promise')
require('core-js/modules/es.string.includes')
require('core-js/modules/es.object.assign')
require('core-js/modules/es.object.keys')
require('core-js/modules/es.symbol')
require('core-js/modules/es.symbol.async-iterator')
require('regenerator-runtime/runtime')
var Excel = require('exceljs/dist/es5')
module.exports = function (data) {
  var workbook = new Excel.Workbook()
  workbook.creator = 'BPJS Ketenagakerjaan'
  workbook.lastModifiedBy = 'BPJS Ketenagakerjaan'
  workbook.created = new Date()
  var sheetLogAir = workbook.addWorksheet('REKAP PENCATATAN LOGS AIR', {
    properties: {
      tabColor: {
        argb: '808080'
      }
    }
  })
  var cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
  var cols2 = ['1', '2']
  for (var i = 0; i < cols2.length; i++) {
    for (var j = 0; j < cols.length; j++) {
      var index = (cols[j] + cols2[i]).toString()
      if (i == 0) {
        const font = { name: 'Arial', size: 12, bold: true }
        sheetLogAir.getCell(index).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: '808080'
          }
        }

        sheetLogAir.getCell(index).font = font
        font.size = 11
      } else if (i == 1) {
        const font = { name: 'Arial', size: 12 }
        sheetLogAir.getCell(index).font = font
        font.size = 8
        sheetLogAir.getCell(index).alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
        sheetLogAir.getCell(index).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'C0C0C0'
          }
        }
      }
    }
  }
  sheetLogAir.getCell('A1').value = 'NO'
  sheetLogAir.getCell('B1').value = 'ID UNIT'
  sheetLogAir.getCell('C1').value = 'BLOK'
  sheetLogAir.getCell('D1').value = 'LANTAI'
  sheetLogAir.getCell('E1').value = 'UNIT'
  sheetLogAir.getCell('F1').value = 'TANGGAL METER AWAL'
  sheetLogAir.getCell('G1').value = 'TANGGAL METER AKHIR'
  sheetLogAir.getCell('H1').value = 'METER AWAL'
  sheetLogAir.getCell('I1').value = 'METER AKHIR'
  sheetLogAir.getCell('J1').value = 'METER PEMAKAIAN'
  sheetLogAir.getCell('K1').value = 'TANGGAL PENCATATAN'
  sheetLogAir.getCell('L1').value = 'PETUGAS PENCATAT'

  sheetLogAir.getCell('A2').value = '1'
  sheetLogAir.getCell('B2').value = '2'
  sheetLogAir.getCell('C2').value = '3'
  sheetLogAir.getCell('D2').value = '4'
  sheetLogAir.getCell('E2').value = '5'
  sheetLogAir.getCell('F2').value = '(DD/MM/YYYY)'
  sheetLogAir.getCell('G2').value = '(DD/MM/YYYY)'
  sheetLogAir.getCell('H2').value = 'Ex: 20'
  sheetLogAir.getCell('I2').value = 'Ex: 20'
  sheetLogAir.getCell('J2').value = 'Ex: 20'
  sheetLogAir.getCell('K2').value = '(DD/MM/YYYY)'
  sheetLogAir.getCell('L2').value = 'Ex: MUHAMMAD ATEP'
  sheetLogAir.columns = [
    {
      key: 'A',
      width: 4
    },
    {
      key: 'B',
      width: 11
    },
    {
      key: 'C',
      width: 21
    },
    {
      key: 'D',
      width: 31
    },
    {
      key: 'E',
      width: 27
    },
    {
      key: 'F',
      width: 27
    },
    {
      key: 'G',
      width: 27
    },
    {
      key: 'H',
      width: 17
    },
    {
      key: 'I',
      width: 22
    },
    {
      key: 'J',
      width: 22
    },
    {
      key: 'K',
      width: 27
    },
    {
      key: 'L',
      width: 27
    }
  ]
  const row = sheetLogAir.getRow(2)
  row.height = 12

  return workbook
}
