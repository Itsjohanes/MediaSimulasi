<h3>Kerjakan Latihan di bawah ini dengan tepat!</h3>
<table border="0">
    <tbody>
        <?php
        include "koneksi.php";
        $query    = mysqli_query($conn, "SELECT * FROM tbl_soal  ORDER BY id_soal ASC");
        $jumlah = mysqli_num_rows($query);
        $no = 0;
        while ($data = mysqli_fetch_array($query)) {
            $no++
        ?>

            <form action="<?= base_url('TestUser/hasil') ?>" method="POST">
                <input type="hidden" name="id[]" value="<?php echo $data['id_soal']; ?>">
                <input type="hidden" name="jumlah" value="<?php echo $jumlah; ?>">
                <tr>
                    <td><?php echo $no ?>.</td>
                    <td><?php echo $data['soal']; ?></td>
                </tr>
                <?php
                if (!empty($data['gambar'])) {
                    echo "<tr><td></td><td><img src='./assets/img/soal/$data[gambar]' width='240' height='120'></td></tr>";
                }
                ?>
                <tr>
                    <td></td>
                    <td>A. <input name="pilihan[<?php echo $data['id_soal'] ?>]" type="radio" value="A"><?php echo $data['a']; ?></td>
                </tr>
                <tr>
                    <td></td>
                    <td>B. <input name="pilihan[<?php echo $data['id_soal'] ?>]" type="radio" value="B"><?php echo $data['b']; ?></td>
                </tr>
                <tr>
                    <td></td>
                    <td>C. <input name="pilihan[<?php echo $data['id_soal'] ?>]" type="radio" value="C"><?php echo $data['c']; ?></td>
                </tr>
                <tr>
                    <td></td>
                    <td>D. <input name="pilihan[<?php echo $data['id_soal'] ?>]" type="radio" value="D"><?php echo $data['d']; ?></td>
                </tr>
            <?php
        }
            ?>
            <tr>
                <td height="40"></td>
                <td>
                    <input type="submit" name="submit" value="Jawab" onclick="return confirm('Perhatian! Apakah Anda sudah yakin dengan semua jawaban Anda?')">
                    <input type="reset" value="Reset">
                </td>
            </tr>
            </form>
    </tbody>
</table>