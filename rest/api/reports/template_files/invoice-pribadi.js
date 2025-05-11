const moment = require('moment');
const { isNumber } = require("validate.js");
function currency(curr) {
    var data;
    if (!isNumber(curr)) {
        data = (parseInt(curr)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else if (isNumber(curr)) {
        data = (curr).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    var str = data.toString();

    var comma = str.split('.');
    var txt = comma[0].replace(/,/g, '.')
    var rp = txt + ',' + comma[comma.length - 1].replace('.', ',')

    return rp
}

module.exports = function(data) {
moment.locale('id')

var demand_air = '0'
var demand_lstrk = '0'
var meter_start_air = '0'
var meter_start_lstrk = '0'
var meter_end_air = '0'
var meter_end_lstrk = '0'
var consume_air = '0'
var consume_lstrk = '0'
var amount_lstrk = '0'
var amount_air = '0'
var pju_air = '0'
var wmm_lstrk = '0'
var total_lstrk = '0'
var total_air = '0'





//PARTICULAR
var data_kontrak = data;
var invlstrk = data_kontrak[0].invlstrk !== null ? data_kontrak[0].invlstrk : []
var tarif_air_now = data_kontrak[0].tarif_air_now !== null ? data_kontrak[0].tarif_air_now : []
var tarif_listrik_now = data_kontrak[0].tarif_listrik_now !== null ? data_kontrak[0].tarif_listrik_now : []


var noInvoice = data[0].no_invoice === null ? '-'  : data[0].no_invoice.toUpperCase()
var perusahaanPihak2 = data[0].pihak2_nama_perusahaan === null ? '-'  : data[0].pihak2_nama_perusahaan.toUpperCase()
var namaPihak2 = data[0].pihak2_nama_lengkap === null ? '-'  : data[0].pihak2_nama_lengkap.toUpperCase()
var blok = data[0].unit[0].nama_unit
var dateMaxOver = moment(data[0].max_tgl_bayar).format("DD MMMM YYYY")

var dateIn = moment(data[0].invsewa[0].periode_bln_sewa_awal).format("DD MMMM YYYY");
var dateOut = moment(data[0].invsewa[0].periode_bln_sewa_akhir).format("DD MMMM YYYY");

var dateAssign = '1 Januari 2020';

//PARTICULAR LISTRIK
var rateKwh= 0
var faktorPengali = 0
var demandCharges = 0
var pju_lstrk = 0


if (data_kontrak[0].invlstrk !== null) {

    rateKwh += invlstrk[0].rate_per_kwh
    faktorPengali = invlstrk[0].faktor_pengali;
    demandCharges = invlstrk[0].demand_charges;
    pju_lstrk += invlstrk[0].nominal_pju;
    
}

//PARTICULAR LISTRIK NOW
var demandCharges = 0



if (data_kontrak[0].tarif_listrik_now !== null) {

    demandCharges += tarif_listrik_now[0].demand_charges;
    
}

//PARTICULAR AIR NOW
var rate_m3 = 0;
var wmm_air = 0;

if (data_kontrak[0].tarif_air_now !== null) {

    rate_m3 += tarif_air_now[0].rate_per_m3
    wmm_air += tarif_air_now[0].wmm;
   
    
    
}




return {  
    
    content: [

        {
            margin: [0, -30, 0,0],  
            table: {
                
                widths:[50,400],
                body:  [    
                    [{rowSpan: 4, 
                        text:'LOGO'},	
                        {text: 'PENGELOLA RUMAH SUSUN SEWA BPJS KETENAGAKERJAAN', fontSize: 12, bold: true, alignment: 'center'}
                    ],
                    ['',{text: 'KABIL', fontSize: 11, bold: true, alignment: 'center'}],
                    ['',{text: 'Jalan Hang Kesturi - Kabil ', fontSize: 11, bold: true, alignment: 'center'}],
                    ['',{text: 'Telp. (0778) 711870 - 711871 Fax (0778) 711873', fontSize: 10, italics: true, alignment: 'center'}],
                
                    ]
            },
            layout: 'noBorders'
        },
        
        {
            canvas:[{
                type:'line',
                x1: -30, y1:5,
                x2: 540, y2:5,
                lineWidth:2
            }  
           ]
        },
        {
                margin: [0, 5, 0,0],
                style:'headerContent',
                table: {
                widths: [100,20,'auto'],
                body:  [    
                    [{text: 'Invoice No.', bold: true},':', noInvoice],
                    [{text: 'Due From', bold: true},':', perusahaanPihak2],
                    [{text: 'Messrs', bold: true},':', namaPihak2],
                    
                
                ]
            },
            layout: 'noBorders'
        },
        {
            canvas:[{
                type:'line',
                x1: -30, y1:3,
                x2: 540, y2:3,
                lineWidth:2
            }  
           ]
        },
        {
            margin: [0, 0, 0,0],
            text:'PARTICULAR',
            fontSize:10,
            bold:true,
            alignment:'center'
        },
        {
            canvas:[{
                type:'line',
                x1: -30, y1:3,
                x2: 540, y2:3,
                lineWidth:2
            }  
           ]
        },
        {
            margin: [-28, 15, 0,0],
            style:'bodyContent',
            table: {
            body:  [
                ['Blok / Nomor',':   '+blok,''],
                ['Rate/KWH',':   Rp. '+rateKwh,''],
                [' ',' ',' '],
                ['Demand Charges',': '+faktorPengali + ' x Rp. ' +currency(demandCharges),''],
                ['PJU',':   Rp. '+currency(pju_lstrk),''],
                ['Rate/M3',{colSpan: 2, text: ':   Rp. '+currency(rate_m3) + '    Water Meter Maintenance (WMM) : Rp. '+currency(wmm_air)}],
                [' ',' ',' '],
                ['Tgl Jatuh tempo',': '+dateMaxOver,''],
            ]
        },
        layout: 'noBorders'
    },
    {
        margin: [352,-120,0,0],
        style:'bodyContent',
        table: {
        widths:[50,20,100],
        body:  [
            [{text:'Room',border:[true,true,false,false]},{text:'Rp.', border:[true,true,false,false]},{text: currency(data[0].invsewa[0].tarif_unit), alignment:'right', border:[false,true,true,true]}],
            [{text:'Deposit',border:[true,false,false,false]},{text:'Rp.', border:[true,false,false,false]},{text: currency(data[0].invdpst[0].nominal_akhir), alignment:'right', border:[false,false,true,false]}],
            [{text:'Tv Kabel',border:[true,false,false,false]},{text:'Rp.',border:[true,false,false,false]},{text: '0,00', alignment:'right', border:[false,false,true,false]}],
            [{text:'Electricity',border:[true,false,false,false]},{text:'Rp.',border:[true,false,false,false]},{text: '0,00', alignment:'right', border:[false,false,true,false]}],
            [{text:'Water',border:[true,false,false,false]},{text:'Rp.',border:[true,false,false,false]},{text: '0,00', alignment:'right', border:[false,false,true,false]}],
            [{text:'Sewa ac',border:[true,false,false,false]},{text:'Rp.',border:[true,false,false,false]},{text: '0,00', alignment:'right', border:[false,false,true,false]}],
            [{text:'Denda',border:[true,false,false,false]},{text:'Rp.',border:[true,false,false,false]},{text: '0,00', alignment:'right', border:[false,false,true,false]}],
            [{text:'Pajak Sewa',border:[true,false,false,false]},{text:'Rp.' ,border:[true,false,false,false]},{text: currency(data[0].invsewa[0].pajak_nominal), alignment:'right', border:[false,false,true,false]}],
            [{text:'Grand Total',border:[true,false,false,true]},{text:'Rp.'  ,border:[true,true,false,true]},{text: currency(data[0].nominal_akhir), alignment:'right', border:[false,true,true,true]}],
        ]
    },
    //layout: 'noBorders'
},
{
            margin: [-32, 15,0,0],
            style:'bodyContent',
            alignment:'center',
            
            table: {
                widths:[55,55,55,55,55,55,55,55,55],
                body:  [
                    [{rowSpan:2,text:'Meter'},'Demand','Start','End','Consume','Amount','PJU','WMM','TOTAL'],
                    ['','Charges','Meter','Meter','End - Start','Consume','(Rupiah)','(Rupiah)','(Rupiah)'],
                    ['Electricity',{text: demandCharges, alignment:'right'}, {text: meter_start_lstrk, alignment:'right'}, {text: meter_end_lstrk, alignment:'right'}, {text: consume_lstrk, alignment:'right'}, {text: amount_lstrk, alignment:'right'}, {text: pju_lstrk, alignment:'right'}, {text: wmm_lstrk, alignment:'right'},{text: total_lstrk, alignment:'right'}],
                    ['Water',{text: demand_air, alignment:'right'}, {text: meter_start_air, alignment:'right'}, {text: meter_end_air, alignment:'right'}, {text: consume_air, alignment:'right'}, {text: amount_air, alignment:'right'}, {text: pju_air, alignment:'right'}, {text: wmm_air, alignment:'right'},{text: total_air, alignment:'right'}],
                    
                ]
            },
            //layout: 'noBorders'
        },
        
        
        {
                margin: [0, 15,0,0],
                style:'bodyContent',
                table: {
                    body:  [
                        ['Periode Sewa Kamar Dari Tanggal ',':',moment(data[0].periode_bln_sewa_awal).format("DD MMMM YYYY")+ ' s/d ' + moment(data[0].periode_bln_sewa_akhir).format("DD MMMM YYYY")],
                        ['Meter Listrik & Air Dicatat Mulai Tanggal ',':',moment(data[0].periode_bln_sewa_awal).format("DD MMMM YYYY") + ' s/d ' + moment(data[0].periode_bln_sewa_akhir).format("DD MMMM YYYY")]
                        
                    ]
            },
            layout: 'noBorders'
        },
        {
            canvas:[{
                type:'line',
                x1: -30, y1:10,
                x2: 540, y2:10,
                lineWidth:2
            }  
           ]
        },
        {
            text: [
                data[0].say    
                //NB: Jika pembayaran melalui transfer Bank, harap bukti transfer diserahkan ke kantor pengelola / di fax ke  (0778) 711873'
            ],
                fontSize: 9,
                bold: true,
                italics: true,
                margin: [0,3,0,0]
        },
        {
            canvas:[{
                type:'line',
                x1: -30, y1:5,
                x2: 540, y2:5,
                lineWidth:2
            }  
           ]
        },
        {   
            margin:[0,15,0,0],
            style: 'headerContent',
            table: {
                widths: [330,150],
                heights: [25,25],
                body: [
                    ['Note: Keterlambatan pembayaran akan dikenakan denda 10%\nSilahkan Transfer Pembayaran Anda di:',{text: 'Batam, '+ moment().format('DD MMMM YYYY'), alignment: 'center'}],
                    [{text: data[0].note_payment_method, bold: true}, ''],
                    ['Jln. Raja Ali Haji ', {text: ''+ data[0].ttd_nama, alignment: 'center'}]
                ]
                
            },
            layout: 'noBorders'
                
        }
        
    ],
    styles: {
		headerContent: {
			fontSize: 10,
		},
		bodyContent: {
			fontSize: 9,
		},
		noborder:{
		    border:[false,false,false,false],
		}
	},
}
}
  