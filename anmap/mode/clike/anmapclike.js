/*	
AnMap - Analogy Mapping
Dibuat Oleh/Made By: Rosa Ariani Sukamto
Waktu/ Time: Juli 2016
Didukung oleh / Support By CodeMirror
*/

var canvas;
var ctx;
var width;
var height;
	
var arrtoken = []; //array token / token array
var arrlabel = []; //array label / table array
var xv = 0;
var yv = 0;
var index = 0;

//mendata variabel dan typedef dan array/ 
//tipe terstruktur / structured type
var arrstruct = [];//untuk nama typedef struct
var arrstructtypecontent = []; // untuk tipe isi tipe terstruktur
var arrstructnamecontent = []; // untuk nama isi tipe terstruktur

//untuk variabel tipe bentukan
var arrstructvartype = [];
var arrstructvarname = [];
var arrstructvarvalue = [];
var arrstructvarrow = [];
var arrstructvarcol = [];

//variabel
var arrtype = []; //untuk nama tipe dari variabel
var arrvarname = [];// untuk nama variabel
var arrvarvalue = [];//untuk nilai variabel		
var arrvardec = [];
//array
var arrtyperarr = [];//tipe array
var arrnamearr = []; //nama array
var arrrownum = [];// dimensi 1
var arrcolnum = []; //dimensi 2
//prcedure function
var arrtypeproc = []; //tipe prosedur fungsi
var arrnameproc = []; //nama procedure fungsi
var arrnumparam = [];//banyaknya parameter
var arrparamtype = []; //tipe parameter
var arrparamname = []; //nama parameter	

var lastyv = 0;
var measurement = 0;
var awal = 1;

//stack kalang
var stack = [];
var stackyv = [];
var stackxv = [];
var stackmark = [];
var istack = -1;//counter stack
var adds = 20;//penambah indentasi kalang

//untuk pewarnaan
//if, for, while, do
var kalang = ["if", "else", "elseif", "for", "while", "do"];
var linecolour = ["Maroon", "Maroon", "Maroon", "Black", "Grey", "DarkGreen"];
var textcolour = ["DarkGreen", "DarkGreen", "DarkGreen", "Navy", "Coral", "IndianRed"];

