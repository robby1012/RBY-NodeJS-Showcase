const moment = require('moment')

module.exports = function(data) {
  console.log('dataReport', data)
  var dataContent = []
  // looping data penghuni
  for (let i = 0; i < data.length; i++) {
    dataContent.push(
      [i + 1, data[i].nama_aset, '1 ' + data[i].nama_satuan, 'Rp. ' + data[i].biaya_kehilangan, data[i].biaya_kerusakan]
    )
  }

  return {
    pageSize: 'A4',
    pageMargins: [ 55, 70, 55, 50 ],
	content: [
	    {alignment: 'center',
        style: 'header',
        text: [
            'BIAYA PENGGANTIAN BARANG INVENTARIS YANG HILANG ATAU RUSAK ',
            {text: 'REPLACEMENT COST OF LOST OR DAMAGED INVENTORY ITEMS\n',italics: true, bold: true},
            
        ]
    },
    	{
	    margin: [0,10,0,0],  
	    table: {
	        
	        widths:[30,190,70,80,70],
			body:  [    
				[{text: 'NO\nNO', style: 'header'},
				{text: 'NAMA BARANG\nITEM NAME', style: 'header'},
				{text: 'JUMLAH\nQUANTITY', style: 'header'},
				{text: 'HILANG\nLOST', style: 'header'},
				{text: 'RUSAK\nDAMAGED', style: 'header'},
				],
				...dataContent
	    		
	    	]
		},
		layout: 'Borders'
	},
		
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
    footer: {
        fontSize: 13,
        
        
        
    }
}
	
}
}