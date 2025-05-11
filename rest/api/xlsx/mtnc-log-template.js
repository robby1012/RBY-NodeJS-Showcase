const Excel = require('xlsx')
const moment = require('moment')
// const fs = require('fs')
module.exports = async (res, reqData, rowData, tipe = 'os') => {
  const pathToExcelFile = __dirname + '/template_files/mtnc-log-template.xlsx'
  let workbook = Excel.readFile(pathToExcelFile) // reads original file
  let SheetName = workbook.SheetNames[0] //get first sheet in file
  var ws = workbook.Sheets[workbook.SheetNames[0]];
  let nrow = 1
  var bodyTable = []
  for (var i = 0; i < rowData.data.length; i++) {
    nrow += 1
    //setting format
    ws[`F${nrow}`] = { v: rowData.data[i].tgl_end_meter_lalu !== null ? moment(rowData.data[i].tgl_end_meter_lalu).format('YYYY-MM-DD') : '', z: 'yyyy-mm-dd', t: 's' };
    ws[`G${nrow}`] = { v: '', z: 'yyyy-mm-dd', t: 's' };
    ws[`H${nrow}`] = { v: rowData.data[i].meter_end_lalu !== null ? rowData.data[i].meter_end_lalu : '' }
    ws[`I${nrow}`] = { v: '' }
    ws[`J${nrow}`] = { v: '' }
    ws[`K${nrow}`] = { v: reqData.p_tgl_pencatatan, z: 'yyyy-mm-dd', t: 's' };
    ws[`L${nrow}`] = { v: '' }
    ws[`M${nrow}`] = { v: rowData.data[i].tgl_pencatatan_lalu !== null ? moment(rowData.data[i].tgl_pencatatan_lalu).format('YYYY-MM-DD') : '', z: 'yyyy-mm-dd', t: 's' };
    ws[`N${nrow}`] = { v: '' }
    //sheet_add_aoa
    bodyTable.push([
      i + 1,
      rowData.data[i].id_unit,
      rowData.data[i].nama_blok,
      rowData.data[i].nama_lantai,
      rowData.data[i].nama_unit,
    ])
  }
  //set width columns
  var wscols = [
    { width: 5 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
    { width: 30 },
    { width: 30 }
  ];
  ws['!cols'] = wscols;
  Excel.utils.sheet_add_aoa(ws, bodyTable, { origin: 'A2' });

  if (tipe === 'os') {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'customer.xlsx'
    )
    await Excel.write(workbook, { bookType: 'xlsx', type: 'buffer' }) // write the same file with new values
    res.end()
  } else {
    var file = await Excel.write(workbook, { bookType: 'xlsx', type: 'buffer' }) // write the same file with new values
    'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
      file.toString('base64')
    res.status(200).json({
      ret: 0,
      file:
        'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
        file.toString('base64')
    })
  }
}
  /* console.log(rowData)
var workbook = new Excel.Workbook()

await workbook.xlsx.readFile(__dirname + '/template_files/air-log.xlsx')
const worksheet = workbook.getWorksheet('UPLOAD')
// const row = worksheet.getRow(6);
console.log('datanya', reqData)
if (rowData.ret === 0) {
let nrow = 2
for (var i = 0; i < rowData.data.length; i++) {
nrow += 1
console.log(nrow)
worksheet.getCell(`A${nrow}`).value = i + 1
worksheet.getCell(`B${nrow}`).value = rowData.data[i].id_unit
worksheet.getCell(`C${nrow}`).value = rowData.data[i].nama_blok
worksheet.getCell(`D${nrow}`).value = rowData.data[i].nama_lantai
worksheet.getCell(`E${nrow}`).value = rowData.data[i].nama_unit
worksheet.getCell(`F${nrow}`).value = rowData.data[i].tgl_end_meter_lalu
? moment(rowData.data[i].tgl_end_meter_lalu).format('YYYY-MM-DD')
: null
// worksheet.getCell(`G${nrow}`).value = rowData.data[i].tgl_end_meter_lalu
worksheet.getCell(`H${nrow}`).value = rowData.data[i].meter_end_lalu
// worksheet.getCell(`I${nrow}`).value = rowData.data[i].meter_end_lalu
// worksheet.getCell(`J${nrow}`).value = rowData.data[i].meter_pemakaian_lalu
worksheet.getCell(`K${nrow}`).value = reqData.p_tgl_pencatatan
worksheet.getCell(`L${nrow}`).value = ''
worksheet.getCell(`M${nrow}`).value = rowData.data[i].tgl_pencatatan_lalu
? moment(rowData.data[i].tgl_pencatatan_lalu).format('YYYY-MM-DD')
: null
worksheet.getCell(`N${nrow}`).value =
rowData.data[i].petugas_pencatat_lalu

/* worksheet.getCell(`A${nrow}`).value = rowData.data[i].kode_jenis_kelamin
worksheet.getCell(`B${nrow}`).value = rowData.data[i].nama_jenis_kelamin
worksheet.getCell(`D${nrow}`).value = { formula: `=A${nrow}` }
worksheet.getCell(`E${nrow}`).value = { formula: `=B${nrow}` } */
/*}
  } * /
if (tipe === 'os') {
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + 'customer.xlsx'
  )
  await workbook.xlsx.write(res)
  res.end()
} else {
  var file = await workbook.xlsx.writeBuffer()
  'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
    file.toString('base64')
  res.status(200).json({
    ret: 0,
    file:
      'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
      file.toString('base64')
  })
}
}*/
