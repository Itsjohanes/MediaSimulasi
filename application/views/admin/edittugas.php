<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>

</div>
<!-- /.container-fluid -->
<form class="dokter" method="post" action="<?= base_url('Tugas/edit2') ?>">
    <div class="form-group">
        <input type="hidden" class="form-control" id="id_tugas" name="id_tugas" value="<?php echo $tugas['id_tugas'];  ?>">

        <label for="nama">Nama IPK</label>
        <select id="inputState" class="form-control" name="id_ipk" disabled>
            <?php
            foreach ($ipk_only as $j) {
                if ($j['id_ipk'] == $tugas['id_ipk']) {
                    echo "<option value='" . $j['id_ipk'] . "' selected>" . $j['nama_ipk'] . "</option>";
                } else {
                    echo "<option value='" . $j['id_ipk'] . "'>" . $j['nama_ipk'] . "</option>";
                }
            }
            ?>
        </select>
        <label for="link">Link Materi</label>
        <input type="text" class="form-control" id="link_tugas" name="link_tugas" disabled value="<?php echo $tugas['link_tugas'];  ?>">
        <label for="nilai">Nilai</label>
        <input type="text" class="form-control" id="nilai" name="nilai" value="<?php echo $tugas['nilai'];  ?>">


    </div>

    <button type="submit" class="btn btn-primary">Edit</button>
</form>


</div>
<!-- End of Main Content -->