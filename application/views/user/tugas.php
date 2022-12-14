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

        <form class="tugas" method="post" action="<?= base_url('TugasUser/tambah') ?>">
            <div class="row">

                <div class="col">
                    <select class="form-control" id="id_ipk" name="id_ipk">
                        <option value="">Pilih IPK</option>
                        <?php foreach ($ipk as $j) : ?>
                            <option value="<?= $j['id_ipk']; ?>"><?= $j['nama_ipk']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Link tugas" id="link_tugas" name="link_tugas">
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
                            <th scope="row"><?= $i; ?></th>
                            <td><?= $j['nama_ipk']; ?></td>
                            <td><?= $j['link_tugas']; ?></td>
                            <td><?= $j['nilai']; ?></td>
                            <td>
                                <?php

                                echo '<a href="' . base_url('TugasUser/edit/') . $j['id_tugas'] . '" class="badge badge-success">Edit</a>';
                                echo '<a href="' . base_url('TugasUser/delete/') . $j['id_tugas'] . '" class="badge badge-danger">Hapus</a>';

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