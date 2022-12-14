-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2022 at 01:20 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `media`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_soal`
--

CREATE TABLE `tbl_soal` (
  `id_soal` int(11) NOT NULL,
  `a` varchar(255) NOT NULL,
  `b` varchar(255) NOT NULL,
  `c` varchar(255) NOT NULL,
  `d` varchar(255) NOT NULL,
  `kunci` varchar(255) NOT NULL,
  `soal` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_soal`
--

INSERT INTO `tbl_soal` (`id_soal`, `a`, `b`, `c`, `d`, `kunci`, `soal`, `gambar`) VALUES
(1, 'for', 'while', 'do while', 'while do', 'a', 'Apa Sebutan Struktur Perulangan di bawah ini? ', 'for1.jpg'),
(3, 'for', 'while', 'do while', 'while do', 'c', 'Apa Sebutan Struktur Perulangan di bawah ini? ', 'dowhile1.jpg'),
(4, 'for', 'while', 'do while', 'depend on', 'b', 'Apa Sebutan Struktur Perulangan di bawah ini? ', 'while1.jpg'),
(6, 'for', 'while	', 'do while', 'depend on	', 'a', 'Awalan dari perulangan for	', ''),
(7, 'while', 'do while', 'for	', 'for eacb', 'a', 'Awalan dari perulangan while	', ''),
(8, 'do while	', 'while', 'for', 'for each', 'a', 'Awalan dari pengulangan do while	', ''),
(9, 'Batas awal dan akhir diketahui	', 'Batas awal dan akhir tidak diketahui	', 'Perulangan berdasarkan kondisi	', 'Perulangan minimal dilakukan sekali	', 'a', 'Struktur perulangan for tepat digunakan jika	', ''),
(10, 'Batas awal dan akhir diketahui	', 'Batas awal dan akhir adalah 0 dan 1	', 'Perulangan berdasarkan kondisi	', 'Perulangan minimal dilakukan sekali	', 'c', 'Struktur perulangan while tepat digunakan jika	', ''),
(11, 'Batas awal dan akhir diketahui	', 'Batas awal dan akhir adalah 0 dan 1	', 'Perulangan berdasarkan kondisi	', 'Perulangan minimal dilakukan sekali	', 'd', 'Struktur perulangan do while tepat digunakan jika	', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tes`
--

CREATE TABLE `tbl_tes` (
  `email` varchar(255) NOT NULL,
  `nilai` varchar(3) NOT NULL,
  `id_tes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_tes`
--

INSERT INTO `tbl_tes` (`email`, `nilai`, `id_tes`) VALUES
('johannes@upi.edu', '100', 1),
('johannes@upi.edu', '100', 2),
('johannes@upi.edu', '100', 5),
('johannes@upi.edu', '100', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tb_ipk`
--

CREATE TABLE `tb_ipk` (
  `id_ipk` int(11) NOT NULL,
  `nama_ipk` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_ipk`
--

INSERT INTO `tb_ipk` (`id_ipk`, `nama_ipk`) VALUES
(2, 'Menjelaskan Berbagai Struktur dalam Perulangan'),
(9, 'Mengklasifikasi Struktur dalam Perulangan'),
(10, 'Mengmplementasikan Struktur Do While dalam Bahasa Pemrograman'),
(11, 'Mengimplementasi Struktur While dalam Bahasa Pemrograman'),
(12, 'Mengimplementasikan Struktur For Dalam Bahasa Pemrograman'),
(13, 'Menganalisis Perbedaan struktur dalam perulangan. '),
(14, 'Memeriksa kebenaran Algoritma Perulangan ');

-- --------------------------------------------------------

--
-- Table structure for table `tb_materi`
--

CREATE TABLE `tb_materi` (
  `id_materi` int(11) NOT NULL,
  `id_ipk` int(11) NOT NULL,
  `nama_materi` varchar(100) NOT NULL,
  `link_materi` varchar(255) NOT NULL,
  `file_materi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_materi`
--

INSERT INTO `tb_materi` (`id_materi`, `id_ipk`, `nama_materi`, `link_materi`, `file_materi`) VALUES
(2, 2, 'Berbagai Struktur Perulangan', 'https://youtu.be/SdaYk5b8Lic', 'Berbagai_Struktur_perulangan_(Revisi)11.pdf'),
(5, 9, 'Klasifikasi Struktur Perulangan', 'https://youtu.be/8Cow4PIQPg8 ', 'Klasifikasi_Struktur_perulangan_(revisi)_1.pdf'),
(6, 10, 'Implementasi Do While', '', ''),
(7, 11, 'Implementasi While', '', ''),
(9, 12, 'Implementasi For', '', ''),
(12, 13, 'Menganalisis Perbedaan struktur dalam perulangan. ', 'https://youtu.be/mxEmT8jnJo8', 'MenganalisisPerbedaan_rev.pdf'),
(13, 14, 'Memeriksa Algoritma Perulangan ', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tugas`
--

CREATE TABLE `tb_tugas` (
  `id_tugas` int(11) NOT NULL,
  `id_ipk` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `link_tugas` varchar(255) NOT NULL,
  `nilai` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_tugas`
--

INSERT INTO `tb_tugas` (`id_tugas`, `id_ipk`, `email`, `link_tugas`, `nilai`) VALUES
(3, 12, 'johannes@upi.edu', 'https://drive.google.com/drive/folders/12UnPsNGPtYpZ27kuXl29ZZKddF8pDCma', '100'),
(5, 11, 'johannes@upi.edu', 'https://drive.google.com/drive/folders/12UnPsNGPtYpZ27kuXl29ZZKddF8pDCma', '90'),
(6, 2, 'a455lgrowtopia@gmail.com', 'https://drive.google.com/drive/folders/12UnPsNGPtYpZ27kuXl29ZZKddF8pDCma', '80'),
(7, 2, 'hafil@upi.edu', 'https://drive.google.com/drive/folders/12UnPsNGPtYpZ27kuXl29ZZKddF8pDCma', '80');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`email`, `password`, `role`) VALUES
('a455lgrowtopia@gmail.com', '$2y$10$oSE/7vJeY4oEBN0L6fKpXujQqSntx03IfGNjf25ke9cVjo/U4pOsC', 0),
('hafil@upi.edu', '$2y$10$G2qbpgxRpWVXpiV5kUSmH.OVPPrANjNUIrPAtCsUv38iojfw9QRmu', 0),
('johanesalex774@gmail.com', '$2y$10$/JgDHdVFmuM1shsA4NN0peySywYPEzBUpQuMiz.h9.MEewVgLpVBe', 1),
('johannes@upi.edu', '$2y$10$eZu9GT7F822SnSAWcP5pxeZ8lB6rqP0vNTVo3BXgfj12mtEnW0bX.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_menu`
--

CREATE TABLE `user_menu` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `menu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_menu`
--

INSERT INTO `user_menu` (`id`, `role`, `menu`) VALUES
(3, 0, 'User'),
(4, 0, 'MateriUser'),
(5, 0, 'IDE'),
(6, 0, 'TugasUser'),
(9, 0, 'TestUser'),
(10, 0, 'HasilTestUser'),
(11, 0, 'Simulator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_soal`
--
ALTER TABLE `tbl_soal`
  ADD PRIMARY KEY (`id_soal`);

--
-- Indexes for table `tbl_tes`
--
ALTER TABLE `tbl_tes`
  ADD PRIMARY KEY (`id_tes`);

--
-- Indexes for table `tb_ipk`
--
ALTER TABLE `tb_ipk`
  ADD PRIMARY KEY (`id_ipk`);

--
-- Indexes for table `tb_materi`
--
ALTER TABLE `tb_materi`
  ADD PRIMARY KEY (`id_materi`),
  ADD KEY `id_ipk` (`id_ipk`);

--
-- Indexes for table `tb_tugas`
--
ALTER TABLE `tb_tugas`
  ADD PRIMARY KEY (`id_tugas`),
  ADD KEY `email` (`email`),
  ADD KEY `id_ipk` (`id_ipk`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `user_menu`
--
ALTER TABLE `user_menu`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_soal`
--
ALTER TABLE `tbl_soal`
  MODIFY `id_soal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_tes`
--
ALTER TABLE `tbl_tes`
  MODIFY `id_tes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_ipk`
--
ALTER TABLE `tb_ipk`
  MODIFY `id_ipk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_materi`
--
ALTER TABLE `tb_materi`
  MODIFY `id_materi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_tugas`
--
ALTER TABLE `tb_tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_menu`
--
ALTER TABLE `user_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_materi`
--
ALTER TABLE `tb_materi`
  ADD CONSTRAINT `tb_materi_ibfk_1` FOREIGN KEY (`id_ipk`) REFERENCES `tb_ipk` (`id_ipk`);

--
-- Constraints for table `tb_tugas`
--
ALTER TABLE `tb_tugas`
  ADD CONSTRAINT `tb_tugas_ibfk_1` FOREIGN KEY (`email`) REFERENCES `tb_user` (`email`),
  ADD CONSTRAINT `tb_tugas_ibfk_2` FOREIGN KEY (`id_ipk`) REFERENCES `tb_ipk` (`id_ipk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
