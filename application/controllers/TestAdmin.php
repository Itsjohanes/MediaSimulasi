<?php
defined('BASEPATH') or exit('No direct script access allowed');

class TestAdmin extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {
        $data['title'] = 'Test Admin';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();
        $data['soal'] = $this->db->get('tbl_soal')->result_array();
        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/testadmin', $data);
        $this->load->view('templates/footer');
    }
    public function tambah()
    {
        $soal = $this->input->post('soal');
        $a = $this->input->post('a');
        $b = $this->input->post('b');
        $c = $this->input->post('c');
        $d = $this->input->post('d');
        $kunci = $this->input->post('kunci');
        $gambar = $_FILES['gambar']['name'];
        if ($gambar = '') {
        } else {
            $config['upload_path'] = './assets/img/soal';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('gambar')) {
                echo "Gambar Gagal Diupload!";
            } else {
                $gambar = $this->upload->data('file_name');
            }
        }
        $data = array(
            'soal' => $soal,
            'a' => $a,
            'b' => $b,
            'c' => $c,
            'd' => $d,
            'kunci' => $kunci,
            'gambar' => $gambar
        );
        $this->db->insert('tbl_soal', $data);
        $this->session->set_flashdata('category_success', 'Soal berhasil ditambahkan');
        redirect('TestAdmin');
    }
    public function hapus($id)
    {
        $this->db->where('id_soal', $id);
        $this->db->delete('tbl_soal');
        $this->session->set_flashdata('category_success', 'Soal berhasil dihapus');
        redirect('TestAdmin');
    }
    public function edit($id)
    {
        $data['title'] = 'Edit Soal';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();
        $data['soal'] = $this->db->get_where('tbl_soal', ['id_soal' => $id])->row_array();
        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/editsoal', $data);
        $this->load->view('templates/footer');
    }
    public function edit2()
    {
        //querykan
        $id = $this->input->post('id_soal');
        $soal = $this->input->post('soal');
        $a = $this->input->post('a');
        $b = $this->input->post('b');
        $c = $this->input->post('c');
        $d = $this->input->post('d');
        $kunci = $this->input->post('kunci');
        $gambar = $_FILES['gambar']['name'];
        if ($gambar = '') {
        } else {
            $config['upload_path'] = './assets/img/soal';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('gambar')) {
                echo "Gambar Gagal Diupload!";
            } else {
                $gambar = $this->upload->data('file_name');
            }
        }
        $data = array(
            'soal' => $soal,
            'a' => $a,
            'b' => $b,
            'c' => $c,
            'd' => $d,
            'kunci' => $kunci,
            'gambar' => $gambar
        );
        $this->db->where('id_soal', $id);
        $this->db->update('tbl_soal', $data);
        $this->session->set_flashdata('category_success', 'Soal berhasil diubah');
        redirect('TestAdmin');
    }
}
