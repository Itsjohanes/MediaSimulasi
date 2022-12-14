<?php
defined('BASEPATH') or exit('No direct script access allowed');





class IPK extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }

    public function tambah()
    {

        $this->form_validation->set_rules('nama_ipk', 'Nama_ipk', 'required|trim'); //Add data
        $data = [
            'nama_ipk' => htmlspecialchars($this->input->post('nama_ipk', true)),
        ];

        if ($this->db->insert('tb_ipk', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil ditambahkan');
            redirect('IPK');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menambah data');
            redirect('IPK');
        }
    }

    public function index()
    {
        $data['title'] = 'IPK';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();
        $data['ipk'] = $this->db->get('tb_ipk')->result_array();
        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/ipk', $data);


        $this->load->view('templates/footer');
    }
    public function delete($id_ipk)
    {
        $this->db->where('id_ipk', $id_ipk);
        if ($this->db->delete('tb_ipk') != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil dihapus');
            redirect('IPK');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menghapus data');
            redirect('IPK');
        }
    }
    public function edit($id_ipk)
    {
        $data['title'] = 'Edit IPK';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $data['ipk'] = $this->db->get_where('tb_ipk', ['id_ipk' => $id_ipk])->row_array();
        //tampilkan
        $data['kembali'] = 'kembali';
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/editipk', $data);
        $this->load->view('templates/footer');
    }
    public function editipk2()
    {
        $this->form_validation->set_rules('nama_ipk', 'Nama_ipk', 'required|trim'); //Add data
        $data = [
            'nama_ipk' => htmlspecialchars($this->input->post('nama_ipk', true)),

        ];
        $id_ipk = $this->input->post('id_ipk');
        $this->db->where('id_ipk', $id_ipk);


        if ($this->db->update('tb_ipk', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil diubah');
            redirect('IPK');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal mengubah data');
            redirect('IPK');
        }
    }
}
