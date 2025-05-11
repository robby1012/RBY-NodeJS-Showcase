const moment = require('moment')

module.exports = function (data) {
console.log(data)
var dataContent = []
  // looping data penghuni
  for (let i = 0; i < data.length; i++) {
    dataContent.push(
      [i + 1, data[i].kode_aset, data[i].nama_aset, data[i].kondisi_awal, '','keterangan']
    )
  }


return {
    
    pageOrientation: 'landscape',
    pageSize: 'A4',
    pageMargins: [ 20,30, 55, 20 ],
	content: [
	    
        { margin: [0,10,10,10],  
	       table: {
	        
	        widths:['auto','auto'],
			body:  [    
				[{text: 'Nama Rusun', style: 'textBody'},
				{text: ': Kabil', style: 'textBody'},
				],
				
		    	[{text: 'Unit', style: 'textBody'},
				{text: ': ' + data[0].nama_unit, style: 'textBody'},
				],
				
				[{text: 'Petugas Pemeriksa', style: 'textBody'},
				{text: ': ', style: 'textBody'},
				],
				
				[{text: 'Tanggal Pemeriksaan', style: 'textBody'},
				{text: ': 28 Februari 2021', style: 'textBody'},
				],
	    	]
		   },
		        layout: 'noBorders'
	    },
	    
	    { margin: [0,10,10,10],  
	       table: {
	        
	        widths:[20,120,200,80,80,240],
			body:  [    
				[{text: 'NO', style: 'subHeader',rowSpan: 2},
				{text: 'KODE ASET', style: 'subHeader',rowSpan: 2},
				{text: 'NAMA ASET', style: 'subHeader',rowSpan: 2},
				{text: 'KONDISI', style: 'subHeader',colSpan: 2},
				'',
				{text: 'KETERANGAN', style: 'subHeader',rowSpan: 2},
				],
				['','','',{text: 'Awal', style: 'subHeader'},{text: 'Akhir', style: 'subHeader'},''],
	    	    ...dataContent
	    	]
		   },
		        layout: 'Borders'
	    },
	    
	            {text: 'Keterangan:', style: 'textBody'},
	            {text: 'Status Akhir Item (B: BAIK, R: RUSAK, H: HILANG, RB: RUSAK BERAT)', margin: [50,10], style: 'textBody'},
	
	    { margin: [600,10,0,0],  
	      fontSize: '11',
	      alignment: 'center',
	       table: {
	        
	        
	        //widths:[20,100,200,90,90,240],
			body:  [    
				[
					{text: 'Batam, ' +  moment().format('DD MMMM YYYY')+ '\nYang Membuat'},
				
				],
				
	    	    ['\n\n\n\n'],
	    	    ['(..............................................)'],
	    	    ['Nama'],
	    	    ['Petugas Pemeriksa'],
	    	]
		   },
		        layout: 'noBorders'
	    },
		
	],
	styles: {
    header: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
    },
    subHeader: {
        fontSize: 12,
        bold: true,
        alignment: 'center',
    },
    textBody: {
        fontSize: 11,
        
    },
    footer: {
        fontSize: 13,
        
        
        
    }
}
	
}
}