<?php
defined('BASEPATH') or exit('No direct script access allowed');





class Tugas extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {
        $data['title'] = 'Tugas';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $this->db->select('tb_tugas.id_tugas,tb_tugas.id_ipk,tb_tugas.email,tb_tugas.link_tugas,tb_tugas.nilai,tb_ipk.nama_ipk');
        $this->db->from('tb_tugas');
        $this->db->join('tb_ipk', 'tb_ipk.id_ipk = tb_tugas.id_ipk');
        $this->db->order_by('tb_ipk.id_ipk', 'ASC');
        $data['tugas'] = $this->db->get()->result_array();
        //tampilkan
        $data['ipk'] = $this->db->get('tb_ipk')->result_array();
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/tugas', $data);


        $this->load->view('templates/footer');
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
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/edittugas', $data);
        $this->load->view('templates/footer');
    }
    public function edit2()
    {
        $this->form_validation->set_rules('nilai', 'Nilai', 'required|trim'); //Add data
        $data = [
            'nilai' => htmlspecialchars($this->input->post('nilai', true)),
        ];
        $id_tugas = $this->input->post('id_tugas');
        $this->db->where('id_tugas', $id_tugas);


        if ($this->db->update('tb_tugas', $data) != null) {
            $this->session->set_flashdata('category_success', 'Data berhasil diubah');
            redirect('Tugas');
        } else {
            $this->session->set_flashdata('category_error', 'Gagal mengubah data');
            redirect('Tugas');
        }
    }
}