function process(){
	canvas = document.getElementById("analogycanvas");
	ctx = canvas.getContext("2d");

	width = canvas.width; 
	height = canvas.height;		
	
	//location.reload();
	arrtoken = []; //array token
	arrlabel = []; //array label
	index = 0;
	
	xv = 10;
	yv = 10;
	measurement = 0;
	lastyv = 0;
	clear();
	/*document.removeChild(canvas);
	canvas = document.createElement('analogycanvas');
	canvas.id = 'analogycanvas';
	document.body.appendChild(canvas);*/
	editor.refresh();
	//-------------------------------------------------------------------------------------------------------		
	//mengambil token dan label dari teks editor
	//-------------------------------------------------------------------------------------------------------
	//mengambil awalan dan akhir teks pada editor
	var from = {line:0, ch:0}, to = {line:editor.lineCount()-1};
	editor.operation(function() {
		var output = "";

		function pad(str, x) {		
			var result = str;
			return result;
		}

		//memasukkan token dan label kedalam array
		function debugToken(mode, token, state, stream, originalPosition, startOfNewLine) {
			var string = stream.current();
			//membuang spasi dan enter
			string = string.replace(/\s+$/, ' ');
			if((new String(string).valueOf() != new String(" ").valueOf())
				&&(new String(token).valueOf() != new String("comment").valueOf())
				&&(new String(stream.current()).valueOf() != new String("undefined").valueOf())
				&&(stream.current() != undefined)){
				arrtoken[index] = pad(token ? String(token) : "-", 12);
				arrlabel[index] = stream.current();
				index++;
			}
		}

		var outerMode = editor.getMode();
		var content = editor.getRange(from, to);
		var state = CodeMirror.copyState(outerMode, editor.getTokenAt(from).state);
		var lineOffset = 0;
		var lines = content.split("\n");
		for (var i = 0; i < lines.length; ++i) {
			var line = lines[i];
			var startOfNewLine = true;
			var stream = new CodeMirror.StringStream(line);
			//pengulangan pengambilan token dan label
			while (!stream.eol()) {
				var innerMode = CodeMirror.innerMode(outerMode, state);
				var token = outerMode.token(stream, state);
				//debugToken
				debugToken(innerMode.mode, token, state, stream, lineOffset + stream.start, startOfNewLine);
				stream.start = stream.pos;
				startOfNewLine = false;
			}
		}
		
	}, false);
	
	//-------------------------------------------------------------------------------------------------------	
	//proses pentabelan
	//-------------------------------------------------------------------------------------------------------		
	//mendata variabel dan bungkusan dan array
	//tipe terstruktur
	arrstruct = [];//untuk nama typedef struct
	arrstructtypecontent = []; // untuk tipe isi tipe terstruktur
	arrstructnamecontent = []; // untuk nama isi tipe terstruktur
	//untuk variabel bertipe bentukan
	arrstructvartype = [];
	arrstructvarname = [];
	arrstructvarvalue = [];
	//variabel
	arrtype = []; //untuk nama tipe dari variabel
	arrvarname = [];// untuk nama variabel
	arrvarvalue = [];//untuk nilai variabel		
	//array
	arrtyperarr = [];//tipe array
	arrnamearr = []; //nama array
	arrrownum = [];// dimensi 1
	arrcolnum = []; //dimensi 2			
	//prcedure function
	arrtypeproc = []; //tipe prosedur fungsi
	arrnameproc = []; //nama procedure fungsi
	arrnumparam = [];//banyaknya parameter
	arrparamtype = []; //tipe parameter
	arrparamname = []; //nama parameter
	
	//mendata variabel dan bungkusan dan array
	var typedefmark = 0; //penanda status tipe terstruktur
	var varmark = 0; // penanda status variabel
	var arrmark = 0;// penanda status array
	var procmark = 0;//penanda status prosedur fungsi
	var istruct = 0;//iterator untuk array tipe terstruktur
	var icontentstruct = 0;//iterator untuk setiap isi dari tipe terstruktur
	var ivar = 0;//iterator variabel
	var iarr = 0;//iterator array
	var iproc = 0;//iterator prosedur/fungsi
	var iparamproc = 0;
	var typetemp = ""; //variabel untuk menyimpan tipe sebelumnya
	var i;
	var istructnum = 0;
	var iparamnum = 0;
	var istructvar = 0;
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//proses penggambaran analogi menggunakan state machine
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//console.clear();
	for(i=0;i<arrtoken.length;i++){	
		if(awal == 1){//merupakan awal dari setiap baris gambar	
			
			if(measurement > lastyv){
				if(yv < measurement){
					yv = measurement;
				}
			}else{
				if(yv < lastyv){
					yv = lastyv;
				}
			}
		}
		
		//tracking();
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//mengenali tipe terstruktur
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		if((new String(arrlabel[i]).valueOf() == new String("typedef").valueOf()) 
		&& (new String(arrlabel[i+1]).valueOf() == new String("struct").valueOf())){
			typedefmark = 1;
			i = i + 1;
		}else if((typedefmark == 1) && (new String(arrtoken[i]).valueOf() == new String("variable-3").valueOf())){
			if(arrstructtypecontent[istruct] == undefined){
				arrstructtypecontent[istruct] = [];
				arrstructnamecontent[istruct] = [];
			}
			
			arrstructtypecontent[istruct][icontentstruct] = arrlabel[i];
			arrstructnamecontent[istruct][icontentstruct] = arrlabel[i+1];
			icontentstruct++;
			//typedefTracking();
		}else if((typedefmark == 1) && ((new String(arrtoken[i]).valueOf() == new String("-").valueOf()))){
			if(new String(arrlabel[i]).valueOf() == new String("}").valueOf()){
				//----------------------------------------------------------
				//DEKLARASI TYPEDEF STRUCT
				//----------------------------------------------------------
				lastyv = yv;
				typedefmark = 0;
				arrstruct[istruct] = arrlabel[i+1];
				
				if(measurement < (yv + 270)){
					measurement = yv + 270;
				}
				
				(function (_x, _y, _arrvarname, _arrtype, _arrname, index) {
					var image1 = new Image();	
					image1.src = 'assets/images/bungkusanjadi2.png';
					image1.onload = function () {
					   // drawVariable(xv, yv, _label, image1);	
						ctx.restore();
						ctx.drawImage(image1, _x, _y, image1.width, image1.height);
						var strlen = (22 - _arrvarname[index].length)/2;
						if(strlen < 0){
							strlen = 0;
						}
						var xtemp = _x + (image1.width/22) * strlen;
						ctx.font = "bold 15px Arial";
						ctx.fillText("jenis: " + _arrvarname[index],(_x+20), (_y + 40));
						var k;
						var xt = _x;
						for(k=0;k<_arrname[index].length;k++){
							if((k%3 == 0) && (k > 0)){
								_y = _y + 50;
								xt = _x;
							}
							if(k < 6){		
								(function (__x, __y, __arrname) {
									var image2 = new Image();	
									image2.src = 'assets/images/box_open.png';
									image2.onload = function () {
									   // drawVariable(xv, yv, _label, image1);	
										ctx.restore();
										ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));
										var strlen = (12 - (__arrname).length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
										ctx.font = "bold 10px Arial";
										ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
									};								
								})(xt, _y, _arrname[index][k]);	
								//45 image box dibagi 2
								xt = xt + 45 + 5;
							}else{
								var xtemp = xt + 45;
								ctx.font = "bold 15px Arial";
								ctx.fillText(".................", xtemp,(_y + 95));
								break;
							}
						}
					};
				})(xv, yv, arrstruct, arrstructtypecontent, arrstructnamecontent, istruct);	
				i = i + 1;
				yv = yv + 270;
				awal = 1;
				istruct++;
				icontentstruct = 0;
			}
		}
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//mengenali variabel
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		else if((typedefmark == 0) && (new String(arrtoken[i]).valueOf() == new String("variable-3").valueOf())){
			if(new String(arrtoken[i+1]).valueOf() == new String("variable").valueOf()){
				typetemp = arrlabel[i];
				if(new String(arrlabel[i+2]).valueOf() == new String("[").valueOf()){
					//-----------------------------------------------------------------
					//DEKLARASI ARRAY
					//-----------------------------------------------------------------
					lastyv = yv;
					arrmark = 1;
					arrtyperarr[iarr] = arrlabel[i];
					arrnamearr[iarr] = arrlabel[i+1];
					arrrownum[iarr] = arrlabel[i+3];
					if(new String(arrtoken[i+6]).valueOf() == new String("number").valueOf()){
						arrcolnum[iarr] = arrlabel[i+6]; 
					}					
					
					yv = yv + 10;	
									
					//jika array satu dimensi
					if(arrcolnum[iarr] == undefined){	
						if(measurement < yv + 100){
							measurement = yv + 100;
						}
						var xt = xv;
						var k;
						for(k=0;k<arrrownum[iarr];k++){
							if(k<8){
								(function (_x, _y, counter) {	
										var image1 = new Image();	
										image1.src = 'assets/images/box_open1.png';
										image1.onload = function () {
										   // drawVariable(xv, yv, _label, image1);	
											ctx.restore();
											ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));	
											
											ctx.font = "bold 10px Arial";
											ctx.fillText(counter, (_x + 15),(_y + 50));
											
											ctx.beginPath();
											ctx.moveTo(_x, (_y+40));
											ctx.lineTo((_x+55), (_y+40));
											ctx.lineWidth=2; 			
											ctx.strokeStyle='Navy';  	
											ctx.stroke();
											ctx.closePath();
										};	
								})(xt, yv, k);
								xt = xt + 55;
							}else{				
								ctx.restore();				
								ctx.font = "bold 15px Arial";
								ctx.fillText("  .................", xt,(yv + 40));
								break;
							}
						}
						
						ctx.font = "bold 15px Arial";
						ctx.fillText(arrnamearr[iarr], xv, yv-10);
						yv = yv + 100;
						awal = 1;
					}else{	
						if(measurement < (yv + (5 * 45))){
							measurement = yv + (5 * 45);
						}
						var xt = xv;
						var k, l;	
						for(k=0;k<arrcolnum[iarr];k++){
							if(k < 8){
								for(l=0;l<arrrownum[iarr];l++){
									if(l < 5){
										//ubah background are
										ctx.fillStyle = '#fff';
										ctx.fillRect(xt,(yv + (l * 30)),40,30); 
										ctx.fillStyle = '#000';		
										ctx.strokeStyle = "Navy";
									    ctx.lineWidth   = 2;
									    ctx.strokeRect(xt,(yv + (l * 30)),40,30);
									}else{		
										ctx.restore();														
										ctx.font = "bold 15px Arial";
										ctx.fillText(".................", xt,(yv + (l * 30) + 15));
										break;
									}							
								}
							}else{		
								ctx.restore();											
								ctx.font = "bold 15px Arial";
								ctx.fillText(".................", (xt + 10), (yv + 10));
								break;
							}
							xt = xt + 40;
						}					
						ctx.font = "bold 15px Arial";
						ctx.fillText(arrnamearr[iarr], xv, yv-10);
						if(arrrownum[iarr] < 5){
							yv = yv + (arrrownum[iarr] * 45);	
							awal = 1;		
							//canvas.height = canvas.height + (arrcolnum[iarr] * 50);
						}else{						
							yv = yv + (5 * 45);	
							awal = 1;
							//canvas.height = canvas.height + (5 * 50);
						}				
					}					
					
					if(new String(arrtoken[i+6]).valueOf() == new String("number").valueOf()){
						i = i + 7;
					}else{
						i = i + 4;
					}
					
					iarr++;
				}else if(procmark == 1){//jika parameter prosedur fungsi				
					arrnumparam[iproc]++;//banyaknya parameter
					if(arrparamtype[iproc] == undefined){
						arrparamtype[iproc] = []; //tipe parameter
						arrparamname[iproc] = []; //nama parameter
					}
					arrparamtype[iproc][iparamproc] = arrlabel[i]; //tipe parameter
					arrparamname[iproc][iparamproc] = arrlabel[i+1]; //nama parameter
					iparamproc++;
				}else{
					//--------------------------------------------------------
					//DEKLARASI VARIABEL
					//--------------------------------------------------------
					varmark = 1;
					arrtype[ivar] = arrlabel[i]; //untuk nama tipe dari variabel
					arrvarname[ivar] = arrlabel[i+1];// untuk nama variabel
					if((new String(arrtoken[i+2]).valueOf() == new String("operator").valueOf())
						&&(new String(arrlabel[i+2]).valueOf() == new String("=").valueOf())){
						
						var tanda = 0;
						if((isThere(arrvarname, arrlabel[i+3]) == -1) 
						&&(isThere(arrstructvarname, arrlabel[i+3]) == -1)
						&&(isThere(arrnamearr, arrlabel[i+3]) == -1)){
							//jika setelah sama dengan adalah nilai
							arrvarvalue[ivar] = arrlabel[i+3];
						}else{
							tanda = 1;
						}
					}								
					
					//proses penggambaran						
					(function (_x, _y, _arrvarname, _arrvarvalue, next, td) {	
						var image1 = new Image();	
						image1.src = 'assets/images/box_open1.png';
						image1.onload = function () {
						   // drawVariable(xv, yv, _label, image1);	
							ctx.restore();
							ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
							var strlen = (12 - _arrvarname.length)/2;
							if(strlen < 0){
								strlen = 0;
							}
							var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
							ctx.font = "bold 10px Arial";
							ctx.fillText(_arrvarname, xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
							//cetak nilai
							if((_arrvarvalue != undefined) 
								&&(new String(next).valueOf() == new String("=").valueOf())){
								ctx.fillText(_arrvarvalue, (_x + 20),(_y + 20));
							}
							
							if(td == 1){															
								ctx.font = "bold 20px Arial";
								//ctx.fillText(next, (_x + 70), (_y + 40));
							}
						};
					})(xv, yv, arrvarname[ivar], arrvarvalue[ivar], arrlabel[i+2], tanda);	
					
					if(new String(arrtoken[i+2]).valueOf() == new String("operator").valueOf()){
						i = i + 3;
					}else if(tanda == 1){
						xv = xv + 70;
						i = i + 2;
						awal = 0;
					}else{
						i = i + 1;
					}
					ivar++;
				}
			}else if((procmark == 0) && (new String(arrtoken[i+1]).valueOf() == new String("def").valueOf())){
				//deklarasi fungsi prosedur
				procmark = 1;
				arrtypeproc[iproc] = arrlabel[i]; //tipe prosedur fungsi
				arrnameproc[iproc] = arrlabel[i+1]; //nama procedure fungsi
				arrnumparam[iproc] = 0;
				//iproc++;
			}
		}else if(((varmark == 1)||(arrmark == 1)) 
		&& (new String(arrlabel[i]).valueOf() == new String(",").valueOf())){
			if(new String(arrlabel[i+2]).valueOf() == new String("[").valueOf()){
				//----------------------------------------------------
				//DEKLARASI ARRAY DENGAN KOMA
				//----------------------------------------------------
				lastyv = yv;
				arrmark = 1;
				varmark = 0;				
				arrtyperarr[iarr] = typetemp;
				arrnamearr[iarr] = arrlabel[i+1];
				arrrownum[iarr] = arrlabel[i+3];
				if(new String(arrtoken[i+6]).valueOf() == new String("number").valueOf()){
					arrcolnum[iarr] = arrlabel[i+6]; 
				}		
				if(istack != -1){
					xv = (istack * adds) + 10;
				}else{
					xv = 10;
				}
				if(yv < measurement){
					yv = measurement;
					yv = yv + 10;
				}
				//yv = yv + 150;
				awal = 1;
				//jika array satu dimensi
				if(arrcolnum[iarr] == undefined){	
					if(measurement < (yv + 100)){
						measurement = yv + 100;
					}
					var xt = xv;
					var k;
					for(k=0;k<arrrownum[iarr];k++){
						if(k<8){
							(function (_x, _y, counter) {	
									var image1 = new Image();	
									image1.src = 'assets/images/box_open1.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);	
										ctx.restore();
										ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));	
										
										ctx.font = "bold 10px Arial";
										ctx.fillText(counter, (_x + 15),(_y + 50));
										
										ctx.beginPath();
										ctx.moveTo(_x, (_y+40));
										ctx.lineTo((_x+55), (_y+40));
										ctx.lineWidth=2; 			
										ctx.strokeStyle='Navy';  	
										ctx.stroke();
										ctx.closePath();
									};	
							})(xt, yv, k);
							xt = xt + 55;
						}else{				
							ctx.restore();				
							ctx.font = "bold 15px Arial";
							ctx.fillText("  .................", xt,(yv + 40));
							break;
						}
					}
					
					ctx.font = "bold 15px Arial";
					ctx.fillText(arrnamearr[iarr], xv, yv-10);
					yv = yv + 100;					
					awal = 1;
				}else{
					if(arrcolnum[iarr] < 5){						
						if(measurement < (yv + (arrcolnum[iarr] * 43))){
							measurement = yv + (arrcolnum[iarr] * 43);
						}
					}else{
						if(measurement < (yv + (5 * 43))){
							measurement = yv + (5 * 43);
						}
					}
					var xt = xv;
					var k, l;	
					for(k=0;k<arrcolnum[iarr];k++){
						if(k < 8){
							for(l=0;l<arrrownum[iarr];l++){
								if(l < 5){
									//ubah background are
									ctx.fillStyle = '#fff';
									ctx.fillRect(xt,(yv + (l * 30)),40,30); 
									ctx.fillStyle = '#000';		
									ctx.strokeStyle = "Navy";
									ctx.lineWidth   = 2;
									ctx.strokeRect(xt,(yv + (l * 30)),40,30);
								}else{		
									ctx.restore();														
									ctx.font = "bold 15px Arial";
									ctx.fillText(".................", xt,(yv + (l * 30) + 15));
									break;
								}							
							}
						}else{		
							ctx.restore();											
							ctx.font = "bold 15px Arial";
							ctx.fillText(".................", (xt + 10), (yv + 10));
							break;
						}
						xt = xt + 40;
					}					
					ctx.font = "bold 15px Arial";
					ctx.fillText(arrnamearr[iarr], xv, yv-10);
					if(arrrownum[iarr] < 5){
						yv = yv + (arrrownum[iarr] * 43);	
						awal = 1;				
						//canvas.height = canvas.height + (arrcolnum[iarr] * 50);
					}else{						
						yv = yv + (5 * 43);
						awal = 1;
						//canvas.height = canvas.height + (5 * 50);
					}				
				}
				
				if(new String(arrtoken[i+6]).valueOf() == new String("number").valueOf()){
					i = i + 7;
				}else{
					i = i + 4;
				}
				
				iarr++;
			}else{
				//--------------------------------------------------------------------------
				//DEKLARASI VARIABEL DENGAN KOMA
				//--------------------------------------------------------------------------
				lastyv = yv;
				varmark = 1;
				arrmark = 0;				
				arrtype[ivar] = arrtype[ivar-1]; //untuk nama tipe dari variabel
				arrvarname[ivar] = arrlabel[i+1];// untuk nama variabel
				if(new String(arrtoken[i+2]).valueOf() == new String("operator").valueOf()){
					arrvarvalue[ivar] = arrlabel[i+3];
				}
				
				//proses penggambaran				
				//canvas.height = canvas.height + 200;
				//jika pojok sudah penuh
				if((xv + 80) > canvas.width){
					yv = yv + 80;
					
					if(yv < measurement){
						yv = measurement;
					}
					awal = 1;
					if(istack != -1){
						xv = (istack * adds) + 10;
					}else{
						xv = 10;
					}
				}else{
					xv = xv + 80;
					awal = 0;
				}
				
				if(measurement < (yv + 80)){
					measurement = yv + 80;
				}
				
				(function (_x, _y, _arrvarname, _arrvarvalue, index) {	
					var image1 = new Image();	
					image1.src = 'assets/images/box_open1.png';
					image1.onload = function () {
					   // drawVariable(xv, yv, _label, image1);	
						ctx.restore();
						ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
						var strlen = (12 - _arrvarname[index].length)/2;
						if(strlen < 0){
							strlen = 0;
						}
						var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
						ctx.font = "bold 10px Arial";
						ctx.fillText(_arrvarname[index], xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
						//cetak nilai
						if(_arrvarvalue[index] != undefined){
							ctx.fillText(_arrvarvalue[index], (_x + 20),(_y + 20));
						}
					};
				})(xv, yv, arrvarname, arrvarvalue, ivar);	
				
				if(new String(arrtoken[i+2]).valueOf() == new String("operator").valueOf()){
					i = i + 3;
				}else{
					i = i + 1;
				}
				//yv = yv + 80;
				ivar++;
			}
		}else if((procmark == 1) && (new String(arrlabel[i]).valueOf() == new String(")").valueOf())){
			//selesai deklarasi prosedur fungsi	
			if(new String(arrnameproc[iproc]).valueOf() != new String("main").valueOf()){
				lastyv = yv;
			//canvas.height = canvas.height + 500;		
				//---------------------------------------------------------------------
				//DEKLARASI PROSEDUR FUNGSI
				//---------------------------------------------------------------------
				if(new String(arrtypeproc[iproc]).valueOf() == new String("void").valueOf()){	
					if(measurement < (yv + 300)){
						measurement = yv + 300;
					}
				}else{
					if(measurement < (yv + 350)){
						measurement = yv + 350;
					}
				}
				(function (_x, _y, _arrtypeproc, _arrnameproc, _arrnumparam, _arrparamtype, _arrparamname, index) {	
					var image1 = new Image();	
					if(new String(_arrtypeproc[index]).valueOf() == new String("void").valueOf()){						
						image1.src = 'assets/images/prosedur.png';
					}else{					
						image1.src = 'assets/images/fungsi.png';
					}	
					image1.onload = function () {
						ctx.restore();			
						ctx.font = "bold 15px Arial";
						ctx.fillText("Pabrik: " + _arrnameproc[index], _x,_y);
						var status = 0;
						var xt;
						if(new String(_arrtypeproc[index]).valueOf() == new String("void").valueOf()){		
							ctx.drawImage(image1, _x, (_y + 10), image1.width, image1.height);	
							ctx.font = "bold 10px Arial";
							ctx.fillText("Bahan Baku: ", (_x + 10),(_y + 220));
							xt = _x + 60;
							status = 1;
						}else{					
							ctx.drawImage(image1, _x, _y, image1.width, image1.height);
							ctx.font = "bold 10px Arial";
							ctx.fillText("Bahan Baku: ", (_x + 90),(_y + 220));		
							ctx.font = "bold 15px Arial";
							ctx.fillText(_arrtypeproc[index], (_x + 20),(_y + 250));
							ctx.fillText(_arrtypeproc[index], (_x + 240),(_y + 90));
							xt = _x + 90;
						}						
						var k;
						for(k=0;k<_arrnumparam[index];k++){
							(function (__x, __y, __arrname, mark) {
								var image2 = new Image();	
								image2.src = 'assets/images/box_open.png';
								image2.onload = function () {
								   var ytemp;
								   if(mark == 1){
									ytemp = __y + 110;
								   }else{								   
									ytemp = __y + 150;
								   }
									var strlen = (12 - (__arrname).length)/2;
									if(strlen < 0){
										strlen = 0;
									}
									var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
									ctx.restore();		
									ctx.drawImage(image2, (__x + 15), (ytemp + 90), (image2.width/2), (image2.height/2));
									ctx.font = "bold 10px Arial";
									ctx.fillText(__arrname, xtemp,(ytemp + 100 + (((image2.height/2)*2)/3)));
								};								
							})(xt, _y, _arrparamname[index][k], status);
							//45 image box dibagi 2
							xt = xt + 45 + 5;
						}
					};
				})(xv, yv, arrtypeproc, arrnameproc, arrnumparam, arrparamtype, arrparamname, iproc);		
			
				if(new String(arrtypeproc[iproc]).valueOf() == new String("void").valueOf()){		
					yv = yv + 300;
					awal = 1;
				}else{
					yv = yv + 350;
					awal = 1;
				}
			}
			iproc++;
			procmark = 0;
			iparamproc = 0;
		}else if(new String(arrlabel[i]).valueOf() == new String(";").valueOf()){
			//----------------------------------------------------------
			//TANDA TITIK KOMA
			//----------------------------------------------------------
			lastyv = yv;
			if(varmark == 1){
				yv = yv + 80;
				awal = 1;
				if(istack != -1){
					xv = (istack * adds) + 10;
				}else{
					xv = 10;
				}
			}else if(xv > 10){
				yv = yv + 80;				
				awal = 1;
				if(istack != -1){
					xv = (istack * adds) + 10;
				}else{
					xv = 10;
				}
			}else{
				if(istack != -1){
					xv = (istack * adds) + 10;
				}else{
					xv = 10;
				}
			}
			typedefmark = 0; //penanda status tipe terstruktur
			varmark = 0; // penanda status variabel
			arrmark = 0;// penanda status array
			procmark = 0;//penanda status prosedur fungsi
			typetemp = ""; //variabel untuk menyimpan tipe sebelumnya
			
			//terkait proses penggambaran
			ctx.restore();
			
		}else if((new String(arrtoken[i]).valueOf() == new String("number").valueOf()) 
			||(new String(arrtoken[i]).valueOf() == new String("string").valueOf())){
			//--------------------------------------------------
			//NILAI DAN OPERATOR
			//--------------------------------------------------
			if(new String(arrtoken[i+1]).valueOf() == new String("operator").valueOf()){
				ctx.font = "bold 15px Arial";
				ctx.fillText(arrlabel[i], (xv+20), (yv + 40));
				ctx.font = "bold 20px Arial";
				ctx.fillText(arrlabel[i+1], (xv + 50), (yv + 40));
				i = i + 1;
			}else{	
				ctx.font = "bold 15px Arial";
				ctx.fillText(arrlabel[i], (xv+20), (yv + 40));	
			}
			xv = xv + 70;	
			awal = 0;	
		}
		else if(new String(arrtoken[i]).valueOf() == new String("variable").valueOf()){
			var idx = isThere(arrvarname, arrlabel[i]);
			if(idx != -1){
			//----------------------------------------------------------------------------
			//PEMAKAIAN VARIABEL
			//----------------------------------------------------------------------------
				lastyv = yv;
				//variabel
				
				if((xv + 80) > canvas.width){
					yv = yv + 80;
					if(yv < measurement){
						yv = measurement;
					}
					awal = 1;
					if(istack != -1){
						xv = (istack * adds) + 10;
					}else{
						xv = 10;
					}
				}
								
				if(new String(arrtoken[i+1]).valueOf() == new String("operator").valueOf()){
					if(((new String(arrtoken[i+2]).valueOf() == new String("number").valueOf()) 
						||(new String(arrtoken[i+2]).valueOf() == new String("string").valueOf()))
						&&(new String(arrlabel[i+1]).valueOf() == new String("=").valueOf())
						&&(new String(arrlabel[i+3]).valueOf() == new String(";").valueOf())){						
						//----------------------------------------------------------------------------
						//PEMAKAIAN VARIABEL - ISI NILAI
						//----------------------------------------------------------------------------
						arrvarvalue[idx] = arrlabel[i+2];
						
						if(measurement < (yv + 80)){
							measurement = yv + 80;
						}
						
						(function (_x, _y, _arrvarname, _arrvarvalue) {	
							var image1 = new Image();	
							image1.src = 'assets/images/box_open.png';
							image1.onload = function () {
							   // drawVariable(xv, yv, _label, image1);	
								ctx.restore();
								ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
								var strlen = (12 - _arrvarname.length)/2;
								if(strlen < 0){
									strlen = 0;
								}
								var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
								ctx.font = "bold 10px Arial";
								ctx.fillText(_arrvarname, xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
								//cetak nilai
								if(_arrvarvalue != undefined){
									ctx.fillText(_arrvarvalue, (_x + 20),(_y + 20));
								}
							};
						})(xv, yv, arrlabel[i], arrvarvalue[idx]);	
						i = i + 3;
					}else{								
					//----------------------------------------------------------------------------
					//PEMAKAIAN VARIABEL - OPERATOR
					//----------------------------------------------------------------------------
						if(measurement < (yv + 80)){
							measurement = yv + 80;
						}
						(function (_x, _y, _arrvarname, _arrvarvalue, index, id) {	
							var image1 = new Image();	
							image1.src = 'assets/images/box_open.png';
							image1.onload = function () {
							   // drawVariable(xv, yv, _label, image1);	
								ctx.restore();
								ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
								var strlen = (12 - _arrvarname[index].length)/2;
								if(strlen < 0){
									strlen = 0;
								}
								var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
								ctx.font = "bold 10px Arial";
								ctx.fillText(_arrvarname[index], xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));								
								ctx.font = "bold 20px Arial";
								ctx.fillText(arrlabel[id+1], (_x + 70), (_y + 40));
							};
						})(xv, yv, arrvarname, arrvarvalue, idx, i);
							
						i = i + 1;	
						
						xv = xv + 80;
						awal = 0;
					}
				}else{					
				//----------------------------------------------------------------------------
				//PEMAKAIAN VARIABEL
				//----------------------------------------------------------------------------
					if(measurement < (yv + 80)){
						measurement = yv + 80;
					}
					
					(function (_x, _y, _arrvarname, _arrvarvalue, index, id) {	
						var image1 = new Image();	
						image1.src = 'assets/images/box_open.png';
						image1.onload = function () {
						   // drawVariable(xv, yv, _label, image1);	
							ctx.restore();
							ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
							var strlen = (12 - _arrvarname[index].length)/2;
							if(strlen < 0){
								strlen = 0;
							}
							var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
							ctx.font = "bold 10px Arial";
							ctx.fillText(_arrvarname[index], xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));	
						};
					})(xv, yv, arrvarname, arrvarvalue, idx, i);
				}
				//setiap pilihan ada pertambahan i
				if(new String(arrlabel[i]).valueOf() == new String(";").valueOf()){
					yv = yv + 80;					
					awal = 1;
					if(lastyv < yv){
						lastyv = yv;
					}
				}
			}else{
				lastyv = yv;
				idx = isThere(arrnamearr, arrlabel[i]);
				if(idx != -1){								
					//----------------------------------------------------------------------------
					//PEMAKAIAN ARRAY
					//----------------------------------------------------------------------------
					if(arrcolnum[idx] == undefined){													
						//----------------------------------------------------------------------------
						//PEMAKAIAN ARRAY - SATU DIMENSI
						//----------------------------------------------------------------------------
						/*if(measurement < (yv + 80)){
							measurement = yv + 80;
						}*/
						if((xv + 80) > canvas.width){
							yv = yv + 80;
							if(yv < measurement){
								yv = measurement;
							}
							awal = 1;
							if(istack != -1){
								xv = (istack * adds) + 10;
							}else{
								xv = 10;
							}
						}
						(function (_x, _y, str, num, id) {	
							var image1 = new Image();	
							image1.src = 'assets/images/box_open.png';
							image1.onload = function () {
							   // drawVariable(xv, yv, _label, image1);
								ctx.restore();
								ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
								var strlen = (12 - (str.length + 4))/2;
								if(strlen < 0){
									strlen = 0;
								}
								var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
								ctx.font = "bold 10px Arial";
								ctx.fillText(str + "[" + num + "]", xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
								if(new String(arrtoken[id+4]).valueOf() == new String("operator").valueOf()){
									if(((new String(arrtoken[id+5]).valueOf() == new String("number").valueOf()) 
										||(new String(arrtoken[id+5]).valueOf() == new String("string").valueOf()))
										&&(new String(arrlabel[id+4]).valueOf() == new String("=").valueOf())){
										//mengisi array
										ctx.fillText(arrlabel[id+5], (_x + 20),(_y + 20));
									}else{
										//tulis operator
										ctx.font = "bold 20px Arial";
										ctx.fillText(arrlabel[id+4], (_x + 70), (_y + 40));
									}
								}
							};
						})(xv, yv, arrlabel[i], arrlabel[i+2], i);	
						if(new String(arrtoken[i+4]).valueOf() == new String("operator").valueOf()){
							if(((new String(arrtoken[i+5]).valueOf() == new String("number").valueOf()) 
								||(new String(arrtoken[i+5]).valueOf() == new String("string").valueOf()))
								&&(new String(arrlabel[i+4]).valueOf() == new String("=").valueOf())){
								//mengisi array
								i = i + 5;
							}else{
								//tulis operator
								i = i + 4;
							}
						}	
						
						if(new String(arrlabel[i+1]).valueOf() == new String(";").valueOf()){							
							if(measurement < (yv + 80)){
								measurement = yv + 80;
							}
							yv = yv + 80;						
							awal = 1;
						}else{
							awal = 0;
							xv = xv + 100;
						}
					}else{													
						//----------------------------------------------------------------------------
						//PEMAKAIAN ARRAY - DUA DIMENSI
						//----------------------------------------------------------------------------
						if((xv + 80) > canvas.width){
							yv = yv + 80;
							awal = 1;
							if(istack != -1){
								xv = (istack * adds) + 10;
							}else{
								xv = 10;
							}
						}
						ctx.fillStyle = '#fff';
						ctx.fillRect(xv, yv, 40, 30); 
						ctx.fillStyle = '#000';		
						ctx.strokeStyle = "Navy";
						ctx.lineWidth   = 2;
						ctx.strokeRect(xv, yv, 40, 30);	
						ctx.font = "bold 10px Arial";									
						ctx.fillText(arrlabel[i] + "[" + arrlabel[i+2] + "][" + arrlabel[i+5] + "]", xv, yv+45);
						if(new String(arrtoken[i+7]).valueOf() == new String("operator").valueOf()){
							if(((new String(arrtoken[i+8]).valueOf() == new String("number").valueOf()) 
								||(new String(arrtoken[i+8]).valueOf() == new String("string").valueOf()))
								&&(new String(arrlabel[i+7]).valueOf() == new String("=").valueOf())){							
								//----------------------------------------------------------------------------
								//PEMAKAIAN ARRAY - MENGISI ARRAY
								//----------------------------------------------------------------------------
								//mengisi array
								ctx.font = "bold 10px Arial";
								ctx.fillText(arrlabel[i+8], (xv + 10),(yv + 20));
								i = i + 8;
							}else{															
								//----------------------------------------------------------------------------
								//PEMAKAIAN ARRAY - OPERATOR
								//----------------------------------------------------------------------------
								//tulis operator
								ctx.font = "bold 20px Arial";
								ctx.fillText(arrlabel[i+7], (xv + 55), (yv + 20));
								i = i + 7;
							}
						}
						if(new String(arrlabel[i+1]).valueOf() == new String(";").valueOf()){							
							if(measurement < (yv + 80)){
								measurement = yv + 80;
							}
							yv = yv + 80;						
							awal = 1;
						}else{
							awal = 0;
							xv = xv + 80;
						}
					}
				}else{
					idx = isThere(arrstruct, arrlabel[i]);
					if(idx != -1){
						//typedef struct
						//deklarasi variable typedef struct	
						if(new String(arrtoken[i+1]).valueOf() == new String("variable").valueOf()){
							if(new String(arrlabel[i+2]).valueOf() != new String("[").valueOf()){						
								//----------------------------------------------------------------------------
								//DEKLARASI VARIABEL TYPEDEF STRUCT
								//----------------------------------------------------------------------------
								if(arrstructvartype[istructvar] == undefined){	
									arrstructvarvalue[istructvar] = [];
								}
								
								arrstructvartype[istructvar] = arrlabel[i];
								arrstructvarname[istructvar] = arrlabel[i+1];
								
								if(measurement < (yv + 240)){
									measurement = yv + 240;
								}
								
								(function (_x, _y, structname, structvarname, _arrstructcontent) {
									var image1 = new Image();	
									image1.src = 'assets/images/bungkusanjadi3.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);	
										ctx.restore();
										ctx.drawImage(image1, _x, _y, image1.width, image1.height);
										var strlen = (22 - structname.length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = _x + (image1.width/22) * strlen;
										ctx.font = "bold 15px Arial";
										ctx.fillText("jenis: " + structname, (_x + 20), (_y + 35));
										ctx.fillText("bernama: " + structvarname, (_x + 25), (_y + 80));
										var k; 
										var xt = _x;
										for(k=0;k<_arrstructcontent.length;k++){
											if((k%3 == 0) && (k > 0)){
												_y = _y + 50;
												xt = _x;
											}
											if(k < 6){		
												(function (__x, __y, __arrname) {
													var image2 = new Image();	
													image2.src = 'assets/images/box_open.png';
													image2.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
														var strlen = (12 - (__arrname).length)/2;
														if(strlen < 0){
															strlen = 0;
														}
														var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
														ctx.font = "bold 10px Arial";
														ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
													};								
												})(xt, _y, _arrstructcontent[k]);		
												//45 image box dibagi 2
												xt = xt + 45 + 5;
											}else{
												var xtemp = xt + 45;
												ctx.font = "bold 15px Arial";
												ctx.fillText(".................", xtemp,(_y + 95));
												break;
											}
										}
									};
								})(xv, yv, arrstruct[idx], arrstructvarname[istructvar], arrstructnamecontent[idx]);	
								//_x, _y, _arrstructname, _arrstructvarname, _arrstructvarvalue, index, arrstructcontent
								i = i + 1;
								yv = yv + 240;		
								awal = 1;	
								istructvar++;
							}else{
								if(new String(arrlabel[i+5]).valueOf() != new String("[").valueOf()){
									//array terstruktur satu dimensi													
									//----------------------------------------------------------------------------
									//DEKLARASI VARIABEL TYPEDEF STRUCT - ARRAY SATU DIMENSI
									//----------------------------------------------------------------------------
									if(arrstructvartype[istructvar] == undefined){	
										arrstructvarvalue[istructvar] = [];
									}
								
									if(measurement < (yv + 120)){
										measurement = yv + 120;
									}
									
									arrstructvartype[istructvar] = arrlabel[i];
									arrstructvarname[istructvar] = arrlabel[i+1];
									arrstructvarrow[istructvar] = arrlabel[i+3];
									var xt = xv;
									var k;
									for(k=0;k<arrstructvarrow[istructvar];k++){
										if(k<8){
											(function (_x, _y, counter) {	
													var image1 = new Image();	
													image1.src = 'assets/images/bungkusanjadi3.png';
													image1.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image1, _x, _y, ((image1.width)/3), ((image1.height)/3));	
														
														ctx.font = "bold 10px Arial";
														ctx.fillText(counter, (_x + 15),(_y + 75));
														
														ctx.beginPath();
														ctx.moveTo(_x, (_y+25));
														ctx.lineTo((_x+55), (_y+25));
														ctx.lineWidth=3; 			
														ctx.strokeStyle='Navy';  	
														ctx.stroke();
														ctx.closePath();
													};	
											})(xt, yv, k);
											xt = xt + 55;
										}else{				
											ctx.restore();				
											ctx.font = "bold 15px Arial";
											ctx.fillText("  .................", xt,(yv + 40));
											break;
										}
									}
									
									ctx.font = "bold 15px Arial";
									ctx.fillText(arrstructvarname[istructvar], xv, yv-10);										
									
									i = i + 5;
									yv = yv + 120;		
									awal = 1;	
									istructvar++;
								}else{
									//array terstruktur dua dimensi											
									//----------------------------------------------------------------------------
									//DEKLARASI VARIABEL TYPEDEF STRUCT - ARRAY DUA DIMENSI
									//----------------------------------------------------------------------------									
									if(arrstructvartype[istructvar] == undefined){	
										arrstructvarvalue[istructvar] = [];
									}
									
									arrstructvartype[istructvar] = arrlabel[i];
									arrstructvarname[istructvar] = arrlabel[i+1];
									arrstructvarrow[istructvar] = arrlabel[i+3];
									arrstructvarcol[istructvar] = arrlabel[i+6];
									
									if(arrstructvarrow[istructvar] < 5){
										if(measurement < (yv + (arrstructvarrow[istructvar] * 30) + 20)){
											measurement = yv + (arrstructvarrow[istructvar] * 30) + 20;
										}
									}else{						
										if(measurement < (yv + (7 * 30))){
											measurement = yv + (7 * 30);
										}
									}	
									var xt = xv;
									var k, l;	
									for(k=0;k<arrstructvarcol[istructvar];k++){
										if(k < 8){
											for(l=0;l<arrstructvarrow[istructvar];l++){
												if(l < 5){
													//ubah background are
													ctx.fillStyle = '#fff';
													ctx.fillRect(xt,(yv + (l * 30)),40,30); 
													ctx.fillStyle = '#000';		
													ctx.strokeStyle = "Navy";
												    ctx.lineWidth   = 2;
												    ctx.strokeRect(xt,(yv + (l * 30)),40,30);
													(function (_x, _y) {	
															var image1 = new Image();	
															image1.src = 'assets/images/bungkusanjadi3.png';
															image1.onload = function () {
															   // drawVariable(xv, yv, _label, image1);	
																ctx.restore();
																ctx.drawImage(image1, (_x+5), _y, ((image1.width)/6), ((image1.height)/6));								
															};	
													})(xt, (yv + (l * 30)));
												}else{		
													ctx.restore();														
													ctx.font = "bold 15px Arial";
													ctx.fillText(".................", xt,(yv + (l * 30) + 15));
													break;
												}							
											}
										}else{		
											ctx.restore();											
											ctx.font = "bold 15px Arial";
											ctx.fillText(".................", (xt + 10), (yv + 10));
											break;
										}
										xt = xt + 40;
									}					
									ctx.font = "bold 15px Arial";
									ctx.fillText(arrstructvarname[istructvar], xv, yv-10);
									if(arrstructvarrow[istructvar] < 5){
										yv = yv + (arrstructvarrow[istructvar] * 30) + 20;	
										awal = 1;		
										//canvas.height = canvas.height + (arrcolnum[iarr] * 50);
									}else{						
										yv = yv + (5 * 30);	
										awal = 1;
										//canvas.height = canvas.height + (5 * 50);
									}			
									i = i + 8;
									istructvar++;
								}
							}
						}						
					}else{
						var idx2 = isThere(arrstructvarname, arrlabel[i]);
						if(idx2 != -1){
							//mengisi typedef struct	
							idx = isThere(arrstruct, arrstructvartype[idx2]);
							if((new String(arrlabel[i+1]).valueOf() == new String(".").valueOf()) 
							&& (new String(arrlabel[i+3]).valueOf() == new String("=").valueOf())
							&& ((new String(arrtoken[i+4]).valueOf() == new String("number").valueOf()) 
							|| (new String(arrtoken[i+4]).valueOf() == new String("string").valueOf()))){
																								
							//----------------------------------------------------------------------------
							//PEMAKAIAN VARIABEL TYPEDEF STRUCT - MENGISI
							//----------------------------------------------------------------------------
								var id = isThere(arrstructnamecontent[idx], arrlabel[i+2]);
								arrstructvarvalue[idx2][id] = arrlabel[i+4];	
								
								if(measurement < (yv + 240)){
									measurement = yv + 240;
								}
								
								(function (_x, _y, structname, structvarname, _arrstructvarvalue, _arrstructcontent) {
									var image1 = new Image();	
									image1.src = 'assets/images/bungkusanjadi.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);	
										ctx.restore();
										ctx.drawImage(image1, _x, _y, image1.width, image1.height);
										var strlen = (22 - structname.length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = _x + (image1.width/22) * strlen;
										ctx.font = "bold 15px Arial";
										ctx.fillText("jenis: " + structname, (_x + 20), (_y + 35));
										ctx.fillText("bernama: " + structvarname, (_x + 25), (_y + 80));
										
										var k; 
										var xt = _x;
										for(k=0;k<_arrstructcontent.length;k++){
											if((k%3 == 0) && (k > 0)){
												_y = _y + 50;
												xt = _x;
											}
											if(k < 6){													
												(function (__x, __y, __arrname, _value) {
													if(new String(arrlabel[i+2]).valueOf() != new String(__arrname).valueOf()){
														var image2 = new Image();			
														image2.src = 'assets/images/box_open.png';												
														image2.onload = function () {
														   // drawVariable(xv, yv, _label, image1);	
															ctx.restore();
															ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
															if(_value != undefined){
																ctx.font = "bold 10px Arial";
																ctx.fillText(_value, (__x + 30) ,(__y + 105));
															}
															var strlen = (12 - (__arrname).length)/2;
															if(strlen < 0){
																strlen = 0;
															}
															var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
															ctx.font = "bold 10px Arial";
															ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
														};		
													}						
												})(xt, _y, _arrstructcontent[k], _arrstructvarvalue[k]);
												//45 image box dibagi 2
												xt = xt + 45 + 5;
											}else{
												var xtemp = xt + 45;
												ctx.font = "bold 15px Arial";
												ctx.fillText(".................", xtemp,(_y + 95));
												break;
											}
										}							
									};	
								})(xv, yv, arrstruct[idx], arrstructvarname[idx2], arrstructvarvalue[idx2], arrstructnamecontent[idx]);														
								var k; 
								var xt = xv;
								var yt = yv;
								for(k=0;k<arrstructnamecontent[idx].length;k++){	
									if((k%3 == 0) && (k > 0)){
										yt = yt + 50;
										xt = xv;
									}
									if(k < 6){													
										(function (__x, __y, __arrname, _value) {
											if(new String(arrlabel[i+2]).valueOf() == new String(__arrname).valueOf()){
												var image2 = new Image();	
												image2.src = 'assets/images/box_open2.png';
												
												image2.onload = function () {
												   // drawVariable(xv, yv, _label, image1);	
													ctx.restore();
													ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
													if(_value != undefined){
														ctx.font = "bold 10px Arial";
														ctx.fillText(_value, (__x + 30) ,(__y + 105));
													}
													var strlen = (12 - (__arrname).length)/2;
													if(strlen < 0){
														strlen = 0;
													}
													var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
													ctx.font = "bold 10px Arial";
													ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
												};
											}	
										})(xt, yt, arrstructnamecontent[idx][k], arrstructvarvalue[idx2][k]);
										//45 image box dibagi 2
										xt = xt + 45 + 5;
									}
								}
								
								//_x, _y, _arrstructname, _arrstructvarname, _arrstructvarvalue, index, arrstructcontent
								i = i + 4;
								yv = yv + 150;									
								awal = 1;
								if(new String(arrtoken[i+5]).valueOf() != new String(";").valueOf()){
									xv = xv + 100;
									awal = 0;
								}
							}else if(new String(arrlabel[i+1]).valueOf() == new String(".").valueOf()){		
								//jika setelah bungkusan adalah operator							
							//----------------------------------------------------------------------------
							//PEMAKAIAN VARIABEL TYPEDEF STRUCT - OPERATOR
							//----------------------------------------------------------------------------
								if((xv + 200) > canvas.width){
									awal = 1;
									lastyv = yv;
									yv = measurement;
									if(istack != -1){
										xv = (istack * adds) + 10;
									}else{
										xv = 10;
									}
								}
								
								if(measurement < (yv + 240)){
									measurement = yv + 240;
								}
								(function (_x, _y, structname, structvarname, _arrstructvarvalue, _arrstructcontent) {	
									var image1 = new Image();	
									image1.src = 'assets/images/bungkusanjadi.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);	
										ctx.restore();
										ctx.drawImage(image1, _x, _y, image1.width, image1.height);
										var strlen = (22 - structname.length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = _x + (image1.width/22) * strlen;
										ctx.font = "bold 15px Arial";
										ctx.fillText("jenis: " + structname, (_x + 20), (_y + 35));
										ctx.fillText("bernama: " + structvarname, (_x + 25), (_y + 80));
										
										var k; 
										var xt = _x;
										for(k=0;k<_arrstructcontent.length;k++){
											if((k%3 == 0) && (k > 0)){
												_y = _y + 50;
												xt = _x;
											}
											if(k < 6){													
												(function (__x, __y, __arrname, _value) {
													if(new String(arrlabel[i+2]).valueOf() != new String(__arrname).valueOf()){
														var image2 = new Image();			
														image2.src = 'assets/images/box_open.png';													
														image2.onload = function () {
														   // drawVariable(xv, yv, _label, image1);	
															ctx.restore();
															ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
															if(_value != undefined){
																ctx.font = "bold 10px Arial";
																ctx.fillText(_value, (__x + 30) ,(__y + 105));
															}
															var strlen = (12 - (__arrname).length)/2;
															if(strlen < 0){
																strlen = 0;
															}
															var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
															ctx.font = "bold 10px Arial";
															ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
														};	
													}							
												})(xt, _y, _arrstructcontent[k], _arrstructvarvalue[k]);
												//45 image box dibagi 2
												xt = xt + 45 + 5;
											}else{
												var xtemp = xt + 45;
												ctx.font = "bold 15px Arial";
												ctx.fillText(".................", xtemp,(_y + 95));
												break;
											}
										}
									};											
								})(xv, yv, arrstruct[idx], arrstructvarname[idx2], arrstructvarvalue[idx2], arrstructnamecontent[idx]);	
																	
								
								if(new String(arrtoken[i+3]).valueOf() == new String("operator").valueOf()){
									ctx.font = "bold 20px Arial";
									ctx.fillText(arrlabel[i+3], (xv + 190),(yv + 125));
								}
								var k; 
								var xt = xv;
								var yt = yv;
								for(k=0;k<arrstructnamecontent[idx].length;k++){
									if((k%3 == 0) && (k > 0)){
										yt = yt + 50;
										xt = xv;
									}
									if(k < 6){													
										(function (__x, __y, __arrname, _value) {
											if(new String(arrlabel[i+2]).valueOf() == new String(__arrname).valueOf()){
												var image2 = new Image();	
												image2.src = 'assets/images/box_open2.png';
												
												image2.onload = function () {
												   // drawVariable(xv, yv, _label, image1);	
													ctx.restore();
													ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
													if(_value != undefined){
														ctx.font = "bold 10px Arial";
														ctx.fillText(_value, (__x + 30) ,(__y + 105));
													}
													var strlen = (12 - (__arrname).length)/2;
													if(strlen < 0){
														strlen = 0;
													}
													var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
													ctx.font = "bold 10px Arial";
													ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
												};
											}	
										})(xt, yt, arrstructnamecontent[idx][k], arrstructvarvalue[idx2][k]);	
										//45 image box dibagi 2
										xt = xt + 45 + 5;
									}
								}
								//_x, _y, _arrstructname, _arrstructvarname, _arrstructvarvalue, index, arrstructcontent
								
								if((new String(arrlabel[i+3]).valueOf() == new String(";").valueOf())){
									yv = yv + 240;										
									awal = 1;
									if(istack != -1){
										xv = (istack * adds) + 10;
									}else{
										xv = 10;
									}
									i = i + 3;
								}else if(new String(arrlabel[i+5]).valueOf() != new String(";").valueOf()){
									if((xv + 200) < canvas.width){
										xv = xv + 200;
										awal = 0;
									}else{
										yv = yv + 240;	
										awal = 1;
										if(istack != -1){
											xv = (istack * adds) + 10;
										}else{
											xv = 10;
										}
									}
									i = i + 3;								
								}else if(new String(arrtoken[i+3]).valueOf() == new String("operator").valueOf()){
									if((xv + 200) < canvas.width){
										xv = xv + 200;
										awal = 0;
									}else{
										yv = yv + 240;	
										awal = 1;
										if(istack != -1){
											xv = (istack * adds) + 10;
										}else{
											xv = 10;
										}
									}
									i = i + 3;
								}else{
									yv = yv + 240;										
									awal = 1;
									if(istack != -1){
										xv = (istack * adds) + 10;
									}else{
										xv = 10;
									}
									i = i + 3;
								}			
							}else if(new String(arrlabel[i+1]).valueOf() == new String("[").valueOf()){	
								//jika array terstruktur menjadi peran variabel						
								lastyv = yv;
															
								if(measurement < (yv + 130)){
									measurement = yv + 130;
								}
								//array terstruktur
								if(arrstructvarcol[idx2] == undefined){																
								//----------------------------------------------------------------------------
								//PEMAKAIAN VARIABEL TYPEDEF STRUCT - ARRAY SATU DIMENSI
								//----------------------------------------------------------------------------
									/*if(measurement < (yv + 80)){
										measurement = yv + 80;
									}*/
									if((xv + 80) > canvas.width){
										yv = yv + 100;
										
										if(yv < measurement){
											yv = measurement;
										}
										awal = 1;
										if(istack != -1){
											xv = (istack * adds) + 10;
										}else{
											xv = 10;
										}
									}
									(function (_x, _y, str, num, id, _value, _name, _jenis) {	
										var image1 = new Image();	
										image1.src = 'assets/images/bungkusanjadi.png';
										image1.onload = function () {
										   // drawVariable(xv, yv, _label, image1);
											ctx.restore();
											ctx.drawImage(image1, _x, _y, (image1.width/2), (image1.height/2));											
											ctx.font = "bold 10px Arial";
											ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 20));
											ctx.fillText(str + "[" + num + "]", _x,(_y + 105));
											if(new String(arrtoken[id+6]).valueOf() == new String("operator").valueOf()){
												if(((new String(arrtoken[id+7]).valueOf() == new String("number").valueOf()) 
													||(new String(arrtoken[id+7]).valueOf() == new String("string").valueOf()))
													&&(new String(arrlabel[id+6]).valueOf() == new String("=").valueOf())){
													//mengisi array
													//ctx.fillText(arrlabel[id+5], (_x + 20),(_y + 20));
												}else{
													//tulis operator
													ctx.font = "bold 20px Arial";
													ctx.fillText(arrlabel[id+6], (_x + 95), (_y + 50));
												}
											}
										};
										
										var image2 = new Image();	
										image2.src = 'assets/images/box_open2.png';
										
										image2.onload = function () {
										   // drawVariable(xv, yv, _label, image1);	
											ctx.restore();
											ctx.drawImage(image2, (_x + 10), (_y + 40), (image2.width/2), (image2.height/2));	
											if(_value != undefined){
												ctx.font = "bold 10px Arial";
												ctx.fillText(_value, (_x + 25) ,(_y + 55));
											}
											var strlen = (10 - (_name).length)/2;
											if(strlen < 0){
												strlen = 0;
											}
											var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
											ctx.font = "bold 10px Arial";
											ctx.fillText(_name, xtemp,(_y + 50 + (((image2.height/2)*2)/3)));
										};
									})(xv, yv, arrlabel[i], arrlabel[i+2], i, arrlabel[i+7], arrlabel[i+5], arrstructvartype[idx2]);	
									
									if(new String(arrtoken[i+6]).valueOf() == new String("operator").valueOf()){
										if(((new String(arrtoken[i+7]).valueOf() == new String("number").valueOf()) 
											||(new String(arrtoken[i+7]).valueOf() == new String("string").valueOf()))
											&&(new String(arrlabel[i+6]).valueOf() == new String("=").valueOf())){
											//mengisi array
											i = i + 7;
										}else{
											//tulis operator
											i = i + 6;
										}
									}	
									
									if(new String(arrlabel[i+1]).valueOf() == new String(";").valueOf()){
										yv = yv + 130;	
										awal = 1;
									}else{
										awal = 0;
										xv = xv + 100;
									}
								}else{																		
								//----------------------------------------------------------------------------
								//PEMAKAIAN VARIABEL TYPEDEF STRUCT - ARRAY DUA DIMENSI
								//----------------------------------------------------------------------------
									if((xv + 80) > canvas.width){
										yv = yv + 130;
										
										if(yv < measurement){
											yv = measurement;
										}
										awal = 1;
										if(istack != -1){
											xv = (istack * adds) + 10;
										}else{
											xv = 10;
										}
									}
									ctx.fillStyle = '#fff';
									ctx.fillRect(xv, yv, 100, 90); 
									ctx.fillStyle = '#000';		
									ctx.strokeStyle = "Navy";
									ctx.lineWidth   = 2;
									ctx.strokeRect(xv, yv, 100, 90);	
									ctx.font = "bold 10px Arial";									
									ctx.fillText(arrlabel[i] + "[" + arrlabel[i+2] + "][" + arrlabel[i+5] + "]", xv, yv+105);
									
									if(new String(arrtoken[i+9]).valueOf() == new String("operator").valueOf()){	
										var value = undefined;
										
										if(((new String(arrtoken[i+10]).valueOf() == new String("number").valueOf()) 
											||(new String(arrtoken[i+10]).valueOf() == new String("string").valueOf()))
											&&(new String(arrlabel[i+9]).valueOf() == new String("=").valueOf())
											&&(new String(arrlabel[i+11]).valueOf() == new String(";").valueOf())){
											value = arrlabel[i+10];
										}
										
										(function (_x, _y, id, _value, _name, _jenis) {	
											var image1 = new Image();	
											image1.src = 'assets/images/bungkusanjadi.png';
											image1.onload = function () {
											   // drawVariable(xv, yv, _label, image1);
												ctx.restore();
												ctx.drawImage(image1, _x, _y, (image1.width/2), (image1.height/2));											
												ctx.font = "bold 10px Arial";
												ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 20));
											};
											
											var image2 = new Image();	
											image2.src = 'assets/images/box_open2.png';
											
											image2.onload = function () {
											   // drawVariable(xv, yv, _label, image1);	
												ctx.restore();
												ctx.drawImage(image2, (_x + 10), (_y + 40), (image2.width/2), (image2.height/2));	
												if(_value != undefined){
													ctx.font = "bold 10px Arial";
													ctx.fillText(_value, (_x + 25) ,(_y + 55));
												}
												var strlen = (10 - (_name).length)/2;
												if(strlen < 0){
													strlen = 0;
												}
												var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
												ctx.font = "bold 10px Arial";
												ctx.fillText(_name, xtemp,(_y + 50 + (((image2.height/2)*2)/3)));
											};
										})(xv, yv, i, value, arrlabel[i+8], arrstructvartype[idx2]);	
										
										if(((new String(arrtoken[i+10]).valueOf() == new String("number").valueOf()) 
											||(new String(arrtoken[i+10]).valueOf() == new String("string").valueOf()))
											&&(new String(arrlabel[i+9]).valueOf() == new String("=").valueOf())){
											//mengisi array
											//ctx.font = "bold 10px Arial";
											//ctx.fillText(arrlabel[i+10], (xv + 10),(yv + 20));
											i = i + 10;
										}else{
											//tulis operator
											ctx.font = "bold 20px Arial";
											ctx.fillText(arrlabel[i+9], (xv + 120), (yv + 50));
											i = i + 9;
										}
									}
									if(new String(arrlabel[i+1]).valueOf() == new String(";").valueOf()){							
										if(measurement < (yv + 130)){
											measurement = yv + 130;
										}
										yv = yv + 130;						
										awal = 1;
									}else{
										awal = 0;
										xv = xv + 150;
									}
								}						
							}
						}					
					}
				}
			}
		}
		//----------------------------------------------------------------------------------------------------
		//   untuk token keyword
		//----------------------------------------------------------------------------------------------------
		else if(new String(arrlabel[i]).valueOf() == new String("scanf").valueOf()){
			//jika scanf nya banyak variabel			
			lastyv = yv;
			var c = i + 1;
			var status = 0;
			while((c < arrtoken.length) && (status == 0)){
				if(new String(arrlabel[c]).valueOf() == new String(",").valueOf()){
					status = 1;
					c++;
				}else if((new String(arrlabel[c]).valueOf() == new String(")").valueOf())
				|| (new String(arrlabel[c]).valueOf() == new String(";").valueOf())){
					status = 3;
				}else{
					c++;
				}
			}	
			
			var c2 = c;
			var status2 = 0;
			while((c2 < arrtoken.length) && (status2 == 0)){
				if(new String(arrlabel[c2]).valueOf() == new String(",").valueOf()){
					status2 = 1;
					c2++;
				}else if((new String(arrlabel[c2]).valueOf() == new String(")").valueOf())
				|| (new String(arrlabel[c2]).valueOf() == new String(";").valueOf())){
					status2 = 3;
				}else{
					c2++;
				}
			}
			
			yv = yv + 10; 			
			if(measurement < (yv + 140)){
				measurement = yv + 140;
			}			

			if((status == 1) || (status == 2)){		
				(function (_x, _y) {
					var image1 = new Image();	
					image1.src = 'assets/images/smile.png';
					image1.onload = function () {
						ctx.restore();		
						ctx.drawImage(image1, _x, (_y+5), (image1.width/2), (image1.height/2));			
					};					
						
					var image2 = new Image();	
					image2.src = 'assets/images/panah.png';
					image2.onload = function () {
						ctx.restore();			
						ctx.drawImage(image2, (_x+20), (_y-40), (image2.width/2), (image2.height/2));			
					};	
					
				})(xv, yv);
			}			
			
			var status3 = 0;
			if(status2 == 3){
													
				//----------------------------------------------------------------------------
				//SCANF UNTUK ARRAY SATU PEMAKAIAN
				//----------------------------------------------------------------------------
				if(isThere(arrnamearr, arrlabel[i+5]) != -1){
					var idx = isThere(arrnamearr, arrlabel[i+5]);	
					if(arrcolnum[idx] == undefined){
						//----------------------------------------------------------------------------
						//SCANF UNTUK ARRAY SATU PEMAKAIAN - ARRAY SATU DIMENSI
						//----------------------------------------------------------------------------
						//array 1 dimensi					
						(function (_x, _y, str, num, idxisi) {
							var xt = xv + 70;
							var k;
							for(k=0;k<num;k++){
								if(k<7){
									(function (_x, _y, counter) {	
											var image1 = new Image();
											if(k == idxisi){
												image1.src = 'assets/images/box_open2.png';
											}else{
												image1.src = 'assets/images/box_open.png';
											}
											image1.onload = function () {
											   // drawVariable(xv, yv, _label, image1);	
												ctx.restore();
												ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));	
												
												ctx.font = "bold 10px Arial";
												ctx.fillText(counter, (_x + 15),(_y + 50));
												
												ctx.beginPath();
												ctx.moveTo(_x, (_y+40));
												ctx.lineTo((_x+55), (_y+40));
												ctx.lineWidth=2; 			
												ctx.strokeStyle='Navy';  	
												ctx.stroke();
												ctx.closePath();
											};	
									})(xt, yv, k);
									xt = xt + 55;
								}else{				
									ctx.restore();				
									ctx.font = "bold 15px Arial";
									ctx.fillText("  .................", xt,(yv + 40));
									break;
								}
							}
						})(xv, yv, arrlabel[i+5], arrrownum[idx], arrlabel[i+7]);
						i = i + 7;
					}else{						
						//----------------------------------------------------------------------------
						//SCANF UNTUK ARRAY SATU PEMAKAIAN - ARRAY DUA DIMENSI
						//----------------------------------------------------------------------------
						//array 2 dimensi						
						var xt = xv + 70;
						yv = yv + 10;
						var k, l;	
						for(k=0;k<arrcolnum[idx];k++){
							if(k < 8){
								for(l=0;l<arrrownum[idx];l++){
									if(l < 5){
										//ubah background are
										if((l == arrlabel[i+7]) && (k == arrlabel[i+10])){
											ctx.fillStyle = '#f00';
										}else{
											ctx.fillStyle = '#fff';
										}
										ctx.fillRect(xt,(yv + (l * 30)),40,30); 
										ctx.fillStyle = '#000';		
										ctx.strokeStyle = "Navy";
										ctx.lineWidth   = 2;
										ctx.strokeRect(xt,(yv + (l * 30)),40,30);
									}else{		
										ctx.restore();														
										ctx.font = "bold 15px Arial";
										ctx.fillText(".................", xt,(yv + (l * 30) + 15));
										break;
									}							
								}
							}else{		
								ctx.restore();											
								ctx.font = "bold 15px Arial";
								ctx.fillText(".................", (xt + 10), (yv + 10));
								break;
							}
							xt = xt + 40;
						}
						if(arrrownum[idx] < 5){
							yv = yv + (arrrownum[idx] * 45);
							awal = 1;			
							//canvas.height = canvas.height + (arrcolnum[iarr] * 50);
						}else{						
							yv = yv + (5 * 45);
							awal = 1;
							//canvas.height = canvas.height + (5 * 50);
						}
						i = i + 10;
					}
					status3 = 1;
				}
			}
			
			if((status == 1) && (status3 == 0)){	
				//xv = xv + 70;
				//awal = 0;				
				status = 0;
				c2 = 0;
				var xmeasurement = 70;
				while((c < arrtoken.length) && (status == 0)){
					if((new String(arrlabel[c]).valueOf() == new String(")").valueOf())
					|| (new String(arrlabel[c]).valueOf() == new String(";").valueOf())){
						status = 1;	
						yv = measurement;		
						if(istack != -1){
							xv = (istack * adds) + 10;
						}else{
							xv = 10;
						}
						awal = 1;	
					}else{
						if((new String(arrlabel[c]).valueOf() != new String(",").valueOf())
							&&(new String(arrlabel[c]).valueOf() != new String("&").valueOf())){
							var idx = isThere(arrvarname, arrlabel[c]);
							if(idx != -1){							
							//----------------------------------------------------------------------------
							//SCANF UNTUK VARIABEL
							//----------------------------------------------------------------------------
								//variabel								
								if((xv + 70) > canvas.width){
									yv = yv + 60;
									
									if(yv < measurement){
										yv = measurement;
									}
									awal = 1;
									if(istack != -1){
										xv = (istack * adds) + 70;
									}else{
										xv = 70;
									}
								}else{
									xv = xv + 70;
									awal = 0;
									if(xv < xmeasurement){
										xv = xmeasurement
									}
									
									xmeasurement = xv + 70;
								}
								(function (_x, _y, str) {
									var image1 = new Image();	
									image1.src = 'assets/images/box_open.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);
										ctx.restore();
										ctx.drawImage(image1, _x, (_y), ((image1.width*2)/3), ((image1.height*2)/3));
										var strlen = (12 - str.length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
										ctx.font = "bold 10px Arial";
										ctx.fillText(str, xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
									};
								})(xv, yv, arrlabel[c]);									
							}else{
								idx = isThere(arrnamearr, arrlabel[c]);
								if(idx != -1){
									//array									
									if(arrcolnum[idx] == undefined){														
									//----------------------------------------------------------------------------
									//SCANF UNTUK ARRAY SATU DIMENSI
									//----------------------------------------------------------------------------
										if((xv + 80) > canvas.width){
											yv = yv + 80;
											
											if(yv < measurement){
												yv = measurement;
											}
											awal = 1;
											if(istack != -1){
												xv = (istack * adds) + 70;
											}else{
												xv = 70;
											}
										}else{
											xv = xv + 70;										
											awal = 0;
											if(xv < xmeasurement){
												xv = xmeasurement
											}
											xmeasurement = xv + 70;
										}
										(function (_x, _y, str, num) {
											var image1 = new Image();	
											image1.src = 'assets/images/box_open.png';
											image1.onload = function () {
											   // drawVariable(xv, yv, _label, image1);
												ctx.restore();
												ctx.drawImage(image1, _x, _y, ((image1.width*2)/3), ((image1.height*2)/3));
												var strlen = (12 - (str.length + 4))/2;
												if(strlen < 0){
													strlen = 0;
												}
												var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
												ctx.font = "bold 10px Arial";
												ctx.fillText(str + "[" + num + "]", xtemp,(_y + 10 + ((((image1.height*2)/3)*2)/3)));
											};
										})(xv, yv, arrlabel[c], arrlabel[c+2]);	
										c = c + 2;	
										c2++;
									}else{														
										//----------------------------------------------------------------------------
										//SCANF UNTUK ARRAY DUA DIMENSI
										//----------------------------------------------------------------------------
										if((xv + 80) > canvas.width){
											yv = yv + 80;
											
											if(yv < measurement){
												yv = measurement;
											}
											awal = 1;
											if(istack != -1){
												xv = (istack * adds) + 70;
											}else{
												xv = 70;
											}
										}else{
											xv = xv + 80;										
											awal = 0;
											
											if(xv < xmeasurement){
												xv = xmeasurement
											}
											xmeasurement = xv + 80;											
										}
										ctx.fillStyle = '#fff';
										ctx.fillRect(xv, yv, 40, 30); 
										ctx.fillStyle = '#000';		
										ctx.strokeStyle = "Navy";
										ctx.lineWidth   = 2;
										ctx.strokeRect(xv, yv, 40, 30);										
										ctx.fillText(arrlabel[c] + "[" + arrlabel[c+2] + "][" + arrlabel[c+5] + "]", xv, yv+50);
										c = c + 5;
										c2++;
									}
								}else{
									idx2 = isThere(arrstructvarname, arrlabel[c]);
									if(idx2 != -1){
										//typedef struct								
										idx = isThere(arrstruct, arrstructvartype[idx2]);
										//typedef struct untuk scanf				
										//----------------------------------------------------------------------------
										//SCANF UNTUK VARIABEL TYPEDEF STRUCT
										//----------------------------------------------------------------------------										
										if(new String(arrlabel[c+1]).valueOf() == new String(".").valueOf()){		
											//jika setelah bungkusan adalah operator							
											if((xv + 200) > canvas.width){
												awal = 1;
												lastyv = yv;
												yv = measurement;
												if(istack != -1){
													xv = (istack * adds) + 70;
												}else{
													xv = 70;
												}
											}else{	
												if(c2 != 0){
													xv = xv + 180;										
													awal = 0;
												}else{
													if(istack != -1){
														xv = (istack * adds) + 70;
													}else{
														xv = 70;
													}
												}
															
												if(xv < xmeasurement){
													xv = xmeasurement
												}
												xmeasurement = xv + 180;												
											}
											
											if(measurement < (yv + 240)){
												measurement = yv + 240;
											}
											(function (_x, _y, structname, structvarname, _arrstructvarvalue, _arrstructcontent) {	
												var image1 = new Image();	
												image1.src = 'assets/images/bungkusanjadi.png';
												image1.onload = function () {
												   // drawVariable(xv, yv, _label, image1);	
													ctx.restore();
													ctx.drawImage(image1, _x, _y, image1.width, image1.height);
													var strlen = (22 - structname.length)/2;
													if(strlen < 0){
														strlen = 0;
													}
													var xtemp = _x + (image1.width/22) * strlen;
													ctx.font = "bold 15px Arial";
													ctx.fillText("jenis: " + structname, (_x + 20), (_y + 35));
													ctx.fillText("bernama: " + structvarname, (_x + 25), (_y + 80));	
													
													var k; 
													var xt = _x;
													for(k=0;k<_arrstructcontent.length;k++){
														if((k%3 == 0) && (k > 0)){
															_y = _y + 50;
															xt = _x;
														}
														if(k < 6){													
															(function (__x, __y, __arrname, _value) {
																if(new String(arrlabel[c+2]).valueOf() != new String(__arrname).valueOf()){
																	var image2 = new Image();			
																	image2.src = 'assets/images/box_open.png';													
																	image2.onload = function () {
																	   // drawVariable(xv, yv, _label, image1);	
																		ctx.restore();
																		ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
																		var strlen = (12 - (__arrname).length)/2;
																		if(strlen < 0){
																			strlen = 0;
																		}
																		var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
																		ctx.font = "bold 10px Arial";
																		ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
																	};	
																}							
															})(xt, _y, _arrstructcontent[k], _arrstructvarvalue[k]);	
															//45 image box dibagi 2
															xt = xt + 45 + 5;
														}else{
															var xtemp = xt + 45;
															ctx.font = "bold 15px Arial";
															ctx.fillText(".................", xtemp,(_y + 95));
															break;
														}
													}
												};											
											})(xv, yv, arrstruct[idx], arrstructvarname[idx2], arrstructvarvalue[idx2], arrstructnamecontent[idx]);	
											var k; 
											var xt = xv;
											var yt = yv;
											for(k=0;k<arrstructnamecontent[idx].length;k++){
												if((k%3 == 0) && (k > 0)){
													yt = yt + 50;
													xt = xv;
												}
												if(k < 6){													
													(function (__x, __y, __arrname, _value) {
														if(new String(arrlabel[c+2]).valueOf() == new String(__arrname).valueOf()){
															var image2 = new Image();	
															image2.src = 'assets/images/box_open2.png';
															
															image2.onload = function () {
															   // drawVariable(xv, yv, _label, image1);	
																ctx.restore();
																ctx.drawImage(image2, (__x + 15), (__y + 90), (image2.width/2), (image2.height/2));	
																var strlen = (12 - (__arrname).length)/2;
																if(strlen < 0){
																	strlen = 0;
																}
																var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
																ctx.font = "bold 10px Arial";
																ctx.fillText(__arrname, xtemp,(__y + 100 + (((image2.height/2)*2)/3)));
															};
														}	
													})(xt, yt, arrstructnamecontent[idx][k], arrstructvarvalue[idx2][k]);	
													//45 image box dibagi 2
													xt = xt + 45 + 5;
												}
											}
											c = c + 2;
											c2++;
											//_x, _y, _arrstructname, _arrstructvarname, _arrstructvarvalue, index, arrstructcontent
										}else if(new String(arrlabel[c+1]).valueOf() == new String("[").valueOf()){	
											//jika array terstruktur menjadi peran variabel						
											lastyv = yv;
																		
											if(measurement < (yv + 150)){
												measurement = yv + 150;
											}
											//array terstruktur
											if(arrstructvarcol[idx2] == undefined){												
											//----------------------------------------------------------------------------
											//SCANF UNTUK VARIABEL TYPEDEF STRUCT - ARRAY SATU DIMENSI
											//----------------------------------------------------------------------------	
												/*if(measurement < (yv + 80)){
													measurement = yv + 80;
												}*/
												if((xv + 80) > canvas.width){
													yv = yv + 100;
													
													if(yv < measurement){
														yv = measurement;
													}
													awal = 1;
													xv = i(stack * adds) + 70;
												}else{
													if(c2 != 0){
														xv = xv + 80;										
														awal = 0;
													}else{
														if(istack != -1){
															xv = (istack * adds) + 70;
														}else{
															xv = 70;
														}
													}
													
													if(xv < xmeasurement){
														xv = xmeasurement
													}
													xmeasurement = xv + 80;													
												}
												
												(function (_x, _y, str, num, id, _name, _jenis) {	
													var image1 = new Image();	
													image1.src = 'assets/images/bungkusanjadi.png';
													image1.onload = function () {
													   // drawVariable(xv, yv, _label, image1);
														ctx.restore();
														ctx.drawImage(image1, _x, _y, (image1.width/2), (image1.height/2));											
														ctx.font = "bold 10px Arial";
														ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 20));
														ctx.fillText(str + "[" + num + "]", _x,(_y + 105));
													};
													
													var image2 = new Image();	
													image2.src = 'assets/images/box_open2.png';
													
													image2.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image2, (_x + 10), (_y + 40), (image2.width/2), (image2.height/2));	
														var strlen = (10 - (_name).length)/2;
														if(strlen < 0){
															strlen = 0;
														}
														var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
														ctx.font = "bold 10px Arial";
														ctx.fillText(_name, xtemp,(_y + 50 + (((image2.height/2)*2)/3)));
													};
												})(xv, yv, arrlabel[c], arrlabel[c+2], c, arrlabel[c+5], arrstructvartype[idx2]);	
												c = c + 5;
												c2++;
											}else{																			
											//----------------------------------------------------------------------------
											//SCANF UNTUK VARIABEL TYPEDEF STRUCT - ARRAY DUA DIMENSI
											//----------------------------------------------------------------------------	
												if((xv + 80) > canvas.width){
													yv = yv + 150;
													
													if(yv < measurement){
														yv = measurement;
													}
													awal = 1;
													if(istack != -1){
														xv = (istack * adds) + 70;
													}else{
														xv = 70;
													}
												}else{
													if(c2 != 0){
														xv = xv + 100;										
														awal = 0;
													}else{
														if(istack != -1){
															xv = (istack * adds) + 70;
														}else{
															xv = 70;
														}
													}
													
													if(xv < xmeasurement){
														xv = xmeasurement
													}
													xmeasurement = xv + 100;
												}
												//yv = yv + 10;
												ctx.fillStyle = '#fff';
												ctx.fillRect(xv, yv, 100, 90); 
												ctx.fillStyle = '#000';		
												ctx.strokeStyle = "Navy";
												ctx.lineWidth   = 2;
												ctx.strokeRect(xv, yv, 100, 90);	
												ctx.font = "bold 10px Arial";									
												ctx.fillText(arrlabel[c] + "[" + arrlabel[c+2] + "][" + arrlabel[c+5] + "]", xv, yv+105);				
												
												(function (_x, _y, id, _name, _jenis) {
													var image1 = new Image();	
													image1.src = 'assets/images/bungkusanjadi.png';
													image1.onload = function () {
													   // drawVariable(xv, yv, _label, image1);
														ctx.restore();
														ctx.drawImage(image1, _x, _y, (image1.width/2), (image1.height/2));											
														ctx.font = "bold 10px Arial";
														ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 20));
													};
													
													var image2 = new Image();	
													image2.src = 'assets/images/box_open2.png';
													
													image2.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image2, (_x + 10), (_y + 40), (image2.width/2), (image2.height/2));	
														var strlen = (10 - (_name).length)/2;
														if(strlen < 0){
															strlen = 0;
														}
														var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
														ctx.font = "bold 10px Arial";
														ctx.fillText(_name, xtemp,(_y + 50 + (((image2.height/2)*2)/3)));
													};
												})(xv, yv, i, arrlabel[c+8], arrstructvartype[idx2]);	
												c = c + 8;
												c2++;
											}						
										}
									}
								}
							}
							
						}
					}
					c++;
				}
				i = c;			
			}
		}else if(new String(arrlabel[i]).valueOf() == new String("printf").valueOf()){
			lastyv = yv;
			var c = i + 1;
			var status = 0;
			while((c < arrtoken.length) && (status == 0)){
				if(new String(arrlabel[c]).valueOf() == new String(",").valueOf()){
					status = 1;
					c++;
				}else if((new String(arrlabel[c]).valueOf() == new String(")").valueOf())
				|| (new String(arrlabel[c]).valueOf() == new String(";").valueOf())){
					status = 2;
				}else{
					c++;
				}
			}
			
			if(status == 1){
			//koma dengan variabel															
			//----------------------------------------------------------------------------
			//PRINTF DENGAN VARIABEL
			//----------------------------------------------------------------------------	
				(function (_x, _y, str) {
					var image1 = new Image();	
					image1.src = 'assets/images/command-line.png';
					image1.onload = function () {
						ctx.restore();		
						ctx.drawImage(image1, _x, (_y+5), image1.width, image1.height);						
						ctx.fillStyle = '#999';													
						ctx.font = "bold italic 15px Arial";
						ctx.fillText(str, (_x + 10), (_y+45));	
						ctx.fillStyle = '#000';											
					};		

					var image2 = new Image();	
					image2.src = 'assets/images/panah2.png';
					image2.onload = function () {
						ctx.restore();		
						ctx.drawImage(image2, _x + 165, (_y+10), image2.width, image2.height);
					};		
				})(xv, yv, arrlabel[i+2]);
				xv = xv + 120;
				awal = 0;
				var xmeasurement = 0;
				var c2 = 0;
				status = 0;
				while((c < arrtoken.length) && (status == 0)){
					if((new String(arrlabel[c]).valueOf() == new String(")").valueOf())
					|| (new String(arrlabel[c]).valueOf() == new String(";").valueOf())){
						status = 1;
					}else{
						if((new String(arrlabel[c]).valueOf() != new String(",").valueOf())
							&&(new String(arrlabel[c]).valueOf() != new String("&").valueOf())){
							var idx = isThere(arrvarname, arrlabel[c]);
							if(idx != -1){																						
								//----------------------------------------------------------------------------
								//PRINTF DENGAN VARIABEL - VARIABEL
								//----------------------------------------------------------------------------	
								//variabel								
								if((xv + 80) > canvas.width){
									yv = yv + 80;
									
									if(yv < measurement){
										yv = measurement;
									}
									awal = 1;
									if(istack != -1){
										xv = (istack * adds) + 200;
									}else{
										xv = 200;
									}
								}else{
									xv = xv + 60;										
									awal = 0;									
									if(xv < xmeasurement){
										xv = xmeasurement
									}
									xmeasurement = xv + 60;														
								}
								(function (_x, _y, str) {
									var image1 = new Image();	
									image1.src = 'assets/images/box_open.png';
									image1.onload = function () {
									   // drawVariable(xv, yv, _label, image1);
										ctx.restore();
										ctx.drawImage(image1, _x, (_y + 60), ((image1.width*2)/3), ((image1.height*2)/3));
										var strlen = (12 - str.length)/2;
										if(strlen < 0){
											strlen = 0;
										}
										var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
										ctx.font = "bold 10px Arial";
										ctx.fillText(str, xtemp,(_y + 70 + ((((image1.height*2)/3)*2)/3)));
									};
								})(xv, yv, arrlabel[c]);									
							}else{
								idx = isThere(arrnamearr, arrlabel[c]);
								if(idx != -1){
									//array
									
									if(arrcolnum[idx] == undefined){														
									//----------------------------------------------------------------------------
									//PRINTF DENGAN VARIABEL - ARRAY SATU DIMENSI
									//----------------------------------------------------------------------------	
										if((xv + 80) > canvas.width){
											yv = yv + 80;
											
											if(yv < measurement){
												yv = measurement;
											}
											awal = 1;
											if(istack != -1){
												xv = (istack * adds) + 200;
											}else{
												xv = 200;
											}
										}else{
											xv = xv + 60;												
											awal = 0;
																			
											if(xv < xmeasurement){
												xv = xmeasurement
											}
											xmeasurement = xv + 60;	
										}
										(function (_x, _y, str, num) {
											var image1 = new Image();	
											image1.src = 'assets/images/box_open.png';
											image1.onload = function () {
											   // drawVariable(xv, yv, _label, image1);
												ctx.restore();
												ctx.drawImage(image1, _x, (_y + 60), ((image1.width*2)/3), ((image1.height*2)/3));
												var strlen = (12 - (str.length + 4))/2;
												if(strlen < 0){
													strlen = 0;
												}
												var xtemp = _x + (((image1.width*2)/3)/12) * (strlen-1);
												ctx.font = "bold 10px Arial";
												ctx.fillText(str + "[" + num + "]", xtemp,(_y + 70 + ((((image1.height*2)/3)*2)/3)));
											};
										})(xv, yv, arrlabel[c], arrlabel[c+2]);	
										c = c + 2;
										c2++;
									}else{
																								
									//----------------------------------------------------------------------------
									//PRINTF DENGAN VARIABEL - ARRAY DUA DIMENSI
									//----------------------------------------------------------------------------	
										if((xv + 80) > canvas.width){
											yv = yv + 80;
											
											if(yv < measurement){
												yv = measurement;
											}
											awal = 1;
											if(istack != -1){
												xv = (istack * adds) + 200;
											}else{
												xv = 200;
											}
										}else{
											xv = xv + 70;
											awal = 0;									
											if(xv < xmeasurement){
												xv = xmeasurement
											}
											xmeasurement = xv + 70;											
										}
										ctx.fillStyle = '#fff';
										ctx.fillRect(xv, yv+70, 40, 30); 
										ctx.fillStyle = '#000';		
										ctx.strokeStyle = "Navy";
										ctx.lineWidth   = 2;
										ctx.strokeRect(xv, yv+70, 40, 30);	
										ctx.font = "bold 10px Arial";									
										ctx.fillText(arrlabel[c] + "[" + arrlabel[c+2] + "][" + arrlabel[c+5] + "]", xv, yv+120);
										c = c + 5;
										c2++;
									}
								}else{
									var idx2 = isThere(arrstructvarname, arrlabel[c]);
									if(idx2 != -1){										
										idx = isThere(arrstruct, arrstructvartype[idx2]);
										//typedef struct untuk scanf										
										if(new String(arrlabel[c+1]).valueOf() == new String(".").valueOf()){				
										//----------------------------------------------------------------------------
										//PRINTF DENGAN VARIABEL - TYPEDEF STRUCT
										//----------------------------------------------------------------------------											
											//jika setelah bungkusan adalah operator							
											if((xv + 200) > canvas.width){
												awal = 1;
												lastyv = yv;
												yv = measurement;
												if(istack != -1){
													xv = (istack * adds) + 70;
												}else{
													xv = 70;
												}
											}else{	
												if(c2 != 0){
													xv = xv + 180;										
													awal = 0;
												}else{
													if(istack != -1){
														xv = (istack * adds) + 200;
													}else{
														xv = 200;
													}
												}
															
												if(xv < xmeasurement){
													xv = xmeasurement
												}
												xmeasurement = xv + 180;												
											}
											
											if(measurement < (yv + 260)){
												measurement = yv + 260;
											}
											(function (_x, _y, structname, structvarname, _arrstructvarvalue, _arrstructcontent) {	
												var image1 = new Image();	
												image1.src = 'assets/images/bungkusanjadi.png';
												image1.onload = function () {
												   // drawVariable(xv, yv, _label, image1);	
													ctx.restore();
													ctx.drawImage(image1, _x, _y + 60, image1.width, image1.height);
													var strlen = (22 - structname.length)/2;
													if(strlen < 0){
														strlen = 0;
													}
													var xtemp = _x + (image1.width/22) * strlen;
													ctx.font = "bold 15px Arial";
													ctx.fillText("jenis: " + structname, (_x + 20), (_y + 95));
													ctx.fillText("bernama: " + structvarname, (_x + 25), (_y + 140));
													
													var k; 
													var xt = _x;
													for(k=0;k<_arrstructcontent.length;k++){
														if((k%3 == 0) && (k > 0)){
															_y = _y + 50;
															xt = _x;
														}
														if(k < 6){													
															(function (__x, __y, __arrname, _value) {
																if(new String(arrlabel[c+2]).valueOf() != new String(__arrname).valueOf()){
																	var image2 = new Image();			
																	image2.src = 'assets/images/box_open.png';													
																	image2.onload = function () {
																	   // drawVariable(xv, yv, _label, image1);	
																		ctx.restore();
																		ctx.drawImage(image2, (__x + 15), (__y + 150), (image2.width/2), (image2.height/2));	
																		var strlen = (12 - (__arrname).length)/2;
																		if(strlen < 0){
																			strlen = 0;
																		}
																		var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
																		ctx.font = "bold 10px Arial";
																		ctx.fillText(__arrname, xtemp,(__y + 160 + (((image2.height/2)*2)/3)));
																	};	
																}							
															})(xt, _y, _arrstructcontent[k], _arrstructvarvalue[k]);
															//45 image box dibagi 2
															xt = xt + 45 + 5;
														}else{
															var xtemp = xt + 45;
															ctx.font = "bold 15px Arial";
															ctx.fillText(".................", xtemp,(_y + 155));
															break;
														}
													}
												};											
											})(xv, yv, arrstruct[idx], arrstructvarname[idx2], arrstructvarvalue[idx2], arrstructnamecontent[idx]);	
											var k; 
											var xt = xv;
											var yt = yv;
											for(k=0;k<arrstructnamecontent[idx].length;k++){
												if((k%3 == 0) && (k > 0)){
													yt = yt + 50;
													xt = xv;
												}
												if(k < 6){													
													(function (__x, __y, __arrname, _value) {
														if(new String(arrlabel[c+2]).valueOf() == new String(__arrname).valueOf()){
															var image2 = new Image();	
															image2.src = 'assets/images/box_open2.png';
															
															image2.onload = function () {
															   // drawVariable(xv, yv, _label, image1);	
																ctx.restore();
																ctx.drawImage(image2, (__x + 15), (__y + 150), (image2.width/2), (image2.height/2));	
																var strlen = (12 - (__arrname).length)/2;
																if(strlen < 0){
																	strlen = 0;
																}
																var xtemp = __x + 15 + ((image2.width/2)/12) * (strlen-1);
																ctx.font = "bold 10px Arial";
																ctx.fillText(__arrname, xtemp,(__y + 160 + (((image2.height/2)*2)/3)));
															};
														}	
													})(xt, yt, arrstructnamecontent[idx][k], arrstructvarvalue[idx2][k]);
													//45 image box dibagi 2
													xt = xt + 45 + 5;
												}
											}
											c = c + 2;
											c2++;
											//_x, _y, _arrstructname, _arrstructvarname, _arrstructvarvalue, index, arrstructcontent
										}else if(new String(arrlabel[c+1]).valueOf() == new String("[").valueOf()){	
											//jika array terstruktur menjadi peran variabel						
											lastyv = yv;
																		
											if(measurement < (yv + 170)){
												measurement = yv + 170;
											}
											//array terstruktur
											if(arrstructvarcol[idx2] == undefined){		
											//----------------------------------------------------------------------------
											//PRINTF DENGAN VARIABEL - TYPEDEF STRUCT ARRAY SATU DIMENSI
										    //-------------------------------																	
												/*if(measurement < (yv + 80)){
													measurement = yv + 80;
												}*/
												if((xv + 80) > canvas.width){
													yv = yv + 100;
													
													if(yv < measurement){
														yv = measurement;
													}
													awal = 1;
													if(istack != -1){
														xv = (istack * adds) + 70;
													}else{
														xv = 70;
													}
												}else{
													if(c2 != 0){
														xv = xv + 80;										
														awal = 0;
													}else{
														if(istack != -1){
															xv = (istack * adds) + 200;
														}else{
															xv = 200;
														}
													}
													
													if(xv < xmeasurement){
														xv = xmeasurement
													}
													xmeasurement = xv + 80;													
												}
												(function (_x, _y, str, num, id, _name, _jenis) {
													var image1 = new Image();	
													image1.src = 'assets/images/bungkusanjadi.png';
													image1.onload = function () {
													   // drawVariable(xv, yv, _label, image1);
														ctx.restore();
														ctx.drawImage(image1, _x, _y+60, (image1.width/2), (image1.height/2));											
														ctx.font = "bold 10px Arial";
														ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 80));
														ctx.fillText(str + "[" + num + "]", _x,(_y + 165));
													};
													
													var image2 = new Image();	
													image2.src = 'assets/images/box_open2.png';
													
													image2.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image2, (_x + 10), (_y + 100), (image2.width/2), (image2.height/2));	
														var strlen = (10 - (_name).length)/2;
														if(strlen < 0){
															strlen = 0;
														}
														var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
														ctx.font = "bold 10px Arial";
														ctx.fillText(_name, xtemp,(_y + 100 + (((image2.height/2)*2)/3)));
													};
												})(xv, yv, arrlabel[c], arrlabel[c+2], c, arrlabel[c+5], arrstructvartype[idx2]);	
												c = c + 5;
												c2++;
											}else{
												
											//----------------------------------------------------------------------------
											//PRINTF DENGAN VARIABEL - TYPEDEF STRUCT ARRAY DUA DIMENSI
											//----------------------------------------------------------------------------												
												if((xv + 80) > canvas.width){
													yv = yv + 150;
													
													if(yv < measurement){
														yv = measurement;
													}
													awal = 1;
													if(istack != -1){
														xv = (istack * adds) + 70;
													}else{
														xv = 70;
													}
												}else{
													if(c2 != 0){
														xv = xv + 100;										
														awal = 0;
													}else{
														if(istack != -1){
															xv = (istack * adds) + 200;
														}else{
															xv = 200;
														}
													}
													
													if(xv < xmeasurement){
														xv = xmeasurement
													}
													xmeasurement = xv + 100;
												}
												//yv = yv + 10;
												ctx.fillStyle = '#fff';
												ctx.fillRect(xv, yv+60, 100, 90); 
												ctx.fillStyle = '#000';		
												ctx.strokeStyle = "Navy";
												ctx.lineWidth   = 2;
												ctx.strokeRect(xv, yv+60, 100, 90);	
												ctx.font = "bold 10px Arial";									
												ctx.fillText(arrlabel[c] + "[" + arrlabel[c+2] + "][" + arrlabel[c+5] + "]", xv, yv+105);				
												
												(function (_x, _y, id, _name, _jenis) {	
													var image1 = new Image();	
													image1.src = 'assets/images/bungkusanjadi.png';
													image1.onload = function () {
													   // drawVariable(xv, yv, _label, image1);
														ctx.restore();
														ctx.drawImage(image1, _x, _y+60, (image1.width/2), (image1.height/2));											
														ctx.font = "bold 10px Arial";
														ctx.fillText("jenis: " + _jenis, (_x + 10) ,(_y + 80));
													};
													
													var image2 = new Image();	
													image2.src = 'assets/images/box_open2.png';
													
													image2.onload = function () {
													   // drawVariable(xv, yv, _label, image1);	
														ctx.restore();
														ctx.drawImage(image2, (_x + 10), (_y + 100), (image2.width/2), (image2.height/2));	
														var strlen = (10 - (_name).length)/2;
														if(strlen < 0){
															strlen = 0;
														}
														var xtemp = _x + 10 + ((image2.width/2)/10) * (strlen-1);
														ctx.font = "bold 10px Arial";
														ctx.fillText(_name, xtemp,(_y + 100 + (((image2.height/2)*2)/3)));
													};
												})(xv, yv, i, arrlabel[c+8], arrstructvartype[idx2]);	
												c = c + 8;
												c2++;
											}						
										}
									}
								}
							}							
						}
						c++;
					}
				}
				
				i = c;				
				yv = yv + 70;
				awal = 1;
				if(lastyv < yv){
					lastyv = yv;
				}
			}else if(status == 2){																	
			//----------------------------------------------------------------------------
			//PRINTF TANPA VARIABEL
			//----------------------------------------------------------------------------	
			//tanpa variabel
				if(measurement < (yv + 180)){
					measurement = yv + 180;
				}
				(function (_x, _y, str) {
					var image1 = new Image();	
					image1.src = 'assets/images/command-line.png';
					image1.onload = function () {
						ctx.restore();		
						ctx.drawImage(image1, _x, (_y+5), image1.width, image1.height);						
						ctx.fillStyle = '#999';													
						ctx.font = "bold italic 15px Arial";
						ctx.fillText(str, (_x + 10), (_y+45));	
						ctx.fillStyle = '#000';											
					};					
				})(xv, yv, arrlabel[i+2]);
				i = i + 2;			
				yv = yv + 180;
				awal = 1;
				if(lastyv < yv){
					lastyv = yv;
				}
			}
		}else if(new String(arrlabel[i]).valueOf() == new String("if").valueOf()){	
		//-----------------------------------------------------
		//IF
		//-----------------------------------------------------
			if(measurement < (yv + 80)){
				measurement = yv + 80;
			}	
			var c = i + 1;
			var status = 0;
			var str = "";
			while((c < arrtoken.length) && (status == 0)){
				if(new String(arrlabel[c]).valueOf() == new String("{").valueOf()){
					status = 1;
					istack++;
					stack[istack] = "if";		
					stackyv[istack] = yv;	
					stackxv[istack] = xv;
					stackmark[istack] = 0;
				}else{
					str = str + " " + arrlabel[c];
					c++;
				}
			}
			xv = xv + (istack * adds);
			
			(function (_x, _y) {	
				var image1 = new Image();	
				image1.src = 'assets/images/if.png';
				image1.onload = function () {
				   // drawVariable(xv, yv, _label, image1);
					ctx.restore();
					ctx.drawImage(image1, _x, _y, (image1.width/5), (image1.height/5));	
				};
			})(xv, yv);
			
			var idx = isThere(kalang, "if");
			ctx.fillStyle = textcolour[idx];													
			ctx.font = "bold 15px Arial";
			ctx.fillText("[ IF ]", xv+65, yv+32);	
			ctx.fillStyle = '#000';	
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo((xv+110), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
													
			ctx.beginPath();
			ctx.moveTo((xv+110), (yv+55));
			ctx.lineTo((xv+140), (yv+30));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo((xv+140), (yv+55));
			ctx.lineTo((xv+280), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo(xv, (yv+100));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();		
																
			ctx.font = "bold 15px Arial";
			ctx.fillText(str, xv+145, yv+30);
		
			i = c;
	
			awal = 1;
			yv = yv + 80;
		}else if(new String(arrlabel[i]).valueOf() == new String("else").valueOf()){	
		//-----------------------------------------------------
		//ELSE
		//-----------------------------------------------------
			
			//stackTracking();	
			xv = stackxv[istack] + (stackmark[istack] * 280);
			yv = stackyv[istack];
			
			(function (_x, _y) {	
				var image1 = new Image();	
				image1.src = 'assets/images/if.png';
				image1.onload = function () {
				   // drawVariable(xv, yv, _label, image1);
					ctx.restore();
					ctx.drawImage(image1, _x, _y, (image1.width/5), (image1.height/5));	
				};
			})(xv, yv);
			
			var c = 0;
			var idx;
							
			if(new String(arrlabel[i+1]).valueOf() == new String("{").valueOf()){				
				if(measurement < (yv + 80)){
					measurement = yv + 80;
				}	
				idx = isThere(kalang, "else");
				ctx.fillStyle = textcolour[1];													
				ctx.font = "bold 15px Arial";
				ctx.fillText("[ ELSE ]", xv+55, yv+32);	
				
			}else if(new String(arrlabel[i+1]).valueOf() == new String("if").valueOf()){
				idx = isThere(kalang, "elseif");
				c = i + 2;
				var status = 0;
				var str = "";
				while((c < arrtoken.length) && (status == 0)){
					if(new String(arrlabel[c]).valueOf() == new String("{").valueOf()){
						status = 1;
					}else{
						str = str + " " + arrlabel[c];
						c++;
					}
				}
				ctx.fillStyle = textcolour[idx];													
				ctx.font = "bold 15px Arial";
				ctx.fillText("[ ELSEIF ]", xv+55, yv+32);	
				ctx.fillStyle = '#000';				
				ctx.fillText(str, xv+145, yv+30);
			}
			ctx.fillStyle = '#000';	
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo((xv+110), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo((xv+140), (yv+55));
			ctx.lineTo((xv+280), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo(xv, (yv+100));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();	
			
			if(new String(arrlabel[i+1]).valueOf() == new String("{").valueOf()){
				i = i + 1;
				awal = 1;
				yv = yv + 80;
			}else if(new String(arrlabel[i+1]).valueOf() == new String("if").valueOf()){
				ctx.beginPath();
				ctx.moveTo((xv+110), (yv+55));
				ctx.lineTo((xv+140), (yv+30));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();
				i = c;
			}
			
		}else if(new String(arrlabel[i]).valueOf() == new String("for").valueOf()){	
		//-----------------------------------------------------
		//FOR
		//-----------------------------------------------------	
			//stackTracking();
			if(measurement < (yv + 80)){
				measurement = yv + 80;
			}	
			var idx = isThere(kalang, "for");
			lastyv = yv;		
			var c = i + 1;
			var status = 0;
			var str = "";
			var iawal = -1;
			var iakhir = -1;
			while((c < arrtoken.length) && (status == 0)){
				if(new String(arrlabel[c]).valueOf() == new String("{").valueOf()){
					status = 1;
					istack++;
					stack[istack] = "for";	
					stackyv[istack] = yv;	
					stackxv[istack] = xv;
				}else{
					str = str + " " + arrlabel[c];
					if((new String(arrtoken[c]).valueOf() == new String("variable").valueOf())
					   &&(new String(arrtoken[c+1]).valueOf() == new String("operator").valueOf())
					   &&(new String(arrtoken[c+2]).valueOf() == new String("number").valueOf())){
						if(iawal == -1){
							iawal = arrlabel[c+2];
						}else if(iakhir == -1){
							if((new String(arrlabel[c+1]).valueOf() == new String("<=").valueOf())
							||(new String(arrlabel[c+1]).valueOf() == new String(">=").valueOf())){
								iakhir = parseInt(arrlabel[c+2]) + 1;
							}else{						
								iakhir = parseInt(arrlabel[c+2]);
							}
						}
					}
					c++;
				}
			}
			xv = xv + (istack * adds);

			var xtemp = Math.abs(iawal-iakhir);			
			var md;
			if(iawal < iakhir){
				md = "up";
			}else if(iawal > iakhir){
				md = "down";
			}
			
			(function (_x, _y) {	
				var image1 = new Image();	
				image1.src = 'assets/images/loopfor.png';
				image1.onload = function () {
				   // drawVariable(xv, yv, _label, image1);
					ctx.restore();
					ctx.drawImage(image1, _x, _y, (image1.width/5), (image1.height/5));	
				};
			})(xv, yv);
							
			ctx.fillStyle = textcolour[idx];													
			ctx.font = "bold 15px Arial";
			ctx.fillText("[ FOR ]", xv+65, yv+32);													
			ctx.font = "bold 10px Arial";			
			ctx.fillText("(" + xtemp + " X " + md + " )", xv+60, yv+50);	
			ctx.fillStyle = '#000';	
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo((xv+110), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
													
			ctx.beginPath();
			ctx.moveTo((xv+110), (yv+55));
			ctx.lineTo((xv+140), (yv+30));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo((xv+140), (yv+55));
			ctx.lineTo((xv+280), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo(xv, (yv+100));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();		
																
			ctx.font = "bold 15px Arial";
			ctx.fillText(str, xv+145, yv+30);
		
			i = c;
			
			awal = 1;
			yv = yv + 80;
		}else if(new String(arrlabel[i]).valueOf() == new String("while").valueOf()){	
		//-----------------------------------------------------
		//WHILE
		//-----------------------------------------------------
			
			if(new String(stack[istack]).valueOf() != new String("do").valueOf()){
				//stackTracking();
				if(measurement < (yv + 80)){
					measurement = yv + 80;
				}		
				var idx = isThere(kalang, "while");	
				lastyv = yv;
				var c = i + 1;
				var status = 0;
				var str = "";
				while((c < arrtoken.length) && (status == 0)){
					if(new String(arrlabel[c]).valueOf() == new String("{").valueOf()){
						status = 1;
						istack++;
						stack[istack] = "while";
						stackyv[istack] = yv;	
						stackxv[istack] = xv;
					}else{
						str = str + " " + arrlabel[c];
						c++;
					}
				}
				xv = xv + (istack * adds);
				
				(function (_x, _y) {	
					var image1 = new Image();	
					image1.src = 'assets/images/loopwhile.png';
					image1.onload = function () {
					   // drawVariable(xv, yv, _label, image1);
						ctx.restore();
						ctx.drawImage(image1, _x, _y, (image1.width/4), (image1.height/4));	
					};
				})(xv, yv);
								
				ctx.fillStyle = textcolour[idx];													
				ctx.font = "bold 15px Arial";
				ctx.fillText("[ WHILE ]", xv+50, yv+32);	
				ctx.fillStyle = '#000';	
				
				ctx.beginPath();
				ctx.moveTo(xv, (yv+55));
				ctx.lineTo((xv+110), (yv+55));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();
				
														
				ctx.beginPath();
				ctx.moveTo((xv+110), (yv+55));
				ctx.lineTo((xv+140), (yv+30));
				ctx.lineWidth=3; 			
				ctx.strokeStyle='Grey';  	
				ctx.stroke();
				ctx.closePath();
				
				ctx.beginPath();
				ctx.moveTo((xv+140), (yv+55));
				ctx.lineTo((xv+280), (yv+55));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();
				
				ctx.beginPath();
				ctx.moveTo(xv, (yv+55));
				ctx.lineTo(xv, (yv+100));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();		
																	
				ctx.font = "bold 15px Arial";
				ctx.fillText(str, xv+145, yv+30);
			
				i = c;
				
				awal = 1;
				yv = yv + 80;
			}
		}else if(new String(arrlabel[i]).valueOf() == new String("do").valueOf()){	
		//-----------------------------------------------------
		//DO
		//-----------------------------------------------------
			//stackTracking();
			if(measurement < (yv + 80)){
				measurement = yv + 80;
			}			
			var idx = isThere(kalang, "do");
			lastyv = yv;
			var c = i + 1;
			var status = 0;
			var str = "";
			while((c < arrtoken.length) && (status == 0)){
				if(new String(arrlabel[c]).valueOf() == new String("{").valueOf()){
					status = 1;
					istack++;
					stack[istack] = "do";
					stackyv[istack] = yv;	
					stackxv[istack] = xv;
				}else{
					str = str + " " + arrlabel[c];
					c++;
				}
			}
			xv = xv + (istack * adds);
			
			(function (_x, _y) {	
				var image1 = new Image();	
				image1.src = 'assets/images/loopdo.png';
				image1.onload = function () {
				   // drawVariable(xv, yv, _label, image1);
					ctx.restore();
					ctx.drawImage(image1, _x, _y, (image1.width/5), (image1.height/5));	
				};
			})(xv, yv);
							
			ctx.fillStyle = textcolour[idx];													
			ctx.font = "bold 15px Arial";
			ctx.fillText("[ DO ]", xv+65, yv+32);	
			ctx.fillStyle = '#000';	
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo((xv+110), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo((xv+150), (yv+55));
			ctx.lineTo((xv+280), (yv+55));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo(xv, (yv+55));
			ctx.lineTo(xv, (yv+100));
			ctx.lineWidth=3; 			
			ctx.strokeStyle=linecolour[idx];  	
			ctx.stroke();
			ctx.closePath();		
																
			ctx.font = "bold 15px Arial";
			ctx.fillText(str, xv+145, yv+30);
		
			i = c;
			
			awal = 1;
			yv = yv + 80;
		}else if((new String(arrlabel[i]).valueOf() == new String("}").valueOf())
				&& (new String(arrtoken[i]).valueOf() == new String("-").valueOf())){									
			//----------------------------------------------------------------------------
			//Tutup Kalang
			//----------------------------------------------------------------------------	
			if(istack != -1){
				//console.log("---------------------------");
				//stackTracking();	
				var md = stack[istack];
				var yd = stackyv[istack];
				var xd = stackxv[istack];
				
				if(yv <= yd){
					if(new String(md).valueOf() == new String("do").valueOf()){
						yv = yd + 120;
					}else{
						yv = yd + 100;
					}
				}
				
				if(new String(stack[istack]).valueOf() == new String("else").valueOf()){
					xv = stackxv[istack] + (stackmark[istack] * 280);
				}else if(new String(stack[istack]).valueOf() == new String("elseif").valueOf()){
					xv = stackxv[istack] + (stackmark[istack] * 280);
				}else{
					xv = stackxv[istack] + (istack * adds);
				}
				
				if((new String(stack[istack]).valueOf() == new String("if").valueOf())
					||(new String(stack[istack]).valueOf() == new String("elseif").valueOf())){
					if((new String(arrlabel[i+1]).valueOf() == new String("else").valueOf())
						&&(new String(arrlabel[i+2]).valueOf() == new String("{").valueOf())){
						stack[istack] = "else";
						stackmark[istack] = stackmark[istack] + 1;
					}else if((new String(arrlabel[i+1]).valueOf() == new String("else").valueOf())
						&&(new String(arrlabel[i+2]).valueOf() == new String("if").valueOf())){
						stack[istack] = "elseif";
						stackmark[istack] = stackmark[istack] + 1;
					}else{
						stack.splice(istack, 1);
						stackxv.splice(istack, 1);
						stackyv.splice(istack, 1);
						stackmark.splice(istack, 1);
						istack--;
					}
				}else{
					stack.splice(istack, 1);
					stackxv.splice(istack, 1);
					stackyv.splice(istack, 1);
					stackmark.splice(istack, 1);
					istack--;
				}			
				
				
				//stackTracking();
				//console.log("---------------------------");
				//line 3 space 10
				//ambil warna
				var idx = isThere(kalang, md);
				//garis putus-putus				
				ctx.setLineDash([3, 10]);
				ctx.beginPath();
				ctx.moveTo(xd, yd+100);
				ctx.lineTo(xd, (yv+25));
				ctx.lineWidth=2; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();
				ctx.setLineDash([3, 0]);

				//garis vertikal depan
				ctx.beginPath();
				ctx.moveTo(xv, yv+10);
				ctx.lineTo(xv, (yv+25));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();
				
				//garis vertikal belakang
				ctx.beginPath();
				ctx.moveTo((xv+280), yv);
				ctx.lineTo((xv+280), (yv+25));
				ctx.lineWidth=3; 			
				ctx.strokeStyle=linecolour[idx];  	
				ctx.stroke();
				ctx.closePath();			
				
				//tulisan end
				ctx.fillStyle = textcolour[idx];													
				ctx.font = "bold 15px Arial";
				ctx.fillText("[ END " + md.toUpperCase() + " ]", xv+70, yv+22);	
				ctx.fillStyle = '#000';	
				
				if(new String(md).valueOf() == new String("do").valueOf()){
					if(measurement < (yv + 60)){
						measurement = yv + 60;
					}			
					lastyv = yv;
					
					//stackTracking();
					var c = i + 2;
					var status = 0;
					var str = "";
					while((c < arrtoken.length) && (status == 0)){
						if(new String(arrlabel[c]).valueOf() == new String(";").valueOf()){
							status = 1;
						}else{
							str = str + " " + arrlabel[c];
							c++;
						}
					}						
							
					ctx.beginPath();
					ctx.moveTo(xv, (yv+25));
					ctx.lineTo((xv+200), (yv+25));
					ctx.lineWidth=3; 			
					ctx.strokeStyle=linecolour[idx];  	
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(xv+280, (yv+25));
					ctx.lineTo((xv+240), (yv+25));
					ctx.lineWidth=3; 			
					ctx.strokeStyle=linecolour[idx];  	
					ctx.stroke();
					ctx.closePath();

					ctx.beginPath();
					ctx.moveTo((xv+200), (yv+25));
					ctx.lineTo((xv+230), yv);
					ctx.lineWidth=3; 			
					ctx.strokeStyle=linecolour[idx];  	
					ctx.stroke();
					ctx.closePath();
				
					ctx.fillStyle = textcolour[idx];			
					ctx.font = "bold 15px Arial";
					ctx.fillText(str, xv+10, yv+40);
					ctx.fillStyle = '#000';						
					awal = 1;
					yv = yv + 60;
					i = c;
				}else{						
				
					if(measurement < (yv + 50)){
						measurement = yv + 50;
					}		
					ctx.beginPath();
					ctx.moveTo(xv, (yv+25));
					ctx.lineTo((xv+230), (yv+25));
					ctx.lineWidth=3; 			
					ctx.strokeStyle=linecolour[idx];  	
					ctx.stroke();
					ctx.closePath();
					
					ctx.beginPath();
					ctx.moveTo(xv+280, (yv+25));
					ctx.lineTo((xv+270), (yv+25));
					ctx.lineWidth=3; 			
					ctx.strokeStyle=linecolour[idx];  	
					ctx.stroke();
					ctx.closePath();
					
					if(lastyv < yv){
						lastyv = yv;
					}
					awal = 1;
					yv = yv + 50;				
					//if(new String(md).valueOf() == new String("else").valueOf()){
						if(istack != -1){
							xv = (istack * adds) + 10;
						}else{
							xv = 10;
						}
					//}
				}
			}
		}else if((new String(arrlabel[i]).valueOf() == new String("return").valueOf()) 
				&&(new String(arrlabel[i+1]).valueOf() == new String("0").valueOf())){									
			//----------------------------------------------------------------------------
			//LAST RETURN
			//----------------------------------------------------------------------------	
				i = i + 1;
		}
	}
	
	stack = [];
	istack = -1;
	
	//tracking();
	//printToken();
}

function isThere(arr, str){
//memeriksa apakah string masukan ada pada array
	var hasil = -1;
	var status = false;
	var i = 0;
	while((i<arr.length) && (status == false)){
		if(new String(arr[i]).valueOf() == new String(str).valueOf()){
			status = true;
			hasil = i;
		}else{
			i++;
		}
	}	
	return hasil;
}

function typedefTracking(){
	var i, j;
	console.log("Tipe Terstruktur\n");
	for(i=0;i<arrstruct.length;i++){
		console.log(arrstruct[i] + "\n");
		if(arrstructtypecontent[i] != undefined){
			for(j=0;j<arrstructtypecontent[i].length;j++){
				console.log("- tipe: " + arrstructtypecontent[i][j] + "   var: " + arrstructnamecontent[i][j] + "\n");
			}
		}
	}
	
	console.log("Variabel tipe terstruktur\n");
	for(i=0;i<arrstructvarname.length;i++){
		console.log("tipe: " + arrstructvartype[i] + "   nama: " + arrstructvarname[i] + "\n");
		var idx = isThere(arrstruct, arrstructvartype[i]);
		if(arrstructtypecontent[idx] != undefined){
			for(j=0;j<arrstructtypecontent[idx].length;j++){
				console.log("- var: " + arrstructnamecontent[idx][j] + "   nilai: " + arrstructvarvalue[i][j] + "\n");
			}
		}
	}
}

function variableTracking(){	
	var i, j;	
	//variabel		
	console.log("Variabel\n");
	for(i=0;i<arrtype.length;i++){
		console.log(" tipe: " + arrtype[i] + "   var: " + arrvarname[i] + "   nilai: " + arrvarvalue[i] + "\n");
	}
}

function arrayTracking(){
	var i, j;		
	//array
	console.log("Array\n");
	for(i=0;i<arrtyperarr.length;i++){
		console.log(" tipe: " + arrtyperarr[i] + "   var: " + arrnamearr[i] + "   baris: " + arrrownum[i] 
		+ "   kolom: " + arrcolnum[i] + "\n");
	}
}

function procTracking(){
	var i, j;		
	//prcedure function	
	console.log("Fungsi Prosedur\n");
	for(i=0;i<arrtypeproc.length;i++){
		console.log("Tipe: " + arrtypeproc[i] + "   nama: " + arrnameproc[i] + "  numparam: " + arrnumparam[i] + "\n");		
		if(arrparamtype[i] != undefined){
			for(j=0;j<arrparamtype[i].length;j++){
				console.log("- tipe: " + arrparamtype[i][j] + "   var: " + arrparamname[i][j] + "\n");
			}
		}
	}
}

function stackTracking(){
	var i, j;		
	//prcedure function	
	console.log("Stack Kalang\n");
	var s = 0;
	for(i=0;i<stack.length;i++){
		console.log("index: " + i + "   kalang: " + stack[i] + "  yv: " + stackyv[i] + "  xv: " + stackxv[i] + "  mark: " + stackmark[i] + "\n");	
		s++;
	}
	if(s == 0){
		console.log("kalang kosong\n");
	}	
}

function tracking(){
	console.log("-----------------------------------------------------------------\n");
	typedefTracking();
	variableTracking();
	arrayTracking();
	procTracking();
	stackTracking();
	console.log("-----------------------------------------------------------------\n");
}

function printToken(){
	var i;
	for(i=0;i<arrtoken.length;i++){
		console.log("token: |" + arrtoken[i] + "|  label: |" + arrlabel[i] + "|\n");
	}
}
	
function drawVariable(xi, yi, label, image1){
		//ctx.clearRect(0, 0, width, height);
		/*if(image1.height == 0){
			drawVariable(xi, yi, label);
		}else{*/
			//ctx.clip(); 
			ctx.drawImage(image1, xi, yi, image1.width, image1.height);
			var strlen = (14 - label.length)/2;
			if(strlen < 0){
				strlen = 0;
			}
			var xtemp = 5 + (image1.width/14) * strlen;
			ctx.font = "bold 15px Arial";
			ctx.fillText(label, xtemp,(yi+ 10 + ((image1.height*2)/3)));
		//}				
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}
	
	