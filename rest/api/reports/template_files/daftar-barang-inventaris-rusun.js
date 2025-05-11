const moment = require('moment')

module.exports = function(data) {
    console.log('dataReport', data)
    var dataContent = []
    var RusunawaName = 'LANCANG KUNNG BATAM'
    // looping data inventaris rusun
    for (let i = 0; i < data.length; i++) {
        dataContent.push(
          [i + 1, data[i].nama_aset, '1 ' + data[i].nama_satuan, 'Rp. ' + data[i].biaya_kehilangan]
        )
    }

    return {
        pageSize: 'A4',
        pageMargins: [ 55, 70, 55, 50 ],
	    content: [
            {   
                alignment: 'center',
                style: 'header',
                fontSize: 13,
                text: [
                    'DAFTAR BARANG INVENTARIS RUSUNAWA BPJS KETENAGAKERJAAN '+RusunawaName+'\n',
                    {text: 'LIST OF INVENTORY ITEMS AT RESIDENTIAL FLAT OF BPJS KETENAGAKERJAAN\n',italics: true, bold: true},
                ]
            },
            {
                margin: [0,10,0,0],
                table: {
                    widths:[30,190,70,150],
                    body:[
                        [{text: 'NO\nNO', style: 'header'},
				        {text: 'NAMA BARANG\nITEM NAME', style: 'header'},
				        {text: 'JUMLAH\nQUANTITY', style: 'header'},
				        {text: 'KETERANGAN\nREMARKS', style: 'header'},
                        ],
                        ...dataContent
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'justify',
            },
            subHeader: {
                fontSize: 14,
                bold: true,
            },
            textBody: {
                fontSize: 12,
                alignment: 'justify',
            },
        }
    }
}