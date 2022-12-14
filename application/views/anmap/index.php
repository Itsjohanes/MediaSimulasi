<!doctype html>
<!-- 
AnMap - Analogy Mapping
Dibuat Oleh: Rosa Ariani Sukamto
Waktu: Juli 2016
Didukung oleh CodeMirror
-->
<html>
<title>AnMap</title>
<meta charset="utf-8" />

<link rel=stylesheet href="<?= base_url('anmap/'); ?>lib/codemirror.css">
<link rel=stylesheet href="<?= base_url('anmap/'); ?>doc/docs.css">
<!--script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script-->

<script src="<?= base_url('anmap/'); ?>lib/codemirror.js"> </script>
<script src="<?= base_url('anmap/'); ?>lib/tree.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/xml/xml.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/javascript/javascript.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/css/css.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/htmlmixed/htmlmixed.js"></script>
<script src="<?= base_url('anmap/'); ?>addon/edit/matchbrackets.js"></script>
<script src="<?= base_url('anmap/'); ?>addon/runmode/runmode.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/clike/clike.js"></script>
<script src="<?= base_url('anmap/'); ?>mode/pascal/pascal.js"></script>
<script src="<?= base_url('anmap/'); ?>doc/activebookmark.js"></script>

<style>
	.CodeMirror {
		height: auto;
		border: 1px solid #ddd;
	}

	.CodeMirror-scroll {
		max-height: 500px;
	}

	.CodeMirror pre {
		padding-left: 7px;
		line-height: 1.25;
	}
</style>

<!--Create body margin -->

<body>

	<section id="editor" class="first" margin="100px">
		<h2>Anmap - Analogy Mapping</h2>
		<a style="font-size: 10px;">{Aplikasi ini dibuat oleh Bu Rosa Ariani Sukamto dan digunakan kembali oleh Kelompok 3}</a>
		<form style="position: relative; margin-top: .5em;">
			<select id="language" onchange="setLanguage();">
				<!--select id="language" onchange="document.location = this.options[this.selectedIndex].value;"-->
				<option value="text/x-csrc">C</option>
				<!--option value="text/x-c++src">C++</option-->
				<!--option value="text/x-pascal">Pascal</option>
	<option value="text/x-objectivec">Objective-C</option>
	<option value="text/x-java">Java</option-->
			</select>
			&nbsp;&nbsp;&nbsp;
			<input type="button" style="height: 60px; width: 200px;" id="show" value="Tampilkan Analogi" onclick="process();" />
			<input type="button" style="height: 60px; width: 200px;" id="show" value="Materi Simulator" onclick="location.href='https://drive.google.com/drive/folders/1VTY8V3cV814Lo5EoddbVW3ARl4p9jIYB?usp=share_link';" formtarget="_blank" />

			<br />
			<!--isi textarea-->
			<!--onchange=" alert('onchange');" onkeyup="alert('onkeyup');" -->
			<textarea id="codetext">
	#include <stdio.h>
	
	int main(){
	
		return 0;
	}
  </textarea>
		</form>

		<script type="text/javascript">
			//mengambil elemen pilihan bahasa
			var option = document.getElementById("language").options[document.getElementById("language").selectedIndex].value;
			//mengambil editor dan inisialisasi codeMirror
			var editor = CodeMirror.fromTextArea(document.getElementById("codetext"), {
				lineNumbers: true,
				lineWrapping: true,
				lineNumbers: true,
				matchBrackets: true,
				//onChange: function(){editor.save()},
				//onChange: function(){alert("bisa");},
				mode: option
			});
			//width, height
			editor.setSize(10000, 600);
			//editor.setSize(800, 600);

			//jika berganti bahasa pemrograman
			function setLanguage() {
				editor.setOption("mode", document.getElementById("language").options[document.getElementById("language").selectedIndex].value);
			}
		</script>

	</section>
	</div>
	<canvas id="analogycanvas" width="730" height="500" style="border:4px solid #4863DB; background: #e6ffe6;">
		<!--canvas id="analogycanvas" width="730" height="16350" style="border:4px solid #4863DB;" -->
		Sorry, your browser doesn't support canvas technology
	</canvas>
	<script src="<?= base_url('anmap/'); ?>mode/clike/anmapclike.js"></script>
	<!--/section-->
</body>

</html>