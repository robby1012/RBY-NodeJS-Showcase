//const { rptBuktiBayarPribadi } = require('../reports/invoice')
const xl = require('excel4node');
const Excel = require('xlsx')
const moment = require('moment')
const rpts = {
	...require('./aset-template')
}

const generatorXLSX = {
	'mtnc-log-template': require('./mtnc-log-template'),
	'aset-template': require('./aset-template')
}

module.exports.generateXLSX = function (res, generatorName, reqParams, rowData, tipe = 'os') {
	if (typeof generatorXLSX[generatorName] !== 'undefined') {
		return generatorXLSX[generatorName](res, reqParams, rowData, tipe)
	}
	if (typeof rpts[generatorName] !== 'undefined') {

		try {
			return BufferToExcel(res, reqParams, rowData, tipe, generatorName)
		} catch (error) {
			throw 'Generator tidak ditemukan'
		}

	}

	throw 'Generator tidak ditemukan'
}

async function BufferToExcel(res, reqData, data, tipe = 'os', kodeReport) {
	if (typeof rpts[kodeReport] === 'undefined') {
		throw 'Report tidak ditemukan'
	}
	const wb = rpts[kodeReport](data.data)
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
		wb.writeToBuffer().then(function (buffer) {
			'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
				buffer.toString('base64')
			res.status(200).json({
				ret: 0,
				file:
					'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
					buffer.toString('base64')
			})
		});
		//var file = await Excel.write(workbook, { bookType: 'xlsx', type: 'buffer' }) // write the same file with new values

	}
}


