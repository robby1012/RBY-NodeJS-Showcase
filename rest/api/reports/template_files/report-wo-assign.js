const moment = require('moment')
const { isNumber } = require("validate.js");

module.exports = function(data) {
	console.log(data[0].f_mw_surat_tugas)
  moment.locale('id');
  var dataHeader = data[0]
  var dataBody = data[0].wo
  var data_wo = data[0].f_mw_surat_tugas.data_wo
  var data_content_wo = []
  for (var i = 0; i < data_wo.length; i++) {
	data_content_wo.push(
		[
			{ text: i + 1, style: 'textBody' },
			{ text: moment(data_wo[i].assigned_work_start_date).format('DD-MMM-YY'), style: 'textBody' },
			{ text: data_wo[i].title_wo, style: 'textBody' },
			{ text: data_wo[i].nama_unit !== null ? data_wo[0].nama_unit : { text: '-', alignment: 'center' }, style: 'textBody' },
			{ text: data_wo[i].assigned_notes, style: 'textBody' },
			{ text: data_wo[i].deskripsi_wo, style: 'textBody' }
		],
	)

}
  // looping data penghuni
  var kode_blok = '';
  	return {
    
    pageOrientation: 'potrait',
    pageSize: 'A4',
    pageMargins: [ 20,30, 55, 20 ],
	content: [
	    
	    //{text: 'Daftar Kontrak Penghuni\nRusunawa BPJS Ketenagakerjaan Kabil-Batam', fontSize: 14, bold: true, alignment: 'center'},
	    
        { margin: [0,10,10,10],  
	       table: {
	        
	        widths:['auto'],
			body:  [    
				[{text: 'Pengelola Rumah Susun BPJS Ketenagakerjaan', style: 'textBody'}
				
				],
				
		    	[{text: data_wo[0].nama_rusun, style: 'textBody'}
			
				],
				[{text: data_wo[0].lokasi, style: 'textBody'}
			
				],
				[{text: data_wo[0].provinsi, style: 'textBody'}
			
				],
	    	]
		   },
		        layout: 'noBorders'
	    },
	    
	    { margin: [0,-5,10,10],  
	       table: {
	        
	        widths:[30,60,160,80,90,80],
			body:  [    
				[{text: 'WORK ORDER - ' + data_wo[0].title_wo.toUpperCase(), style: 'header',colSpan: 6},
				{text: 'Nama', style: 'subHeader',rowSpan: 2},
				{text: 'Perusahaan', style: 'subHeader',rowSpan: 2},
				{text: 'Sistem Pembayaran', style: 'subHeader',rowSpan: 2},
				{text: 'Tanggal Kontrak', style: 'subHeader',rowSpan: 2},
				{text: 'Akhir Kontrak', style: 'subHeader',rowSpan: 2},
				],
				
				[{text: 'Dari    : ' + data_wo[0].pemberi_tugas, fontSize: 10, colSpan: 6,border: [true, true, true, false] },
				'','','','',''],
	    	    [{text: 'Untuk : ' + data_wo[0].petugas_wo, fontSize: 10, colSpan: 6, border: [true, false, true, false]},
	    	    '','','','',''],
	    	    
	    	    [{text: 'No', style: 'subHeader'},
	    	    {text: 'Tgl', style: 'subHeader'},
	    	    {text: 'Permasalahan', style: 'subHeader'},
	    	    {text: 'Nama Unit', style: 'subHeader'},
	    	    {text: 'Tindakan', style: 'subHeader'},
	    	    {text: 'Keterangan', style: 'subHeader'}
                ],

				...data_content_wo
	    	    
	    	    
	    	]
		   },
		        layout: 'Borders'
	    },
	    
	   { margin: [0,0,10,10],  
	       table: {
	        
	        widths:[180,180,175],
			body:  [ 
				[{text: '', fontSize: 11, alignment: 'center'},
				{text: '', fontSize: 11, alignment: 'center'},
				{text: '\n\n' + data_wo[0].provinsi + ', ' + moment().format('DD MMMM YYYY'),bold: true, fontSize: 10,alignment: 'center'},
				],
				
				[{text: 'Pemberi tugas,', fontSize: 10,alignment: 'center'},
				{text: '', fontSize: 11, alignment: 'center'},
				{text: 'Pemohon,', fontSize: 10, alignment: 'center'},
				
				],
				
				['\n\n\n\n','',''],
				
				[{text:  data_wo[0].pemberi_tugas, fontSize: 9, alignment: 'center'},
				{text:'', alignment: 'center'},
				{text: '(.....................................................)', fontSize: 9, alignment: 'center'}],
				
				[{text: '1 : Adm', style: 'textBody'},'',''],
				[{text: '2 : Maintenance', style: 'textBody'},'',''],
	    	    
	    	],
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
        fontSize: 11,
        bold: true,
        alignment: 'center',
    },
    textBody: {
        fontSize: 9,
        
    },
    footer: {
        fontSize: 13,
        
        
        
    }
}
	
}
}
