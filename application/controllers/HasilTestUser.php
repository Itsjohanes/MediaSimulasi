<?php
defined('BASEPATH') or exit('No direct script access allowed');





class HasilTestUser extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {
        $data['title'] = 'Hasil Test User';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();
        $this->db->from('tbl_tes');
        $this->db->where('email', $data['user']['email']);
        $data['tes'] = $this->db->get()->result_array();
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/reporttest', $data);
        $this->load->view('templates/footer');
    }
}
