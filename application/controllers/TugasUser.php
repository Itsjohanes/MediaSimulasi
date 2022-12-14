<?php
defined('BASEPATH') or exit('No direct script access allowed');





class TugasUser extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }

    public function tambah()
    {

        $this->form_validation->set_rules('id_ipk', 'Id_ipk', 'required|trim'); //Add data
        $this->form_validation->set_rules('link_tugas', 'Link_Tugas', 'required|trim'); //Add data
        $user = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();


        $data = [
            'id_ipk' => htmlspecialchars($this->input->post('id_ipk', true)),
            'link_tugas' => htmlspecialchars($this->input->post('link_tugas', true)),
            'nilai' => 0,
            'email' => $user['email']
        ];

        if ($this->db->insert('tb_tugas', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil ditambahkan');
            redirect('TugasUser');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menambah data');
            redirect('TugasUser');
        }
    }

    public function index()
    {
        $data['title'] = 'Tugas';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $this->db->select('tb_tugas.id_tugas,tb_tugas.id_ipk,tb_tugas.email,tb_tugas.link_tugas,tb_tugas.nilai,tb_ipk.nama_ipk');
        $this->db->where('tb_tugas.email', $data['user']['email']);
        $this->db->from('tb_tugas');
        $this->db->join('tb_ipk', 'tb_ipk.id_ipk = tb_tugas.id_ipk');
        $this->db->order_by('tb_ipk.id_ipk', 'ASC');
        $data['tugas'] = $this->db->get()->result_array();
        //tampilkan
        $data['ipk'] = $this->db->get('tb_ipk')->result_array();
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/tugas', $data);


        $this->load->view('templates/footer');
    }
    public function delete($id_tugas)
    {
        $this->db->where('id_tugas', $id_tugas);
        if ($this->db->delete('tb_tugas') != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil dihapus');
            redirect('TugasUser');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal menghapus data');
            redirect('TugasUser');
        }
    }

    //EDIT
    public function edit($id_tugas)
    {
        $data['title'] = 'Edit Tugas';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $data['tugas'] = $this->db->get_where('tb_tugas', ['id_tugas' => $id_tugas])->row_array();
        $data['ipk_only'] = $this->db->get('tb_ipk')->result_array();

        //tampilkan
        $data['kembali'] = 'kembali';
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/edittugas', $data);
        $this->load->view('templates/footer');
    }
    public function edit2()
    {
        $this->form_validation->set_rules('id_ipk', 'Id_ipk', 'required|trim'); //Add data
        $this->form_validation->set_rules('link_tugas', 'Link_tugas', 'required|trim'); //Add data
        $data = [
            'id_ipk' => htmlspecialchars($this->input->post('id_ipk', true)),
            'link_tugas' => htmlspecialchars($this->input->post('link_tugas', true))

        ];
        $id_tugas = $this->input->post('id_tugas');
        $this->db->where('id_tugas', $id_tugas);


        if ($this->db->update('tb_tugas', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil diubah');
            redirect('TugasUser');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal mengubah data');
            redirect('TugasUser');
        }
    }
}
