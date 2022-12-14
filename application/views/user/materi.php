<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>

    <div class="card mb-3 col-lg-8">
        <div class="row no-gutters">

            <br>
            <div class="table-responsive">

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nama IPK</th>
                            <th scope="col">Nama Materi</th>
                            <th scope="col">Link Materi</th>
                            <th scope="col">File Materi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $i = 1; ?>
                        <?php foreach ($materi as $j) : ?>
                            <tr>
                                <th scope="row"><?= $i; ?></th>
                                <td><?= $j['nama_ipk']; ?></td>
                                <td><?= $j['nama_materi']; ?></td>
                                <?php if ($j['link_materi'] == "") {
                                    echo "<td> Tidak ada Link </td>";
                                } else {
                                    echo "<td><a href='" . $j['link_materi'] . "' class='btn btn-primary' target='_blank'>Link</a></td>";
                                } ?>


                                <?php
                                if ($j['file_materi'] == "") {
                                    echo "<td>File tidak tersedia</td>";
                                } else {
                                    echo "<td><a href='" . base_url('assets/file/materi/' . $j['file_materi']) . "' class='btn btn-primary' target='_blank'>Lihat</a></td>";
                                }
                                ?>
                            </tr>
                            <?php $i++; ?>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- /.container-fluid -->



</div>
<!-- End of Main Content -->