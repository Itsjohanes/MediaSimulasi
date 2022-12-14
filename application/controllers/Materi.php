<?php
defined('BASEPATH') or exit('No direct script access allowed');





class Materi extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }

    public function tambah()
    {

        $this->form_validation->set_rules('nama_materi', 'Nama_materi', 'required|trim'); //Add data
        $this->form_validation->set_rules('id_ipk', 'Id_ipk', 'required|trim'); //Add data
        $this->form_validation->set_rules('link_materi', 'Link_materi', 'required|trim'); //Add data

        $materi = $_FILES['file_materi']['name'];
        if ($materi == '') {
        } else {
            $config['upload_path'] = './assets/file/materi';
            $config['allowed_types'] = 'pdf|doc|docx|ppt|pptx';

            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('file_materi')) {
                echo "File Gagal Diupload!";
            } else {
                $materi = $this->upload->data('file_name');
            }
        }


        $data = [
            'nama_materi' => htmlspecialchars($this->input->post('nama_materi', true)),
            'id_ipk' => htmlspecialchars($this->input->post('id_ipk', true)),
            'link_materi' => htmlspecialchars($this->input->post('link_materi', true)),
            'file_materi' => $materi
        ];

        if ($this->db->insert('tb_materi', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil ditambahkan');
            redirect('Materi');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menambah data');
            redirect('Materi');
        }
    }

    public function index()
    {
        $data['title'] = 'Materi';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $data['ipk'] = $this->db->get('tb_ipk')->result_array();
        $this->db->select('tb_materi.id_materi,tb_materi.nama_materi,tb_materi.link_materi,tb_materi.id_ipk,tb_ipk.nama_ipk,tb_materi.file_materi');
        $this->db->from('tb_materi');
        $this->db->join('tb_ipk', 'tb_materi.id_ipk = tb_ipk.id_ipk');
        $data['materi'] = $this->db->get()->result_array();
        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/materi', $data);


        $this->load->view('templates/footer');
    }
    public function delete($id_materi)
    {
        $this->db->where('id_materi', $id_materi);
        if ($this->db->delete('tb_materi') != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil dihapus');
            redirect('Materi');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menghapus data');
            redirect('Materi');
        }
    }

    //EDIT
    public function edit($id_materi)
    {
        $data['title'] = 'Edit Materi';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $data['materi'] = $this->db->get_where('tb_materi', ['id_materi' => $id_materi])->row_array();
        $data['ipk_only'] = $this->db->get('tb_ipk')->result_array();

        //tampilkan
        $data['kembali'] = 'kembali';
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/editmateri', $data);
        $this->load->view('templates/footer');
    }
    public function editmateri2()
    {
        $this->form_validation->set_rules('nama_materi', 'Nama_materi', 'required|trim'); //Add data
        $this->form_validation->set_rules('id_ipk', 'Id_ipk', 'required|trim'); //Add data
        $this->form_validation->set_rules('link_materi', 'Link_materi', 'required|trim'); //Add data

        $materi = $_FILES['file_materi']['name'];
        if ($materi == '') {
        } else {
            $config['upload_path'] = './assets/file/materi';
            $config['allowed_types'] = 'pdf|doc|docx|ppt|pptx';

            $this->load->library('upload', $config);
            //replace old file
            $old_file = $this->input->post('old_file');
            if (file_exists($config['upload_path'] . $old_file)) {
                unlink($config['upload_path'] . $old_file);
            }



            if (!$this->upload->do_upload('file_materi')) {
                echo "File Gagal Diupload!";
            } else {
                $materi = $this->upload->data('file_name');
            }
        }


        $data = [
            'nama_materi' => htmlspecialchars($this->input->post('nama_materi', true)),
            'id_ipk' => htmlspecialchars($this->input->post('id_ipk', true)),
            'link_materi' => htmlspecialchars($this->input->post('link_materi', true)),
            'file_materi' => $materi

        ];
        $id_materi = $this->input->post('id_materi');
        $this->db->where('id_materi', $id_materi);


        if ($this->db->update('tb_materi', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil diubah');
            redirect('Materi');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal mengubah data');
            redirect('Materi');
        }
    }
}
