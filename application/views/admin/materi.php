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
        <?php echo form_open_multipart('Materi/tambah'); ?>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="Nama Materi" id="nama_materi" name="nama_materi">
            </div>
            <div class="col">
                <select class="form-control" id="id_ipk" name="id_ipk">
                    <option value="">Pilih IPK</option>
                    <?php foreach ($ipk as $j) : ?>
                        <option value="<?= $j['id_ipk']; ?>"><?= $j['nama_ipk']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Link Materi" id="link_materi" name="link_materi">
            </div>
            <div class="col">
                <input type="file" placeholder="File Materi" id="file_materi" name="file_materi">
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
                        <th scope="col">ID Materi</th>
                        <th scope="col">Nama IPK</th>
                        <th scope="col">Nama Materi</th>
                        <th scope="col">Link Materi</th>
                        <th scope="col">Download File Materi</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i = 1; ?>
                    <?php foreach ($materi as $j) : ?>
                        <tr>
                            <th scope="row"><?= $i; ?></th>
                            <td><?= $j['id_materi']; ?></td>
                            <td><?= $j['nama_ipk']; ?></td>
                            <td><?= $j['nama_materi']; ?></td>
                            <td><?= $j['link_materi']; ?></td>
                            <?php
                            if ($j['file_materi'] == null) {
                                echo "<td>File Tidak Ada</td>";
                            } else {
                                echo "<td><a href='" . base_url('assets/file/materi/' . $j['file_materi']) . "'>Download</a></td>";
                            }
                            ?>
                            <td>
                                <?php

                                echo '<a href="' . base_url('Materi/edit/') . $j['id_materi'] . '" class="badge badge-success">Edit</a>';
                                echo '<a href="' . base_url('Materi/delete/') . $j['id_materi'] . '" class="badge badge-danger">Hapus</a>';

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