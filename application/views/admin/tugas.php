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
        <div class="table-responsive">

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nama IPK</th>
                        <th scope="col">Link Tugas</th>
                        <th scope="col">Nilai</th>
                        <th scope="col">Aksi</th>

                    </tr>
                </thead>
                <tbody>
                    <?php $i = 1; ?>
                    <?php foreach ($tugas as $j) : ?>
                        <tr>
                            <td scope="row"><?= $i; ?></td>
                            <td><?= $j['email']; ?></td>
                            <td><?= $j['nama_ipk']; ?></td>
                            <td><a href="<?= $j['link_tugas']; ?>" class="btn btn-primary" target="_blank">Lihat</a></td>
                            <td><?= $j['nilai']; ?></td>
                            <td>
                                <?php

                                echo '<a href="' . base_url('Tugas/edit/') . $j['id_tugas'] . '" class="badge badge-success">Nilai</a>';

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