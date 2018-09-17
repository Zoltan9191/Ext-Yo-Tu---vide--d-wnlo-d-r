/*just main function*/

//window.onload
//document.getElementById('flex') =  function() {
elementExist();
function elementExist() {
  if (document.getElementById('flex') != null) {
    load_content(); 
  }
  else {  
     console.log('loading...');
	 setTimeout(elementExist, 1000);
  }
}	
	
//window.onload = function() {
//console.log("Extension loaded");



function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
///need function to make js in html



function createCustomButton(butName) {
	
	a.appendChild(document.createTextNode(butName));
	p.appendChild(a);
	center.appendChild(p);
	get_div.appendChild(center);
	}


	 
function load_content() {
	console.log('extension loaded');
var button = document.createElement("button");
var body = document.getElementById("flex");
//var node = document.createTextNode("\u00A0");
//body.appendChild(node);        // create child element
body.appendChild(button);
button.setAttribute("onclick","document.getElementById('Help').style.display='block'");
button.setAttribute("class", "text-center a1-low-width a1-div-a");
button.textContent  = "Download";

var html = " <div id=\"Help\" class=\"w3-modal\"> "+
		   " <div  class=\"w3-modal-content w3-animate-top w3-card-4\"> "+
		   " <header class=\"w3-container w3-teal w3-center w3-padding-32\"> "+
		   " <span onclick=\"document.getElementById('Help').style.display='none'\" "+
		   " class=\"w3-button w3-teal w3-xlarge w3-display-topright\">&#216;</span></header> "+
		   " <div id =\"in_div\">  </div> <div class=\"w3-container\"> "+
		   " <button class=\"w3-button w3-red w3-section w3-input w3-border\" "+
		   " onclick=\"document.getElementById('Help').style.display='none'\"> "+
		   " close</button> </div> </div> </div>";
		   
var html_div = document.createElement("div");
html_div.innerHTML = html;

var element = document.getElementById("page-manager");  
element.appendChild(html_div);

var html_change_subtitles = 'function changeSubtitles() {'+
	'var sub_http = document.getElementById("subSelect").value;'+
	'document.getElementById("subSelected").href = sub_http;'+
	'}';
//'console.log(sub_http); //debug value in select
//'console.log(document.getElementById("subSelected").href); //debug value in button

/* add <script> tag */
var html_script = document.createElement("script");
html_script.innerHTML = html_change_subtitles;	
element.appendChild(html_script);	

button.addEventListener("click", function() {
	var get_div = document.getElementById("in_div");
    get_div.textContent  = "";  //preventing +=
	
	/* Parsing */
	var baseURL = document.getElementsByClassName("skeleton")[0].baseURI;
	//console.log(baseURL);		
    //var baseJS_text;

	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function(){ html_text = this.response;  });
	xhr.open("GET", baseURL, false); 
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
        if (xhr.status === 200) {
        // console.log(xhr.responseText);
        } else {
        console.error(xhr.statusText);
	    get_div.textContent  = "Что-то пошло не так";
        }
      }
    };
	
	xhr.onerror = function (e) {
	  console.error(xhr.statusText);
	};
	xhr.send(null);
	delete xhr;
	//console.log(html_text);
	//var html_text = document.getElementsByClassName("skeleton")[0].children[2];
	//console.log(html_text.innerHTML); //debug text for reg exp
	//console.log(document.getElementsByClassName("skeleton")[0].baseURI);
 
	var quality_720 = '"url_encoded_fmt_stream_map\".+?(https.+?[^\\\\\,]*)';
	var itag_nondash_MP4_360 = '\,[^\,]*itag=18.*?\,';                //Part MP4_360 -> https  -> sig
	var itag_nondash_MP4_360_https = '(https.*?[^\,\\\\]*)';   
	var itag_nondash_MP4_360_sig = 's=(\w+\.\w+)';  
	var re_sub = 'captionTracks\.*?(https.*?)\",';
    //	var re_good_sub = '/\\\"vssId\\\"\:\\\"\..*?(http.*?lang=.*?)\\\",/gm';   //for future
	/* reg exp for videos */ 
	var Qual_720 = new RegExp(quality_720);  
	var MP4_360 = new RegExp(itag_nondash_MP4_360);
	var MP4_360_https = new RegExp(itag_nondash_MP4_360_https);  	 
	var MP4_360_sig = new RegExp(itag_nondash_MP4_360_sig);  
    var subtitles = new RegExp(re_sub);  //reg exp for subtitles
	//var good_subtitles = new RegExp(re_good_sub) // for future
	let j;    //sub
	let m;    //720
	let n;    //360
	//console.log(MP4_360.exec(html_text.text));  //debug for 360p reg exp
	//console.log(subtitles.exec(html_text.text)); //debug for sub  reg exp
	 
	var re_if_not_private = 'signature\%3';
	var not_private = new RegExp(re_if_not_private);
	 
	//console.log(MP4_360.exec(html_text));                      //debug for url 
	//console.log(not_private.exec(MP4_360.exec(html_text)));    //debug if url have signature%3
    //console.log(Qual_720.exec(html_text));
    if (not_private.exec(MP4_360.exec(html_text)) == "signature%3") {

		/*href 720p text if all ok */
		if ((m = Qual_720.exec(html_text)) !== null) {
			//console.log(m[1]);   //debug для http 
		    //console.log(decodeURIComponent(Qual_720.exec(html_text)[1]));
	        var url_720_dec = decodeURIComponent(m[1]);
		    //console.log(vid_720_http);
		    var str_div = '<center> <p> <a id="a1-div-a" class="text-center a1-div-a" href=" '+
		    ''+ url_720_dec + '&title=720p" type="video/mp4" download>Download 720p </a> </center>';
		    //console.log(str_div);
		     
			var p = document.createElement("p");
			var a = document.createElement("a");
			var center = document.createElement("center");
         
			a.appendChild(document.createTextNode("Donwload 720p"));
			
			p.appendChild(a);
			center.appendChild(p);
	
			get_div.appendChild(center);
			
			
			setAttributes(a, {"id": "a1-div-a", "class": "text-center a1-div-a", "href": url_720_dec+'&title=720p', "type": "video/mp4", "align": "center" });
			
			 
		   //get_div.innerHTML += str_div;
		
		
		
			//document.getElementById("a1-div-a").href=str_div;
	
		
			}

			/*href 360p text if all ok */
		if ((n = MP4_360.exec(html_text)) !== null) {
			var url_360_dec = (MP4_360_https.exec(decodeURIComponent(n)));
			//	console.log(n);      			//debug undecoded 360p url
			//	console.log(url_360_dec[1]);    //debug decoded   360p url
			var MP4_360_vid = '<center> <p> <a id="a1-div-a" '+
						  'class="text-center a1-div-a" href="'+ url_360_dec[1] +
						  '&title=360p"  type="video/mp4" download > Download 360p </a> </center>';
			//get_div.innerHTML += MP4_360_vid;
			
			var p = document.createElement("p");
			var a = document.createElement("a");
			var center = document.createElement("center");
         
			a.appendChild(document.createTextNode("Donwload 360p"));
			
			p.appendChild(a);
			center.appendChild(p);
	
			get_div.appendChild(center);
			
			
			setAttributes(a, {"id": "a1-div-a", "target": "_blank", "class": "text-center a1-div-a", "href": url_360_dec[1]+'&title=360p', "type": "video/mp4", "align": "center" });
			
			
			
		}
	}
	/* video with protection */
	else {
		//get_div.innerHTML += "PROTECTED"; 
		var baseJS_src = document.head.getElementsByTagName('script')['player/base'].src;
		
		var xhr2 = new XMLHttpRequest();
		xhr2.addEventListener("load", function(){ baseJS_text = this.responseText;  });
		xhr2.open("GET", baseJS_src, false); 
		xhr2.send();
		delete xhr2;
	
		var re_baseJS = /(..)=function\(a\)\{a=a\.split\(\"\"\)\;(.*?)\..+?return.*?a\.join\(\"\"\)\}\;/gm;
		var baseJS_func = new RegExp(re_baseJS);
		//console.log(baseJS_text);
		var baseJS_func_dec = baseJS_func.exec(baseJS_text);
		//console.log(baseJS_func_dec);      //    re_full
		//console.log(baseJS_func_dec[0]);   //0 - full func
		//console.log(baseJS_func_dec[1]);   //1 - name funct 
		//console.log(baseJS_func_dec[2]);   //2 - name method
		var baseJS_name_func = baseJS_func_dec[0].replace(/\n/g, "");
		//console.log(baseJS_name_func);
		
		var z = baseJS_func_dec[2];    
		var re_baseJS_methods =  'var '+z+'={.*?}}|var '+z+'={.*?\n.*?}}|var '+z+'={.*?\n.*?\n.*?}};';
		var baseJS_methods = new RegExp(re_baseJS_methods);
		var baseJS_methods_dec = baseJS_methods.exec(baseJS_text);
		//console.log(baseJS_methods_dec);
		var baseJS_name_methods = baseJS_methods_dec[0].replace(/\n/g, "");
		//console.log(baseJS_name_methods);
	
		var re_quality720_prt = /\"url_encoded_fmt_stream_map\".+?s=(\w+\.\w+).+?\,/;
		var Quality_720_prt = new RegExp(re_quality720_prt);
		var signature_decoded_func = baseJS_func_dec[1] +"(\""+ Quality_720_prt.exec(html_text)[1] +"\");";
		//console.log (signature_decoded_func);
		//console.log(Quality_720_prt.exec(html_text)[1]);   
		//console.log(Qual_720.exec(html_text)[1]);        //720 http
		var signature_to_dec = baseJS_name_methods + baseJS_name_func + signature_decoded_func;
		//console.log(signature_to_dec);
		var signature = eval(signature_to_dec);
		//console.log(signature);
	
		var url_720_Prt = decodeURIComponent(Qual_720.exec(html_text)[1]) +'&signature='+ signature;
		//console.log(url_720_Prt);
		var MP4_720_Prt = '<center> <p> <a id="a1-div-a" '+
						  'class="text-center a1-div-a" href="'+ url_720_Prt +
						  '&title=360p"  type="video/mp4" download > Download 720p </a> </center>';			  
		get_div.innerHTML += MP4_720_Prt;
	}
	
	

			 
	if ((j = subtitles.exec(html_text)) !== null) {
	
	
	
	
		
		var clear_subtitles = j[1].replace(/\\\\u0026/g, "&");
		var clear_subtitles = clear_subtitles.replace(/\\/g, "");
		var clear_subtitles = decodeURIComponent(clear_subtitles);
		console.log(clear_subtitles);
		var subs = '<div class="select"> <center> <select  id="subSelect" onchange="changeSubtitles()" >'+
		'<option value="'+clear_subtitles+'&tlang=en">English</option>'+
		'<option value="'+clear_subtitles+'&tlang=af">Afrikaans</option> '+
		'<option value="'+clear_subtitles+'&tlang=sq">Albanian</option> '+
		'<option value="'+clear_subtitles+'&tlang=am">Amharic</option> '+
		'<option value="'+clear_subtitles+'&tlang=ar">Arabic</option> '+
		'<option value="'+clear_subtitles+'&tlang=hy">Armenian</option> '+
		'<option value="'+clear_subtitles+'&tlang=az">Azerbaijani</option> '+
		'<option value="'+clear_subtitles+'&tlang=bn">Bangla</option> '+
		'<option value="'+clear_subtitles+'&tlang=eu">Basque</option> '+
		'<option value="'+clear_subtitles+'&tlang=be">Belarusian</option> '+
		'<option value="'+clear_subtitles+'&tlang=bs">Bosnian</option> '+
		'<option value="'+clear_subtitles+'&tlang=bg">Bulgarian</option> '+
		'<option value="'+clear_subtitles+'&tlang=my">Burmese</option> '+
		'<option value="'+clear_subtitles+'&tlang=ca">Catalan</option> '+
		'<option value="'+clear_subtitles+'&tlang=ceb">Cebuano</option> '+
		'<option value="'+clear_subtitles+'&tlang=zh-Hans">Chinese (Simplified)</option> '+
		'<option value="'+clear_subtitles+'&tlang=zh-Hant">Chinese (Traditional)</option> '+
		'<option value="'+clear_subtitles+'&tlang=co">Corsican</option> '+
		'<option value="'+clear_subtitles+'&tlang=hr">Croatian</option> '+
		'<option value="'+clear_subtitles+'&tlang=cs">Czech</option> '+
		'<option value="'+clear_subtitles+'&tlang=da">Danish</option> '+
		'<option value="'+clear_subtitles+'&tlang=nl">Dutch</option> '+
		'<option value="'+clear_subtitles+'&tlang=eo">Esperanto</option> '+
		'<option value="'+clear_subtitles+'&tlang=et">Estonian</option> '+
		'<option value="'+clear_subtitles+'&tlang=fil">Filipino</option> '+
		'<option value="'+clear_subtitles+'&tlang=fi">Finnish</option> '+
		'<option value="'+clear_subtitles+'&tlang=fr">French</option> '+
		'<option value="'+clear_subtitles+'&tlang=gl">Galician</option> '+
		'<option value="'+clear_subtitles+'&tlang=ka">Georgian</option> '+
		'<option value="'+clear_subtitles+'&tlang=de">German</option> '+
		'<option value="'+clear_subtitles+'&tlang=el">Greek</option> '+
		'<option value="'+clear_subtitles+'&tlang=gu">Gujarati</option> '+
		'<option value="'+clear_subtitles+'&tlang=ht">Haitian Creole</option> '+
		'<option value="'+clear_subtitles+'&tlang=ha">Hausa</option> '+
		'<option value="'+clear_subtitles+'&tlang=haw">Hawaiian</option> '+
		'<option value="'+clear_subtitles+'&tlang=iw">Hebrew</option> '+
		'<option value="'+clear_subtitles+'&tlang=hi">Hindi</option> '+
		'<option value="'+clear_subtitles+'&tlang=hmn">Hmong</option> '+
		'<option value="'+clear_subtitles+'&tlang=hu">Hungarian</option> '+
		'<option value="'+clear_subtitles+'&tlang=is">Icelandic</option> '+
		'<option value="'+clear_subtitles+'&tlang=ig">Igbo</option> '+
		'<option value="'+clear_subtitles+'&tlang=id">Indonesian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ga">Irish</option> '+
		'<option value="'+clear_subtitles+'&tlang=it">Italian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ja">Japanese</option> '+
		'<option value="'+clear_subtitles+'&tlang=jv">Javanese</option> '+
		'<option value="'+clear_subtitles+'&tlang=kn">Kannada</option> '+
		'<option value="'+clear_subtitles+'&tlang=kk">Kazakh</option> '+
		'<option value="'+clear_subtitles+'&tlang=km">Khmer</option> '+
		'<option value="'+clear_subtitles+'&tlang=ko">Korean</option> '+
		'<option value="'+clear_subtitles+'&tlang=ku">Kurdish</option> '+
		'<option value="'+clear_subtitles+'&tlang=ky">Kyrgyz</option> '+
		'<option value="'+clear_subtitles+'&tlang=lo">Lao</option> '+
		'<option value="'+clear_subtitles+'&tlang=la">Latin</option> '+
		'<option value="'+clear_subtitles+'&tlang=lv">Latvian</option> '+
		'<option value="'+clear_subtitles+'&tlang=lt">Lithuanian</option> '+
		'<option value="'+clear_subtitles+'&tlang=lb">Luxembourgish</option> '+
		'<option value="'+clear_subtitles+'&tlang=mk">Macedonian</option> '+
		'<option value="'+clear_subtitles+'&tlang=mg">Malagasy</option> '+
		'<option value="'+clear_subtitles+'&tlang=lv">Latvian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ms">Malay</option> '+
		'<option value="'+clear_subtitles+'&tlang=ml">Malayalam</option> '+
		'<option value="'+clear_subtitles+'&tlang=mt">Maltese</option> '+
		'<option value="'+clear_subtitles+'&tlang=mi">Maori</option> '+
		'<option value="'+clear_subtitles+'&tlang=mr">Marathi</option> '+
		'<option value="'+clear_subtitles+'&tlang=mn">Mongolian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ne">Nepali</option> '+
		'<option value="'+clear_subtitles+'&tlang=no">Norwegian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ny">Nyanja</option> '+
		'<option value="'+clear_subtitles+'&tlang=ps">Pashto</option> '+
		'<option value="'+clear_subtitles+'&tlang=fa">Persian</option> '+
		'<option value="'+clear_subtitles+'&tlang=pl">Polish</option> '+
		'<option value="'+clear_subtitles+'&tlang=pt">Portuguese</option> '+
		'<option value="'+clear_subtitles+'&tlang=pa">Punjabi</option> '+
		'<option value="'+clear_subtitles+'&tlang=ro">Romanian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ru">Russian</option> '+
		'<option value="'+clear_subtitles+'&tlang=sm">Samoan</option> '+
		'<option value="'+clear_subtitles+'&tlang=gd">Scottish Gaelic</option> '+
		'<option value="'+clear_subtitles+'&tlang=sr">Serbian</option> '+
		'<option value="'+clear_subtitles+'&tlang=sn">Shona</option> '+
		'<option value="'+clear_subtitles+'&tlang=sd">Sindhi</option> '+
		'<option value="'+clear_subtitles+'&tlang=si">Sinhala</option> '+
		'<option value="'+clear_subtitles+'&tlang=sk">Slovak</option> '+
		'<option value="'+clear_subtitles+'&tlang=sl">Slovenian</option> '+
		'<option value="'+clear_subtitles+'&tlang=so">Somali</option> '+
		'<option value="'+clear_subtitles+'&tlang=st">Southern Sotho</option> '+
		'<option value="'+clear_subtitles+'&tlang=es">Spanish</option> '+
		'<option value="'+clear_subtitles+'&tlang=su">Sundanese</option> '+
		'<option value="'+clear_subtitles+'&tlang=sw">Swahili</option> '+
		'<option value="'+clear_subtitles+'&tlang=sv">Swedish</option> '+
		'<option value="'+clear_subtitles+'&tlang=tg">Tajik</option> '+
		'<option value="'+clear_subtitles+'&tlang=ta">Tamil</option> '+
		'<option value="'+clear_subtitles+'&tlang=te">Telugu</option> '+
		'<option value="'+clear_subtitles+'&tlang=th">Thai</option> '+
		'<option value="'+clear_subtitles+'&tlang=tr">Turkish</option> '+
		'<option value="'+clear_subtitles+'&tlang=uk">Ukrainian</option> '+
		'<option value="'+clear_subtitles+'&tlang=ur">Urdu</option> '+
		'<option value="'+clear_subtitles+'&tlang=uz">Uzbek</option> '+
		'<option value="'+clear_subtitles+'&tlang=vi">Vietnamese</option> '+
		'<option value="'+clear_subtitles+'&tlang=cy">Welsh</option> '+
		'<option value="'+clear_subtitles+'&tlang=fy">Western Frisian</option> '+
		'<option value="'+clear_subtitles+'&tlang=xh">Xhosa</option> '+
		'<option value="'+clear_subtitles+'&tlang=yi">Yiddish</option> '+
		'<option value="'+clear_subtitles+'&tlang=yo">Yoruba</option> '+
		'<option value="'+clear_subtitles+'&tlang=zu">Zulu</option> </select>  '+
		/*button below select*/
		'<a id="subSelected" class="text-center a1-div-a" '+
		'href="'+ clear_subtitles + '"  type="xml" name="subtitles.xml" content="xml"  '+
		'download > Download subtitles </a> </center> ';
		
		//var re_better_sub =  /(\{"baseUrl.*?(http.*?)\".*?(vssId).*?\"\:\".(.*?)\".*?\})+/gm;
		
		
		
		//alert(clear_subtitles);  //debug subtitles url
		get_div.innerHTML += subs;		
		
		

		
		
	}
});

}//setTimeout(load_content , 3400);
//};

