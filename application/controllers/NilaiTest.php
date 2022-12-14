<?php
defined('BASEPATH') or exit('No direct script access allowed');





class NilaiTest extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {
        $data['title'] = 'Nilai Tes';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();
        $this->db->from('tbl_tes');
        $data['tes'] = $this->db->get()->result_array();
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaradmin', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('admin/reporttest', $data);
        $this->load->view('templates/footer');
    }
}
