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
        <?php echo form_open_multipart('TestAdmin/tambah'); ?>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="soal" id="soal" name="soal">
            </div>

            <div class="col">
                <input type="text" class="form-control" placeholder="Opsi A" id="a" name="a">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Opsi B" id="b" name="b">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Opsi C" id="c" name="c">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Opsi D" id="d" name="d">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Kunci" id="kunci" name="kunci">
            </div>
            <div class="col">
                <input type="file" name="gambar" size="20" />
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
                        <th scope="col">Soal</th>
                        <th scope="col">Gambar</th>
                        <th scope="col">Opsi A</th>
                        <th scope="col">Opsi B</th>
                        <th scope="col">Opsi C</th>
                        <th scope="col">Opsi D</th>
                        <th scope="col">Kunci</th>
                        <th scope="col">Aksi</th>



                    </tr>
                </thead>
                <tbody>
                    <?php $i = 1; ?>
                    <?php foreach ($soal as $j) : ?>
                        <tr>
                            <th scope="row"><?= $i; ?></th>
                            <td><?= $j['soal']; ?></td>
                            <td><a href="<?= base_url('assets/img/soal/') . $j['gambar']; ?>" target="_blank">Lihat Gambar</a></td>
                            <td><?= $j['a']; ?></td>
                            <td><?= $j['b']; ?></td>
                            <td><?= $j['c']; ?></td>
                            <td><?= $j['d']; ?></td>
                            <td><?= $j['kunci']; ?></td>
                            <td>
                                <a href="<?= base_url(); ?>TestAdmin/hapus/<?= $j['id_soal']; ?>" class="badge badge-danger float-right" onclick="return confirm('Yakin?');">Hapus</a>
                                <a href="<?= base_url(); ?>TestAdmin/edit/<?= $j['id_soal']; ?>" class="badge badge-success float-right">Edit</a>
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