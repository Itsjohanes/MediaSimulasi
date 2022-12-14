<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>

</div>
<!-- /.container-fluid -->
<?php echo form_open_multipart('TestAdmin/edit2'); ?>
<div class="form-group">
    <input type="hidden" class="form-control" id="id_soal" name="id_soal" value="<?php echo $soal['id_soal'];  ?>">
    <label for="link">Soal</label>
    <input type="text" class="form-control" id="soal" name="soal" value="<?php echo $soal['soal'];  ?>">
    <label for="nilai">Opsi A</label>
    <input type="text" class="form-control" id="a" name="a" value="<?php echo $soal['a'];  ?>">
    <label for="nilai">Opsi B</label>
    <input type="text" class="form-control" id="b" name="b" value="<?php echo $soal['b'];  ?>">
    <label for="nilai">Opsi C</label>
    <input type="text" class="form-control" id="c" name="c" value="<?php echo $soal['c'];  ?>">
    <label for="nilai">Opsi D</label>
    <input type="text" class="form-control" id="d" name="d" value="<?php echo $soal['d'];  ?>">
    <label for="nilai">Kunci</label>
    <input type="text" class="form-control" id="kunci" name="kunci" value="<?php echo $soal['kunci'];  ?>">
    <label for="nilai">Gambar</label>
    <a href="<?= base_url('assets/img/soal/') . $soal['gambar']; ?>" target="_blank">Lihat Gambar</a>
    <input type="file" class="form-control" id="gambar" name="gambar">


</div>

<button type="submit" class="btn btn-primary">Edit</button>
</form>


</div>
<!-- End of Main Content -->