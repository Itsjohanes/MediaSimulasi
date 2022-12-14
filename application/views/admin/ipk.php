<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>
    <?php if ($this->session->flashdata('category_success')) { ?>
        <div class="alert alert-success"> <?= $this->session->flashdata('category_success') ?> </div>
    <?php } ?>
    <?php if ($this->session->flashdata('category_error')) { ?>
        <div class="alert alert-danger"> <?= $this->session->flashdata('category_error') ?> </div>
    <?php } ?>
    <div class="row no-gutters">

        <br>
        <form class="dokter" method="post" action="<?= base_url('IPK/tambah') ?>">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Nama IPK" id="nama_ipk" name="nama_ipk">
                </div>

                <div class="col">
                    <Button class="btn btn-success">Submit</Button>
                </div>
            </div>
        </form>
        <div class="table-responsive">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Aksi</th>

                    </tr>
                </thead>
                <tbody>
                    <?php $i = 1; ?>
                    <?php foreach ($ipk as $j) : ?>
                        <tr>
                            <th scope="row"><?= $i; ?></th>
                            <td><?= $j['id_ipk']; ?></td>
                            <td><?= $j['nama_ipk']; ?></td>
                            <td>
                                <?php

                                echo '<a href="' . base_url('IPK/edit/') . $j['id_ipk'] . '" class="badge badge-success">Edit</a>';
                                echo '<a href="' . base_url('IPK/delete/') . $j['id_ipk'] . '" class="badge badge-danger">Hapus</a>';

                                ?>

                            </td>

                        </tr>
                        <?php $i++; ?>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<!-- /.container-fluid -->



















</div>
<!-- End of Main Content -->