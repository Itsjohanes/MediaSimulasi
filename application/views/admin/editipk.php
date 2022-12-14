<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>

</div>
<!-- /.container-fluid -->
<form class="dokter" method="post" action="<?= base_url('IPK/editipk2') ?>">
    <div class="form-group">
        <input type="hidden" class="form-control" id="id_ipk" name="id_ipk" value="<?php echo $ipk['id_ipk'];  ?>">

        <label for="nama">Nama IPK</label>
        <input type="text" class="form-control" id="nama_ipk" name="nama_ipk" value="<?php echo $ipk['nama_ipk'];  ?>">
    </div>

    <button type="submit" class="btn btn-primary">Edit</button>
</form>


</div>
<!-- End of Main Content -->